import { prisma } from "../lib/prisma";
import { getNotificationPub } from "../lib/redis";

export type NotificationType =
  | "order_update"
  | "order_created"
  | "payment"
  | "shipment"
  | "promotion"
  | "inventory_alert"
  | "review"
  | "general";

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
export async function createNotification(input: CreateNotificationInput) {
  const notification = await prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      metadata: input.metadata ? (input.metadata as object) : undefined,
    },
  });

  const pub = getNotificationPub();
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
export async function getUnreadCount(userId: string): Promise<number> {
  return prisma.notification.count({
    where: { userId, readAt: null },
  });
}
