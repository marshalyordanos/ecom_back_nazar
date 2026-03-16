import Redis from "ioredis";
/**
 * Get Redis publisher client for notification pub/sub.
 * Returns null if REDIS_URL is not set or connection fails (app can run without Redis).
 */
export declare function getNotificationPub(): Redis | null;
/**
 * Get Redis subscriber client (for Socket.io server to subscribe to "notification" channel).
 */
export declare function getNotificationSub(): Redis | null;
export declare function getRedis(): Redis | null;
//# sourceMappingURL=redis.d.ts.map