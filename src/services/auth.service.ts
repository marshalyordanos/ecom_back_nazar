import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { tokenTypes } from "../config/tokens";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import AppError from "../utils/appError";
import { sendOTPViaAfroMessage, verifyOTPViaAfroMessage } from "./sms.service";
import { sendOTPEmail } from "./email.service";
import {
  generateOTP,
  hashOTP,
  OTP_COOLDOWN_SECONDS,
  OTP_EXPIRY_SECONDS,
  OTP_MAX_ATTEMPTS,
  verifyOTP,
} from "./otp.service";
import { sendEmail } from "../utils/email";
import { getMergedPermissionsForUser, mergedMapToList } from "./rbacPermission.service";

const accessExpirationMinutes =
  parseInt(config.jwt.accessExpirationMinutes, 10) || 60;
const refreshExpirationDays =
  parseInt(config.jwt.refreshExpirationDays, 10) || 60;
const resetTokenExpirationMinutes = 15;

const INACTIVE_ACCOUNT_GRACE_MS =
  parseInt(process.env.INACTIVE_GRACE_MINUTES ?? "60", 10) * 60 * 1000;

const OTP_TYPE_EMAIL = "email";
const OTP_TYPE_PHONE = "phone";
const OTP_PURPOSE_ACCOUNT_VERIFICATION = "account_verification";
const OTP_PURPOSE_PASSWORD_RESET = "password_reset";

type OtpType = typeof OTP_TYPE_EMAIL | typeof OTP_TYPE_PHONE;
type OtpPurpose =
  | typeof OTP_PURPOSE_ACCOUNT_VERIFICATION
  | typeof OTP_PURPOSE_PASSWORD_RESET;

function normalizeOtpType(otpType: string): OtpType {
  const normalized = `${otpType || ""}`.trim().toLowerCase();
  if (normalized !== OTP_TYPE_EMAIL && normalized !== OTP_TYPE_PHONE) {
    throw new AppError("otpType must be either 'email' or 'phone'", 400);
  }
  return normalized as OtpType;
}

function requireOtpCode(otpCode: string): string {
  const code = `${otpCode || ""}`.trim();
  if (!code) throw new AppError("OTP code is required", 400);
  return code;
}

function resolveChannelValue(input: {
  otpType: OtpType;
  email?: string;
  phone?: string;
}) {
  if (input.otpType === OTP_TYPE_EMAIL) {
    const email = `${input.email || ""}`.trim().toLowerCase();
    if (!email) throw new AppError("Email is required for otpType=email", 400);
    return email;
  }
  const phone = `${input.phone || ""}`.trim();
  if (!phone) throw new AppError("Phone is required for otpType=phone", 400);
  return phone;
}

async function findUserByChannel(otpType: OtpType, channelValue: string) {
  if (otpType === OTP_TYPE_EMAIL) {
    return prisma.user.findUnique({ where: { email: channelValue } });
  }
  return prisma.user.findUnique({ where: { phone: channelValue } });
}

function ensureCooldownAllowed(otpCooldownUntil: Date | null): void {
  if (otpCooldownUntil && otpCooldownUntil > new Date()) {
    throw new AppError("Please wait before requesting another OTP", 429);
  }
}

