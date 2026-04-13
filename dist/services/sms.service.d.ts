interface AfroChallengeResponse {
    verificationId: string;
}
export declare function sendOTPViaAfroMessage(to: string): Promise<AfroChallengeResponse>;
export declare function verifyOTPViaAfroMessage(to: string, verificationId: string, code: string): Promise<boolean>;
export {};
//# sourceMappingURL=sms.service.d.ts.map