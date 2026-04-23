import Redis from "ioredis";
/**
 * Get Redis publisher client for notification pub/sub.
 * Returns null if REDIS_URL is not set or connection fails (app can run without Redis).
 */
export declare function getNotificationPub(): Redis | null;
/**
 * Get dedicated pub/sub clients for Socket.IO Redis adapter.
 */
export declare function getSocketAdapterRedisClients(): {
    pubClient: Redis;
    subClient: Redis;
} | null;
/**
 * Get dedicated Redis subscriber client for app-level "notification" channel.
 */
export declare function getAppNotificationSub(): Redis | null;
export declare function getRedis(): Redis | null;
//# sourceMappingURL=redis.d.ts.map