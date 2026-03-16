export type NotificationType = "order_update" | "order_created" | "payment" | "shipment" | "promotion" | "inventory_alert" | "review" | "general";
export interface CreateNotificationInput {
    userId: string | null;
    type: NotificationType | string;
    title: string;
    message: string;
    metadata?: Record<string, unknown>;
}
/**
 * Create a notification in DB and publish to Redis for real-time delivery via Socket.io.
 */
export declare function createNotification(input: CreateNotificationInput): Promise<{
    userId: string | null;
    type: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    message: string;
    readAt: Date | null;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
}>;
/**
 * Get unread count for a user.
 */
export declare function getUnreadCount(userId: string): Promise<number>;
//# sourceMappingURL=notification.service.d.ts.map