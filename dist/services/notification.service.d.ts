export type NotificationType = "order_update" | "order_created" | "payment" | "shipment" | "promotion" | "inventory_alert" | "review" | "general";
export interface CreateNotificationInput {
    userId: string | null;
    type: NotificationType | string;
    title: string;
    message: string;
    metadata?: Record<string, unknown>;
    sendPush?: boolean;
    targetAudience?: "single_user" | "all_admins";
}
/**
 * Create a notification in DB and publish to Redis for real-time delivery via Socket.io.
 */
export declare function createNotification(input: CreateNotificationInput): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    type: string;
    message: string;
    title: string;
    readAt: Date | null;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
} | {
    data: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        type: string;
        message: string;
        title: string;
        readAt: Date | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }[];
    count: number;
}>;
export declare function notifyAllAdminsOrderEvent(input: {
    title: string;
    message: string;
    metadata?: Record<string, unknown>;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    type: string;
    message: string;
    title: string;
    readAt: Date | null;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
} | {
    data: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        type: string;
        message: string;
        title: string;
        readAt: Date | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }[];
    count: number;
}>;
export declare function notifyAllAdminsPaymentEvent(input: {
    title: string;
    message: string;
    metadata?: Record<string, unknown>;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    type: string;
    message: string;
    title: string;
    readAt: Date | null;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
} | {
    data: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        type: string;
        message: string;
        title: string;
        readAt: Date | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }[];
    count: number;
}>;
/**
 * Get unread count for a user.
 */
export declare function getUnreadCount(userId: string): Promise<number>;
export declare function listMyNotifications(userId: string, query?: {
    page?: number;
    pageSize?: number;
}): Promise<{
    data: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        type: string;
        message: string;
        title: string;
        readAt: Date | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}>;
export declare function markMyNotificationRead(userId: string, notificationId: string): Promise<{
    message: string;
}>;
export declare function markAllMyNotificationsRead(userId: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=notification.service.d.ts.map