import { prisma } from "../lib/prisma";
import { getNotificationPub } from "../lib/redis";
import { sendExpoPushToUser } from "./expoPush.service";

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
  sendPush?: boolean;
  targetAudience?: "single_user" | "all_admins";
}

type NotificationPayload = {
  id: string;
  userId: string | null;
  type: string;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
};

function publishNotification(payload: NotificationPayload) {
  const pub = getNotificationPub();
  if (!pub) return;
  pub.publish("notification", JSON.stringify(payload));
}

async function resolveAdminRecipientIds(): Promise<string[]> {
  const admins = await prisma.user.findMany({
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
export async function createNotification(input: CreateNotificationInput) {
  const targetAudience = input.targetAudience ?? "single_user";
  const sendPush = input.sendPush ?? true;

  if (targetAudience === "all_admins") {
    const recipientIds = await resolveAdminRecipientIds();
    if (!recipientIds.length) {
      return { data: [], count: 0 };
    }

    const rows = await Promise.all(
      recipientIds.map((recipientId) =>
        prisma.notification.create({
          data: {
            userId: recipientId,
            type: input.type,
            title: input.title,
            message: input.message,
            metadata: input.metadata ? (input.metadata as object) : undefined,
          },
        }),
      ),
    );

    for (const row of rows) {
      publishNotification({
        id: row.id,
        userId: row.userId,
        type: row.type,
        title: row.title,
        message: row.message,
        metadata: (row.metadata as Record<string, unknown> | null) ?? undefined,
        createdAt: row.createdAt,
      });
    }

    return { data: rows, count: rows.length };
  }

  const notification = await prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      metadata: input.metadata ? (input.metadata as object) : undefined,
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
      await sendExpoPushToUser(input.userId, {
        title: input.title,
        message: input.message,
        data: {
          notificationId: notification.id,
          type: input.type,
          ...(input.metadata || {}),
        },
      });
    } catch (error) {
      console.error("Expo push notification error:", error);
    }
  }

  return notification;
}

export async function notifyAllAdminsOrderEvent(input: {
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}) {
  return createNotification({
    userId: null,
    type: "order_update",
    title: input.title,
    message: input.message,
    metadata: {
      source: "admin_event",
      eventType: "order_event",
      ...(input.metadata || {}),
    },
    targetAudience: "all_admins",
    sendPush: false,
  });
}

export async function notifyAllAdminsPaymentEvent(input: {
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}) {
  return createNotification({
    userId: null,
    type: "payment",
    title: input.title,
    message: input.message,
    metadata: {
      source: "admin_event",
      eventType: "payment_event",
      ...(input.metadata || {}),
    },
    targetAudience: "all_admins",
    sendPush: false,
  });
}

/**
 * Get unread count for a user.
 */
export async function getUnreadCount(userId: string): Promise<number> {
  return prisma.notification.count({
    where: { userId, readAt: null },
  });
}

export async function listMyNotifications(
  userId: string,
  query: { page?: number; pageSize?: number } = {},
) {
  const page = query.page ?? 1;
  const pageSize = Math.min(query.pageSize ?? 20, 50);
  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.notification.count({ where: { userId } }),
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

export async function markMyNotificationRead(
  userId: string,
  notificationId: string,
) {
  await prisma.notification.updateMany({
    where: { id: notificationId, userId },
    data: { readAt: new Date() },
  });
  return { message: "Notification marked as read" };
}

export async function markAllMyNotificationsRead(userId: string) {
  await prisma.notification.updateMany({
    where: { userId, readAt: null },
    data: { readAt: new Date() },
  });
  return { message: "All notifications marked as read" };
}
