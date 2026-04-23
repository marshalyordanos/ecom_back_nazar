import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

let publisher: Redis | null = null;
let adapterPublisher: Redis | null = null;
let adapterSubscriber: Redis | null = null;
let notificationSubscriber: Redis | null = null;

function createRedisClient(): Redis | null {
  if (!process.env.REDIS_URL) return null;
  try {
    const client = new Redis(REDIS_URL, { maxRetriesPerRequest: 3 });
    client.on("error", () => {});
    return client;
  } catch {
    return null;
  }
}

/**
 * Get Redis publisher client for notification pub/sub.
 * Returns null if REDIS_URL is not set or connection fails (app can run without Redis).
 */
export function getNotificationPub(): Redis | null {
  if (!publisher) {
    publisher = createRedisClient();
  }
  return publisher;
}

/**
 * Get dedicated pub/sub clients for Socket.IO Redis adapter.
 */
export function getSocketAdapterRedisClients(): {
  pubClient: Redis;
  subClient: Redis;
} | null {
  if (!adapterPublisher) {
    adapterPublisher = createRedisClient();
  }
  if (!adapterSubscriber) {
    adapterSubscriber = createRedisClient();
  }
  if (!adapterPublisher || !adapterSubscriber) {
    return null;
  }
  return { pubClient: adapterPublisher, subClient: adapterSubscriber };
}

/**
 * Get dedicated Redis subscriber client for app-level "notification" channel.
 */
export function getAppNotificationSub(): Redis | null {
  if (!notificationSubscriber) {
    notificationSubscriber = createRedisClient();
  }
  return notificationSubscriber;
}

export function getRedis(): Redis | null {
  return getNotificationPub();
}
