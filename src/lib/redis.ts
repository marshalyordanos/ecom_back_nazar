import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

let publisher: Redis | null = null;
let subscriber: Redis | null = null;

/**
 * Get Redis publisher client for notification pub/sub.
 * Returns null if REDIS_URL is not set or connection fails (app can run without Redis).
 */
export function getNotificationPub(): Redis | null {
  if (!process.env.REDIS_URL) return null;
  if (!publisher) {
    try {
      publisher = new Redis(REDIS_URL, { maxRetriesPerRequest: 3 });
      publisher.on("error", () => {});
    } catch {
      publisher = null;
    }
  }
  return publisher;
}

/**
 * Get Redis subscriber client (for Socket.io server to subscribe to "notification" channel).
 */
export function getNotificationSub(): Redis | null {
  if (!process.env.REDIS_URL) return null;
  if (!subscriber) {
    try {
      subscriber = new Redis(REDIS_URL, { maxRetriesPerRequest: 3 });
      subscriber.on("error", () => {});
    } catch {
      subscriber = null;
    }
  }
  return subscriber;
}

export function getRedis(): Redis | null {
  return getNotificationPub();
}
