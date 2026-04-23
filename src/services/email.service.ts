import nodemailer from "nodemailer";
import AppError from "../utils/appError";

type OtpEmailPurpose = "account_verification" | "password_reset";

interface OtpEmailInput {
  to: string;
  otp: string;
  purpose: OtpEmailPurpose;
  firstName?: string;
}

function buildTransporter() {
  const host = process.env.EMAIL_HOST || process.env.SMTP_HOST;
  const port = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT || 587);
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new AppError("Email service is not configured", 500);
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
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

export async function sendOTPEmail(input: OtpEmailInput): Promise<void> {
  const from =
    process.env.EMAIL_FROM ||
    process.env.SMTP_FROM ||
    process.env.EMAIL_USER ||
    "no-reply@nazartech.net";
  const transporter = buildTransporter();
  const message = buildOtpEmailTemplate(input);

  await transporter.sendMail({
    from: `"${process.env.APP_NAME || "Ecom"}" <${from}>`,
    to: input.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });
}