async function issueAndPersistOtp(input: {
  userId: string;
  otpType: OtpType;
  otpPurpose: OtpPurpose;
  channelValue: string;
  firstName: string;
}) {
  const existing = await prisma.otpRecord.findFirst({
    where: {
      userId: input.userId,
      otpType: input.otpType,
      otpPurpose: input.otpPurpose,
      channelValue: input.channelValue,
    },
  });
  ensureCooldownAllowed(existing?.otpCooldownUntil ?? null);

  const cooldownUntil = new Date(Date.now() + OTP_COOLDOWN_SECONDS * 1000);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_SECONDS * 1000);

  // Switching channels or requesting a fresh OTP invalidates any previous OTP for same purpose.
  await prisma.otpRecord.deleteMany({
    where: { userId: input.userId, otpPurpose: input.otpPurpose },
  });

  if (input.otpType === OTP_TYPE_PHONE) {
    const afro = await sendOTPViaAfroMessage(input.channelValue);
    await prisma.otpRecord.create({
      data: {
        userId: input.userId,
        otpType: input.otpType,
        otpPurpose: input.otpPurpose,
        channelValue: input.channelValue,
        verificationId: afro.verificationId,
        otpCooldownUntil: cooldownUntil,
        otpExpiresAt: expiresAt,
      },
    });
    return;
  }

  const otp = generateOTP(6);
  const otpHash = hashOTP(otp);
  await prisma.otpRecord.create({
    data: {
      userId: input.userId,
      otpType: input.otpType,
      otpPurpose: input.otpPurpose,
      channelValue: input.channelValue,
      otpHash,
      otpExpiresAt: expiresAt,
      otpAttempts: 0,
      otpCooldownUntil: cooldownUntil,
    },
  });

  await sendOTPEmail({
    to: input.channelValue,
    otp,
    firstName: input.firstName,
    purpose: input.otpPurpose,
  });
}

async function validateOtpAndConsume(input: {
  userId: string;
  otpType: OtpType;
  otpPurpose: OtpPurpose;
  channelValue: string;
  otpCode: string;
}) {
  const record = await prisma.otpRecord.findFirst({
    where: {
      userId: input.userId,
      otpType: input.otpType,
      otpPurpose: input.otpPurpose,
      channelValue: input.channelValue,
    },
  });

  if (!record) {
    throw new AppError("No OTP request found. Please request a new OTP.", 400);
  }

  if (!record.otpExpiresAt || record.otpExpiresAt < new Date()) {
    await prisma.otpRecord.delete({ where: { id: record.id } });
    throw new AppError("OTP has expired. Please request a new one.", 400);
  }

  if (input.otpType === OTP_TYPE_PHONE) {
    if (!record.verificationId) {
      throw new AppError(
        "OTP verification session is invalid. Please resend OTP.",
        400,
      );
    }
    const verified = await verifyOTPViaAfroMessage(
      input.channelValue,
      record.verificationId,
      input.otpCode,
    );
    if (!verified) throw new AppError("Invalid OTP", 400);
    await prisma.otpRecord.delete({ where: { id: record.id } });
    return;
  }

  if (!record.otpHash) {
    throw new AppError(
      "OTP verification session is invalid. Please resend OTP.",
      400,
    );
  }
  if (record.otpAttempts >= OTP_MAX_ATTEMPTS) {
    throw new AppError("Too many OTP attempts. Please request a new OTP.", 429);
  }

  const isValid = verifyOTP(input.otpCode, record.otpHash);
  if (!isValid) {
    const nextAttempts = record.otpAttempts + 1;
    await prisma.otpRecord.update({
      where: { id: record.id },
      data: { otpAttempts: nextAttempts },
    });
    if (nextAttempts >= OTP_MAX_ATTEMPTS) {
      throw new AppError(
        "Too many OTP attempts. Please request a new OTP.",
        429,
      );
    }
    throw new AppError("Invalid OTP", 400);
  }

  await prisma.otpRecord.delete({ where: { id: record.id } });
}

function generateAccessToken(userId: string, identifier: string | null): string {
  return jwt.sign(
    { userId, email: identifier, type: tokenTypes.ACCESS },
    config.jwt.secret,
    { expiresIn: `${accessExpirationMinutes}m` },
  );
}

function generateRefreshToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function adminRegister(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}) {
  if (!data.phone) {
    throw new AppError("Phone is required", 400);
  }

  const passwordHash = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      isSuperAdmin: true,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      status: true,
      createdAt: true,
    },
  });

  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken();
  await prisma.token.create({
    data: {
      userId: user.id,
      token: refreshToken,
      type: tokenTypes.REFRESH,
      expiresAt: new Date(
        Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000,
      ),
    },
  });

  return {
    user,
    accessToken,
    refreshToken,
    expiresIn: accessExpirationMinutes * 60,
  };
}
/**
 * If the conflicting account is ACTIVE/SUSPENDED, reject outright.
 * If INACTIVE but within the grace window, give a helpful retry message.
 * If INACTIVE and past the grace window, delete the stale record so the
 * caller can proceed with a fresh registration.
 */
