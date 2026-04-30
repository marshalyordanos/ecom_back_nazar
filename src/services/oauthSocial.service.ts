import axios from "axios";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { hashPassword } from "../utils/hash";
import { createCustomerSession } from "./auth.service";

type OAuthKind = "g" | "f";

type VerifiedState = { p: OAuthKind; n: string; next: string };

const FB_VER = "v21.0";

function frontendBase(): string {
  return (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
}

function backendBase(): string {
  return (process.env.BACKEND_URL || "http://localhost:8000").replace(/\/$/, "");
}

export function sanitizeOAuthNext(raw: unknown): string {
  if (typeof raw !== "string") return "/";
  const t = raw.trim();
  if (!t.startsWith("/") || t.startsWith("//") || t.includes("://")) return "/";
  return t.slice(0, 512) || "/";
}

function redirectToFrontend(path: string, query: Record<string, string>): string {
  const base = `${frontendBase()}/`;
  const clean = path.replace(/^\//, "");
  const url = new URL(clean, base);
  for (const [k, v] of Object.entries(query)) {
    url.searchParams.set(k, v);
  }
  return url.toString();
}

function oauthCallbackUrl(provider: "google" | "facebook"): string {
  return `${backendBase()}/api/v1/auth/oauth/${provider}/callback`;
}

function encodeState(payload: VerifiedState): string {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: "15m" });
}

function decodeState(token: string): VerifiedState {
  const d = jwt.verify(token, config.jwt.secret) as VerifiedState;
  if ((d.p !== "g" && d.p !== "f") || typeof d.n !== "string" || typeof d.next !== "string") {
    throw new AppError("Invalid OAuth state", 400);
  }
  return { ...d, next: sanitizeOAuthNext(d.next) };
}

function issueHandshake(userId: string, next: string): string {
  return jwt.sign(
    { typ: "oauth_hs", sub: userId, next: sanitizeOAuthNext(next) },
    config.jwt.secret,
    { expiresIn: "2m" },
  );
}

function parseHandshake(token: string): { userId: string; next: string } {
  const d = jwt.verify(token, config.jwt.secret) as {
    typ?: string;
    sub?: string;
    next?: string;
  };
  if (d.typ !== "oauth_hs" || typeof d.sub !== "string") {
    throw new AppError("Invalid or expired sign-in token", 400);
  }
  return { userId: d.sub, next: sanitizeOAuthNext(d.next) };
}

async function oauthPlaceholderPassword(): Promise<string> {
  return hashPassword(crypto.randomBytes(32).toString("hex"));
}

