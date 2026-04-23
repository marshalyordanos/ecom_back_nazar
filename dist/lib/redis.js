"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationPub = getNotificationPub;
exports.getSocketAdapterRedisClients = getSocketAdapterRedisClients;
exports.getAppNotificationSub = getAppNotificationSub;
exports.getRedis = getRedis;
const ioredis_1 = __importDefault(require("ioredis"));
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
let publisher = null;
let adapterPublisher = null;
let adapterSubscriber = null;
let notificationSubscriber = null;
function createRedisClient() {
    if (!process.env.REDIS_URL)
        return null;
    try {
        const client = new ioredis_1.default(REDIS_URL, { maxRetriesPerRequest: 3 });
        client.on("error", () => { });
        return client;
    }
    catch {
        return null;
    }
}
/**
 * Get Redis publisher client for notification pub/sub.
 * Returns null if REDIS_URL is not set or connection fails (app can run without Redis).
 */
function getNotificationPub() {
    if (!publisher) {
        publisher = createRedisClient();
    }
    return publisher;
}
/**
 * Get dedicated pub/sub clients for Socket.IO Redis adapter.
 */
function getSocketAdapterRedisClients() {
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
function getAppNotificationSub() {
    if (!notificationSubscriber) {
        notificationSubscriber = createRedisClient();
    }
    return notificationSubscriber;
}
function getRedis() {
    return getNotificationPub();
}
//# sourceMappingURL=redis.js.map