async function reclaimOrReject(
  existing: { id: string; status: string; createdAt: Date },
  label: string,
): Promise<void> {
  if (existing.status !== "INACTIVE") {
    throw new AppError(`${label} already registered`, 409);
  }

  const ageMs = Date.now() - new Date(existing.createdAt).getTime();
  if (ageMs < INACTIVE_ACCOUNT_GRACE_MS) {
    const minutesLeft = Math.ceil(
      (INACTIVE_ACCOUNT_GRACE_MS - ageMs) / 60_000,
    );
    throw new AppError(
      `${label} was recently registered but not yet verified. ` +
        `You can retry in ~${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}, ` +
        `or use a different ${label.toLowerCase()}.`,
      409,
    );
  }

  await prisma.user.delete({ where: { id: existing.id } });
}

/**
 * Bulk-purge INACTIVE accounts older than `maxAgeMs`.
 * Called by the background cleanup job as a safety net.
 */
export async function purgeStaleInactiveAccounts(
  maxAgeMs: number = 24 * 60 * 60 * 1000,
): Promise<number> {
  const cutoff = new Date(Date.now() - maxAgeMs);
  const { count } = await prisma.user.deleteMany({
    where: { status: "INACTIVE", createdAt: { lt: cutoff } },
  });
  return count;
}

export async function register(data: {
  email?: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}) {
  const email = data.email?.trim().toLowerCase() || undefined;
  const phone = data.phone?.trim() || undefined;

  if (!email && !phone) {
    throw new AppError("Provide at least an email or phone number", 400);
  }

  if (email) {
    const byEmail = await prisma.user.findUnique({ where: { email } });
    if (byEmail) {
      await reclaimOrReject(byEmail, "Email");
    }
  }
  if (phone) {
    const byPhone = await prisma.user.findUnique({ where: { phone } });
    if (byPhone) {
      await reclaimOrReject(byPhone, "Phone");
    }
  }

  const passwordHash = await hashPassword(data.password);
  const defaultRole = await prisma.role.findFirst({ where: { name: "user" } });
  if (!defaultRole) {
    throw new AppError("Default role 'user' not found. Run seed.", 500);
  }

  const user = await prisma.user.create({
    data: {
      email: email ?? null,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: phone ?? null,
      isSuperAdmin: false,
      status: "INACTIVE",
      roles: { connect: [{ id: defaultRole.id }] },
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      status: true,
      createdAt: true,
    },
  });

  return {
    user,
    message: "Registration successful. Please verify your account using OTP.",
    verificationRequired: true,
  };
}
//

export async function login(emailPhone: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailPhone }, { phone: emailPhone }],
    },
    include: { roles: { select: { name: true } } },
  });
  if (!user || !(await comparePassword(password, user.passwordHash))) {
    throw new AppError("Invalid email/phone or password", 401);
  }
  if (user.status !== "ACTIVE") {
    throw new AppError("Account not verified", 401);
  }

  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken();
  await prisma.token.create({
    data: {
      userId: user.id,
      token: refreshToken,
      type: tokenTypes.REFRESH,
      expiresAt: new Date(
        Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000,
      ),
    },
  });

  const permMap = await getMergedPermissionsForUser(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      isSuperAdmin: user.isSuperAdmin,
      roles: user.roles.map((r) => r.name),
      permissions: mergedMapToList(permMap),
    },
    accessToken,
    refreshToken,
    expiresIn: accessExpirationMinutes * 60,
  };
}

export async function logout(refreshToken: string | undefined) {
  if (refreshToken) {
    await prisma.token.deleteMany({
      where: { token: refreshToken, type: tokenTypes.REFRESH },
    });
  }
  return { message: "Logged out successfully" };
}

