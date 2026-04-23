import crypto from "crypto";

export const OTP_EXPIRY_SECONDS = 300;
export const OTP_COOLDOWN_SECONDS = 60;
export const OTP_MAX_ATTEMPTS = 5;

export function generateOTP(length = 6): string {
  const normalizedLength = Math.min(Math.max(length, 4), 6);
  let otp = "";
  for (let i = 0; i < normalizedLength; i += 1) {
    otp += crypto.randomInt(0, 10).toString();
  }
  return otp;
}

export function hashOTP(otp: string): string {
  const secret = process.env.OTP_HASH_SECRET || process.env.JWT_SECRET || "otp-default-secret";
  return crypto.createHash("sha256").update(`${secret}:${otp}`).digest("hex");
}

export function verifyOTP(rawOtp: string, hashedOtp: string): boolean {
  const computed = hashOTP(rawOtp);
  const computedBuffer = Buffer.from(computed, "utf-8");
  const hashBuffer = Buffer.from(hashedOtp, "utf-8");
  if (computedBuffer.length !== hashBuffer.length) return false;
  return crypto.timingSafeEqual(computedBuffer, hashBuffer);
}
