"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = createNotification;
exports.getUnreadCount = getUnreadCount;
exports.listMyNotifications = listMyNotifications;
exports.markMyNotificationRead = markMyNotificationRead;
exports.markAllMyNotificationsRead = markAllMyNotificationsRead;
const prisma_1 = require("../lib/prisma");
const redis_1 = require("../lib/redis");
/**
 * Create a notification in DB and publish to Redis for real-time delivery via Socket.io.
 */
async function createNotification(input) {
    const notification = await prisma_1.prisma.notification.create({
        data: {
            userId: input.userId,
            type: input.type,
            title: input.title,
            message: input.message,
            metadata: input.metadata ? input.metadata : undefined,
        },
    });
    const pub = (0, redis_1.getNotificationPub)();
    if (pub) {
        const payload = {
            id: notification.id,
            userId: input.userId,
            type: input.type,
            title: input.title,
            message: input.message,
            metadata: input.metadata,
            createdAt: notification.createdAt,
        };
        pub.publish("notification", JSON.stringify(payload));
    }
    return notification;
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