export function buildGoogleStartRedirect(query: { next?: unknown }): string {
  const cid = process.env.GOOGLE_CLIENT_ID?.trim();
  const sec = process.env.GOOGLE_CLIENT_SECRET?.trim();
  if (!cid || !sec) {
    throw new AppError("Google sign-in is not configured", 503);
  }
  const next = sanitizeOAuthNext(query.next);
  const state = encodeState({
    p: "g",
    n: crypto.randomBytes(24).toString("hex"),
    next,
  });
  const qs = new URLSearchParams({
    client_id: cid,
    redirect_uri: oauthCallbackUrl("google"),
    response_type: "code",
    scope: ["openid", "email", "profile"].join(" "),
    state,
    access_type: "online",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${qs}`;
}

async function googleFetchProfile(accessToken: string) {
  const { data } = await axios.get<{
    sub: string;
    email?: string;
    email_verified?: boolean;
    given_name?: string;
    family_name?: string;
    name?: string;
    picture?: string;
  }>("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!data?.sub) throw new AppError("Google profile incomplete", 400);
  return data;
}

async function findOrCreateGoogleUser(profile: Awaited<ReturnType<typeof googleFetchProfile>>) {
  const sub = profile.sub;
  const byG = await prisma.user.findUnique({ where: { googleId: sub } });
  if (byG) return byG;

  const emailRaw = profile.email?.trim().toLowerCase();
  if (!emailRaw) {
    throw new AppError("Google did not return an email for this account", 400);
  }
  if (profile.email_verified === false) {
    throw new AppError("Google email is not verified", 400);
  }

  const byEmail = await prisma.user.findUnique({ where: { email: emailRaw } });
  if (byEmail) {
    if (byEmail.googleId && byEmail.googleId !== sub) {
      throw new AppError("This email is linked to another Google account", 409);
    }
    return prisma.user.update({
      where: { id: byEmail.id },
      data: {
        googleId: sub,
        ...(profile.picture && !byEmail.avatarUrl ? { avatarUrl: profile.picture } : {}),
      },
    });
  }

  const firstName =
    profile.given_name?.trim() ||
    profile.name?.trim().split(/\s+/)[0] ||
    "Customer";
  const lastName =
    profile.family_name?.trim() ||
    profile.name?.trim().split(/\s+/).slice(1).join(" ") ||
    "User";

  const defaultRole = await prisma.role.findFirst({ where: { name: "user" } });
  if (!defaultRole) throw new AppError("Default role 'user' not found. Run seed.", 500);

  return prisma.user.create({
    data: {
      email: emailRaw,
      googleId: sub,
      passwordHash: await oauthPlaceholderPassword(),
      firstName,
      lastName,
      avatarUrl: profile.picture || null,
      isSuperAdmin: false,
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
      roles: { connect: [{ id: defaultRole.id }] },
    },
  });
}

export async function handleGoogleCallback(query: {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
}): Promise<string> {
  if (query.error) {
    const msg = query.error_description || query.error || "Google sign-in cancelled";
    return redirectToFrontend("login", { oauth_error: msg.slice(0, 300) });
  }
  const code = typeof query.code === "string" ? query.code : "";
  const stateRaw = typeof query.state === "string" ? query.state : "";
  if (!code || !stateRaw) {
    return redirectToFrontend("login", { oauth_error: "Missing Google authorization" });
  }

  let st: VerifiedState;
  try {
    st = decodeState(stateRaw);
  } catch {
    return redirectToFrontend("login", { oauth_error: "Invalid or expired OAuth state" });
  }
  if (st.p !== "g") {
    return redirectToFrontend("login", { oauth_error: "OAuth state mismatch" });
  }

  const cid = process.env.GOOGLE_CLIENT_ID?.trim();
  const csec = process.env.GOOGLE_CLIENT_SECRET?.trim();
  if (!cid || !csec) {
    return redirectToFrontend("login", { oauth_error: "Google sign-in is not configured" });
  }

  try {
    const tokenRes = await axios.post<{
      access_token?: string;
    }>(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id: cid,
        client_secret: csec,
        redirect_uri: oauthCallbackUrl("google"),
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    const access = tokenRes.data?.access_token;
    if (!access) throw new AppError("Google token exchange failed", 400);

    const profile = await googleFetchProfile(access);
    const user = await findOrCreateGoogleUser(profile);
    const hs = issueHandshake(user.id, st.next);
    return redirectToFrontend("auth/oauth-callback", { oauth_finish: hs });
  } catch (e) {
    const msg = e instanceof AppError ? e.message : "Google sign-in failed";
    return redirectToFrontend("login", { oauth_error: msg.slice(0, 300) });
  }
}

export function buildFacebookStartRedirect(query: { next?: unknown }): string {
  const appId = process.env.FACEBOOK_APP_ID?.trim();
  const appSecret = process.env.FACEBOOK_APP_SECRET?.trim();
  if (!appId || !appSecret) {
    throw new AppError("Facebook sign-in is not configured", 503);
  }
  const next = sanitizeOAuthNext(query.next);
  const state = encodeState({
    p: "f",
    n: crypto.randomBytes(24).toString("hex"),
    next,
  });
  const qs = new URLSearchParams({
    client_id: appId,
    redirect_uri: oauthCallbackUrl("facebook"),
    response_type: "code",
    scope: ["email", "public_profile"].join(","),
    state,
  });
  return `https://www.facebook.com/${FB_VER}/dialog/oauth?${qs}`;
}

async function facebookExchangeCode(code: string) {
  const appId = process.env.FACEBOOK_APP_ID!.trim();
  const appSecret = process.env.FACEBOOK_APP_SECRET!.trim();
  const { data } = await axios.get<{
    access_token?: string;
  }>(`https://graph.facebook.com/${FB_VER}/oauth/access_token`, {
    params: {
      client_id: appId,
      client_secret: appSecret,
      redirect_uri: oauthCallbackUrl("facebook"),
      code,
    },
  });
  const at = data?.access_token;
  if (!at) throw new AppError("Facebook token exchange failed", 400);
  return at;
}

async function facebookFetchProfile(accessToken: string) {
  const { data } = await axios.get<{
    id: string;
    name?: string;
    email?: string;
    picture?: { data?: { url?: string } };
  }>(`https://graph.facebook.com/${FB_VER}/me`, {
    params: {
      fields: "id,name,email,picture.type(large)",
      access_token: accessToken,
    },
  });
  if (!data?.id) throw new AppError("Facebook profile incomplete", 400);
  return data;
}

async function findOrCreateFacebookUser(profile: Awaited<ReturnType<typeof facebookFetchProfile>>) {
  const fbId = profile.id;
  const byF = await prisma.user.findUnique({ where: { facebookId: fbId } });
  if (byF) return byF;

  const emailRaw = profile.email?.trim().toLowerCase();
  if (emailRaw) {
    const byEmail = await prisma.user.findUnique({ where: { email: emailRaw } });
    if (byEmail) {
      if (byEmail.facebookId && byEmail.facebookId !== fbId) {
        throw new AppError("This email is linked to another Facebook account", 409);
      }
      return prisma.user.update({
        where: { id: byEmail.id },
        data: {
          facebookId: fbId,
          ...(profile.picture?.data?.url && !byEmail.avatarUrl
            ? { avatarUrl: profile.picture.data.url }
            : {}),
        },
      });
    }
  }

  const nameParts = (profile.name || "Customer").trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || "Customer";
  const lastName = nameParts.slice(1).join(" ") || "User";

  const defaultRole = await prisma.role.findFirst({ where: { name: "user" } });
  if (!defaultRole) throw new AppError("Default role 'user' not found. Run seed.", 500);

  return prisma.user.create({
    data: {
      email: emailRaw || null,
      facebookId: fbId,
      passwordHash: await oauthPlaceholderPassword(),
      firstName,
      lastName,
      avatarUrl: profile.picture?.data?.url || null,
      isSuperAdmin: false,
      status: "ACTIVE",
      ...(emailRaw ? { emailVerifiedAt: new Date() } : {}),
      roles: { connect: [{ id: defaultRole.id }] },
    },
  });
}

export async function handleFacebookCallback(query: {
  code?: string;
  state?: string;
  error?: string;
  error_reason?: string;
  error_description?: string;
}): Promise<string> {
  if (query.error) {
    const msg =
      query.error_description ||
      query.error_reason ||
      query.error ||
      "Facebook sign-in cancelled";
    return redirectToFrontend("login", { oauth_error: msg.slice(0, 300) });
  }
  const code = typeof query.code === "string" ? query.code : "";
  const stateRaw = typeof query.state === "string" ? query.state : "";
  if (!code || !stateRaw) {
    return redirectToFrontend("login", { oauth_error: "Missing Facebook authorization" });
  }

  let st: VerifiedState;
  try {
    st = decodeState(stateRaw);
  } catch {
    return redirectToFrontend("login", { oauth_error: "Invalid or expired OAuth state" });
  }
  if (st.p !== "f") {
    return redirectToFrontend("login", { oauth_error: "OAuth state mismatch" });
  }

  if (!process.env.FACEBOOK_APP_ID?.trim() || !process.env.FACEBOOK_APP_SECRET?.trim()) {
    return redirectToFrontend("login", { oauth_error: "Facebook sign-in is not configured" });
  }

  try {
    const access = await facebookExchangeCode(code);
    const profile = await facebookFetchProfile(access);
    const user = await findOrCreateFacebookUser(profile);
    const hs = issueHandshake(user.id, st.next);
    return redirectToFrontend("auth/oauth-callback", { oauth_finish: hs });
  } catch (e) {
    const msg = e instanceof AppError ? e.message : "Facebook sign-in failed";
    return redirectToFrontend("login", { oauth_error: msg.slice(0, 300) });
  }
}

export async function completeOAuthHandshake(body: { handshakeToken?: string }) {
  const tok = `${body?.handshakeToken || ""}`.trim();
  if (!tok) throw new AppError("handshakeToken required", 400);
  const { userId, next } = parseHandshake(tok);
  const session = await createCustomerSession(userId);
  return { ...session, next };
}
