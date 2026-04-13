export declare const OTP_EXPIRY_SECONDS = 300;
export declare const OTP_COOLDOWN_SECONDS = 60;
export declare const OTP_MAX_ATTEMPTS = 5;
export declare function generateOTP(length?: number): string;
export declare function hashOTP(otp: string): string;
export declare function verifyOTP(rawOtp: string, hashedOtp: string): boolean;
//# sourceMappingURL=otp.service.d.ts.map