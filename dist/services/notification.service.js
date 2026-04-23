"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = createNotification;
exports.notifyAllAdminsOrderEvent = notifyAllAdminsOrderEvent;
exports.notifyAllAdminsPaymentEvent = notifyAllAdminsPaymentEvent;
exports.getUnreadCount = getUnreadCount;
exports.listMyNotifications = listMyNotifications;
exports.markMyNotificationRead = markMyNotificationRead;
exports.markAllMyNotificationsRead = markAllMyNotificationsRead;
const prisma_1 = require("../lib/prisma");
const redis_1 = require("../lib/redis");
const expoPush_service_1 = require("./expoPush.service");
function publishNotification(payload) {
    const pub = (0, redis_1.getNotificationPub)();
    if (!pub)
        return;
    pub.publish("notification", JSON.stringify(payload));
}
async function resolveAdminRecipientIds() {
    const admins = await prisma_1.prisma.user.findMany({
        where: {
            status: "ACTIVE",
            roles: { some: { name: { not: "user" } } },
        },
        select: { id: true },
    });
    return admins.map((x) => x.id);
}
/**
 * Create a notification in DB and publish to Redis for real-time delivery via Socket.io.
 */
async function createNotification(input) {
    const targetAudience = input.targetAudience ?? "single_user";
    const sendPush = input.sendPush ?? true;
    if (targetAudience === "all_admins") {
        const recipientIds = await resolveAdminRecipientIds();
        if (!recipientIds.length) {
            return { data: [], count: 0 };
        }
        const rows = await Promise.all(recipientIds.map((recipientId) => prisma_1.prisma.notification.create({
            data: {
                userId: recipientId,
                type: input.type,
                title: input.title,
                message: input.message,
                metadata: input.metadata ? input.metadata : undefined,
            },
        })));
        for (const row of rows) {
            publishNotification({
                id: row.id,
                userId: row.userId,
                type: row.type,
                title: row.title,
                message: row.message,
                metadata: row.metadata ?? undefined,
                createdAt: row.createdAt,
            });
        }
        return { data: rows, count: rows.length };
    }
    const notification = await prisma_1.prisma.notification.create({
        data: {
            userId: input.userId,
            type: input.type,
            title: input.title,
            message: input.message,
            metadata: input.metadata ? input.metadata : undefined,
        },
    });
    publishNotification({
        id: notification.id,
        userId: input.userId,
        type: input.type,
        title: input.title,
        message: input.message,
        metadata: input.metadata,
        createdAt: notification.createdAt,
    });
    if (sendPush && input.userId) {
        try {
            await (0, expoPush_service_1.sendExpoPushToUser)(input.userId, {
                title: input.title,
                message: input.message,
                data: {
                    notificationId: notification.id,
                    type: input.type,
                    ...(input.metadata || {}),
                },
            });
        }
        catch (error) {
            console.error("Expo push notification error:", error);
        }
    }
    return notification;
}
async function notifyAllAdminsOrderEvent(input) {
    return createNotification({
        userId: null,
        type: "order_update",
        title: input.title,
        message: input.message,
        metadata: { source: "admin_event", eventType: "order_event", ...(input.metadata || {}) },
        targetAudience: "all_admins",
        sendPush: false,
    });
}
async function notifyAllAdminsPaymentEvent(input) {
    return createNotification({
        userId: null,
        type: "payment",
        title: input.title,
        message: input.message,
        metadata: { source: "admin_event", eventType: "payment_event", ...(input.metadata || {}) },
        targetAudience: "all_admins",
        sendPush: false,
    });
}
/**
 * Get unread count for a user.
 */
async function getUnreadCount(userId) {
    return prisma_1.prisma.notification.count({
        where: { userId, readAt: null },
    });
}
async function listMyNotifications(userId, query = {}) {
    const page = query.page ?? 1;
    const pageSize = Math.min(query.pageSize ?? 20, 50);
    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
        prisma_1.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        }),
        prisma_1.prisma.notification.count({ where: { userId } }),
    ]);
    return {
        data,
        pagination: {
            page,
            pageSize,
            total,
            totalPages: Math.max(1, Math.ceil(total / pageSize)),
        },
    };
}
async function markMyNotificationRead(userId, notificationId) {
    await prisma_1.prisma.notification.updateMany({
        where: { id: notificationId, userId },
        data: { readAt: new Date() },
    });
    return { message: "Notification marked as read" };
}
async function markAllMyNotificationsRead(userId) {
    await prisma_1.prisma.notification.updateMany({
        where: { userId, readAt: null },
        data: { readAt: new Date() },
    });
    return { message: "All notifications marked as read" };
}
//# sourceMappingURL=notification.service.js.map