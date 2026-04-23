type PushPayload = {
    title: string;
    message: string;
    data?: Record<string, unknown>;
};
export declare function sendExpoPushToUser(userId: string, payload: PushPayload): Promise<void>;
export {};
//# sourceMappingURL=expoPush.service.d.ts.map