export async function refresh(refreshToken: string) {
  const tokenRecord = await prisma.token.findFirst({
    where: { token: refreshToken, type: tokenTypes.REFRESH },
    include: { user: true },
  });
  if (!tokenRecord) {
    throw new AppError("Session expired. Please log in again", 401);
  }

  if (tokenRecord.expiresAt < new Date()) {
    await prisma.token.deleteMany({
      where: { token: refreshToken, type: tokenTypes.REFRESH },
    });
    throw new AppError("Session expired. Please log in again", 401);
  }
  if (tokenRecord.user.status !== "ACTIVE") {
    await prisma.token.deleteMany({
      where: { token: refreshToken, type: tokenTypes.REFRESH },
    });
    throw new AppError("Account is inactive", 401);
  }

  await prisma.token.delete({ where: { id: tokenRecord.id } });

  const newAccessToken = generateAccessToken(
    tokenRecord.user.id,
    tokenRecord.user.email,
  );
  const newRefreshToken = generateRefreshToken();
  await prisma.token.create({
    data: {
      userId: tokenRecord.userId,
      token: newRefreshToken,
      type: tokenTypes.REFRESH,
      expiresAt: new Date(
        Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000,
      ),
    },
  });

  const fullUser = await prisma.user.findUnique({
    where: { id: tokenRecord.userId },
    include: { roles: { select: { name: true } } },
  });
  if (!fullUser) {
    throw new AppError("User no longer exists", 401);
  }
  const permMap = await getMergedPermissionsForUser(fullUser.id);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    expiresIn: accessExpirationMinutes * 60,
    user: {
      id: fullUser.id,
      email: fullUser.email,
      firstName: fullUser.firstName,
      lastName: fullUser.lastName,
      phone: fullUser.phone,
      isSuperAdmin: fullUser.isSuperAdmin,
      roles: fullUser.roles.map((r) => r.name),
      permissions: mergedMapToList(permMap),
    },
  };
}

export async function forgotPassword(email: string) {
  // Legacy endpoint compatibility: route to OTP reset initiation with email.
  const normalizedEmail = `${email || ""}`.trim().toLowerCase();
  if (!normalizedEmail)
    return { message: "If the email exists, a reset OTP has been sent." };
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (!user)
    return { message: "If the email exists, a reset OTP has been sent." };

  await issueAndPersistOtp({
    userId: user.id,
    otpType: OTP_TYPE_EMAIL,
    otpPurpose: OTP_PURPOSE_PASSWORD_RESET,
    channelValue: normalizedEmail,
    firstName: user.firstName,
  });
  return { message: "If the email exists, a reset OTP has been sent." };
}

export async function resetPassword(token: string, newPassword: string) {
  const tokenRecord = await prisma.token.findFirst({
    where: { token, type: tokenTypes.RESET_PASSWORD },
    include: { user: true },
  });
  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    throw new AppError("Invalid or expired reset token", 400);
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: tokenRecord.userId },
      data: { passwordHash },
    }),
    prisma.token.delete({ where: { id: tokenRecord.id } }),
  ]);

  return { message: "Password reset successfully" };
}

export async function sendVerificationOtp(input: {
  email?: string;
  phone?: string;
  otpType: string;
}) {
  const otpType = normalizeOtpType(input.otpType);
  const channelValue = resolveChannelValue({
    otpType,
    email: input.email,
    phone: input.phone,
  });
  const user = await findUserByChannel(otpType, channelValue);
  if (!user) throw new AppError("User not found", 404);

  if (user.status === "ACTIVE") {
    return { message: "Account is already verified." };
  }

  await issueAndPersistOtp({
    userId: user.id,
    otpType,
    otpPurpose: OTP_PURPOSE_ACCOUNT_VERIFICATION,
    channelValue,
    firstName: user.firstName,
  });

  return { message: "Verification OTP sent successfully." };
}

export async function resendVerificationOtp(input: {
  email?: string;
  phone?: string;
  otpType: string;
}) {
  return sendVerificationOtp(input);
}

