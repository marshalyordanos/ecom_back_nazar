import { sendTransactionalSms } from "../services/sms.service";

/**
 * Plain SMS via AfroMessage `/send` — same env tokens as registration OTP
 * (AFRO_MESSAGE_TOKEN, optional AFRO_MESSAGE_SENDER / IDENTIFIER).
 */
export async function sendSms(message: string, phone: string): Promise<void> {
  try {
    await sendTransactionalSms(phone, message);
  } catch (error: unknown) {
    console.error(
      "SMS send error:",
      error instanceof Error ? error.message : error,
    );
  }
}
