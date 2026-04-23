type RegisterExpoPushTokenInput = {
    userId: string;
    token: string;
    platform?: string;
};
export declare function registerExpoPushToken(input: RegisterExpoPushTokenInput): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    token: string;
    platform: string | null;
}>;
export declare function removeExpoPushToken(userId: string, token: string): Promise<{
    message: string;
}>;
export declare function listExpoPushTokensByUser(userId: string): Promise<{
    id: string;
    token: string;
}[]>;
export declare function removeExpoPushTokenById(id: string): Promise<void>;
export {};
//# sourceMappingURL=expoPushToken.service.d.ts.map