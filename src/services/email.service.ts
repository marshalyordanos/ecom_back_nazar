import { SendMailClient } from "zeptomail";
import AppError from "../utils/appError";

const DEFAULT_ZEPTOMAIL_API_URL = "https://api.zeptomail.com/v1.1/email";

type OtpEmailPurpose = "account_verification" | "password_reset";

interface OtpEmailInput {
  to: string;
  otp: string;
  purpose: OtpEmailPurpose;
  firstName?: string;
}

let zeptoClient: SendMailClient | null = null;
let zeptoClientKey: string | null = null;

function cleanEnv(value?: string): string | undefined {
  if (!value) return undefined;
  let normalized = value.trim();

  while (normalized.startsWith('"') || normalized.startsWith("'")) {
    normalized = normalized.slice(1).trim();
  }
  while (normalized.endsWith('"') || normalized.endsWith("'")) {
    normalized = normalized.slice(0, -1).trim();
  }
  while (normalized.endsWith(";")) {
    normalized = normalized.slice(0, -1).trim();
  }
  return normalized || undefined;
}

function resolveApiUrl(): string {
  const raw = cleanEnv(process.env.ZEPTOMAIL_API_URL);
  if (!raw) return DEFAULT_ZEPTOMAIL_API_URL;
  try {
    return new URL(raw).toString();
  } catch {
    const extracted = raw.match(/https?:\/\/\S+/)?.[0];
    if (extracted) {
      try {
        return new URL(cleanEnv(extracted) || extracted).toString();
      } catch {
        return DEFAULT_ZEPTOMAIL_API_URL;
      }
    }
    return DEFAULT_ZEPTOMAIL_API_URL;
  }
}

function getZeptoMailClient(): SendMailClient {
  const token = cleanEnv(process.env.ZEPTOMAIL_SEND_MAIL_TOKEN);
  const url = resolveApiUrl();

  if (!token) {
    throw new AppError("Email service is not configured", 500);
  }
  if (!token.startsWith("Zoho-enczapikey")) {
    throw new AppError("Invalid ZeptoMail Send Mail token format", 500);
  }
  const key = `${url}::${token}`;
  if (!zeptoClient || zeptoClientKey !== key) {
    zeptoClient = new SendMailClient({ url, token });
    zeptoClientKey = key;
  }
  return zeptoClient;
}

function resolveFromEmail(): string | undefined {
  return cleanEnv(process.env.ZEPTOMAIL_FROM_EMAIL);
}

function buildOtpEmailTemplate(input: OtpEmailInput): {
  subject: string;
  text: string;
  html: string;
} {
  const appName = process.env.APP_NAME || "Ecom";
  const greetingName = input.firstName ? ` ${input.firstName}` : "";
  const actionText =
    input.purpose === "account_verification"
      ? "verify your account"
      : "reset your password";
  const subject =
    input.purpose === "account_verification"
      ? "Verify Your Account"
      : "Password Reset Verification";

  const text =
    `Hi${greetingName},\n\n` +
    `Your verification code is: ${input.otp}\n` +
    `Use this code to ${actionText}. It expires in 5 minutes.\n\n` +
    `If you did not request this code, you can ignore this email.\n\n` +
    `${appName} Security Team`;

  const html = `
  <div style="background:#f4f6fb;padding:24px;font-family:Arial,sans-serif;color:#1d2433;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e8f1;">
      <tr>
        <td style="padding:20px 24px;background:#121a2b;color:#ffffff;">
          <h1 style="margin:0;font-size:20px;letter-spacing:0.2px;">${appName}</h1>
          <p style="margin:6px 0 0 0;font-size:13px;color:#c6d0ea;">Security verification</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px;">
          <p style="margin:0 0 12px 0;font-size:15px;">Hi${greetingName},</p>
          <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;">
            Use the verification code below to ${actionText}.
          </p>
          <div style="text-align:center;margin:20px 0;">
            <span style="display:inline-block;background:#eef2ff;border:1px solid #d9e0ff;border-radius:10px;padding:14px 26px;font-size:28px;letter-spacing:7px;font-weight:700;color:#19233c;">
              ${input.otp}
            </span>
          </div>
          <p style="margin:0 0 16px 0;font-size:13px;color:#49536a;">
            This code expires in <strong>5 minutes</strong> and can only be used once.
          </p>
          <p style="margin:0;font-size:13px;color:#6a7388;">
            If you did not request this code, no action is needed. For safety, do not share this code with anyone.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;background:#f8f9fc;font-size:12px;color:#7a8398;border-top:1px solid #e4e8f1;">
          This is an automated message from ${appName}. Please do not reply directly.
        </td>
      </tr>
    </table>
  </div>`;

  return { subject, text, html };
}

function extractZeptoMailErrorMessage(err: unknown): string {
  if (err && typeof err === "object") {
    const anyErr = err as Record<string, unknown>;
    const message = anyErr.message;
    if (typeof message === "string" && message.trim()) return message;
    const error = anyErr.error;
    if (typeof error === "string" && error.trim()) return error;
    if (error && typeof error === "object") {
      const nested = (error as Record<string, unknown>).message;
      if (typeof nested === "string" && nested.trim()) return nested;
    }
    const response = anyErr.response;
    if (response && typeof response === "object") {
      const data = (response as Record<string, unknown>).data;
      if (typeof data === "string" && data.trim()) return data;
      if (data && typeof data === "object") {
        const d = data as Record<string, unknown>;
        const msg = d.message ?? d.error;
        if (typeof msg === "string" && msg.trim()) return msg;
      }
    }
  }
  if (err instanceof Error && err.message.trim()) return err.message;
  return "Unknown ZeptoMail error";
}

export async function sendOTPEmail(input: OtpEmailInput): Promise<void> {
  const fromAddress = resolveFromEmail();
  if (!fromAddress) {
    throw new AppError("Email service is not configured", 500);
  }

  const appName = process.env.APP_NAME || "Ecom";
  const fromName = cleanEnv(process.env.ZEPTOMAIL_FROM_NAME) || appName;

  const client = getZeptoMailClient();
  const message = buildOtpEmailTemplate(input);

  const toName = input.firstName?.trim() || input.to.split("@")[0] || input.to;

  try {
    await client.sendMail({
      from: {
        address: fromAddress,
        name: fromName,
      },
      to: [
        {
          email_address: {
            address: input.to,
            name: toName,
          },
        },
      ],
      subject: message.subject,
      textbody: message.text,
      htmlbody: message.html,
    });
  } catch (err: unknown) {
    const detail = extractZeptoMailErrorMessage(err);
    throw new AppError(`Failed to send OTP email: ${detail}`, 500);
  }
}
