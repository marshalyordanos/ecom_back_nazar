type OtpEmailPurpose = "account_verification" | "password_reset";
interface OtpEmailInput {
    to: string;
    otp: string;
    purpose: OtpEmailPurpose;
    firstName?: string;
}
export declare function sendOTPEmail(input: OtpEmailInput): Promise<void>;
export {};
//# sourceMappingURL=email.service.d.ts.map