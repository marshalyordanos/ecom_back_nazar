"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = createNotification;
exports.getUnreadCount = getUnreadCount;
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
//# sourceMappingURL=notification.service.js.map