export async function verifyAccount(input: {
  email?: string;
  phone?: string;
  otpType: string;
  otpCode: string;
}) {
  const otpType = normalizeOtpType(input.otpType);
  const otpCode = requireOtpCode(input.otpCode);
  const channelValue = resolveChannelValue({
    otpType,
    email: input.email,
    phone: input.phone,
  });
  const user = await findUserByChannel(otpType, channelValue);
  if (!user) throw new AppError("User not found", 404);

  await validateOtpAndConsume({
    userId: user.id,
    otpType,
    otpPurpose: OTP_PURPOSE_ACCOUNT_VERIFICATION,
    channelValue,
    otpCode,
  });

  await prisma.user.update({
    where: { id: user.id },
    data:
      otpType === OTP_TYPE_EMAIL
        ? { status: "ACTIVE", emailVerifiedAt: new Date() }
        : { status: "ACTIVE", phoneVerifiedAt: new Date() },
  });

  const activatedUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { roles: { select: { name: true } } },
  });
  if (!activatedUser) throw new AppError("User not found", 404);

  const accessToken = generateAccessToken(
    activatedUser.id,
    activatedUser.email,
  );
  const refreshToken = generateRefreshToken();
  await prisma.token.create({
    data: {
      userId: activatedUser.id,
      token: refreshToken,
      type: tokenTypes.REFRESH,
      expiresAt: new Date(
        Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000,
      ),
    },
  });

  return {
    message: "Account verified successfully.",
    user: {
      id: activatedUser.id,
      email: activatedUser.email,
      firstName: activatedUser.firstName,
      lastName: activatedUser.lastName,
      roles: activatedUser.roles.map((r) => r.name),
    },
    accessToken,
    refreshToken,
    expiresIn: accessExpirationMinutes * 60,
  };
}

export async function requestPasswordReset(input: {
  email?: string;
  phone?: string;
  otpType: string;
}) {
  const otpType = normalizeOtpType(input.otpType);
  const channelValue = resolveChannelValue({
    otpType,
    email: input.email,
    phone: input.phone,
  });
  const user = await findUserByChannel(otpType, channelValue);
  if (!user) throw new AppError("User not found", 404);

  await issueAndPersistOtp({
    userId: user.id,
    otpType,
    otpPurpose: OTP_PURPOSE_PASSWORD_RESET,
    channelValue,
    firstName: user.firstName,
  });

  return { message: "Password reset OTP sent successfully." };
}

export async function resendResetOtp(input: {
  email?: string;
  phone?: string;
  otpType: string;
}) {
  return requestPasswordReset(input);
}

export async function verifyResetOtp(input: {
  email?: string;
  phone?: string;
  otpType: string;
  otpCode: string;
}) {
  const otpType = normalizeOtpType(input.otpType);
  const otpCode = requireOtpCode(input.otpCode);
  const channelValue = resolveChannelValue({
    otpType,
    email: input.email,
    phone: input.phone,
  });
  const user = await findUserByChannel(otpType, channelValue);
  if (!user) throw new AppError("User not found", 404);

  await validateOtpAndConsume({
    userId: user.id,
    otpType,
    otpPurpose: OTP_PURPOSE_PASSWORD_RESET,
    channelValue,
    otpCode,
  });

  await prisma.token.deleteMany({
    where: { userId: user.id, type: tokenTypes.RESET_PASSWORD },
  });

  const resetToken = generateResetToken();
  await prisma.token.create({
    data: {
      userId: user.id,
      token: resetToken,
      type: tokenTypes.RESET_PASSWORD,
      expiresAt: new Date(Date.now() + resetTokenExpirationMinutes * 60 * 1000),
    },
  });

  return {
    message: "OTP verified. Use the reset token to set a new password.",
    resetToken,
    expiresIn: resetTokenExpirationMinutes * 60,
  };
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError("User not found", 404);
  const valid = await comparePassword(currentPassword, user.passwordHash);
  if (!valid) throw new AppError("Current password is incorrect", 401);

  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
  return { message: "Password updated successfully" };
}
