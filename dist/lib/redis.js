"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationPub = getNotificationPub;
exports.getNotificationSub = getNotificationSub;
exports.getRedis = getRedis;
const ioredis_1 = __importDefault(require("ioredis"));
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
let publisher = null;
let subscriber = null;
/**
 * Get Redis publisher client for notification pub/sub.
 * Returns null if REDIS_URL is not set or connection fails (app can run without Redis).
 */
function getNotificationPub() {
    if (!process.env.REDIS_URL)
        return null;
    if (!publisher) {
        try {
            publisher = new ioredis_1.default(REDIS_URL, { maxRetriesPerRequest: 3 });
            publisher.on("error", () => { });
        }
        catch {
            publisher = null;
        }
    }
    return publisher;
}
/**
 * Get Redis subscriber client (for Socket.io server to subscribe to "notification" channel).
 */
function getNotificationSub() {
    if (!process.env.REDIS_URL)
        return null;
    if (!subscriber) {
        try {
            subscriber = new ioredis_1.default(REDIS_URL, { maxRetriesPerRequest: 3 });
            subscriber.on("error", () => { });
        }
        catch {
            subscriber = null;
        }
    }
    return subscriber;
}
function getRedis() {
    return getNotificationPub();
}
//# sourceMappingURL=redis.js.map