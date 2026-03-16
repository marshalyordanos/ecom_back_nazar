"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = initSocket;
exports.getIO = getIO;
const socket_io_1 = require("socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const tokens_1 = require("../config/tokens");
const redis_1 = require("./redis");
let io = null;
function initSocket(httpServer) {
    io = new socket_io_1.Server(httpServer, {
        cors: { origin: "*" },
        path: "/socket.io",
    });
    // Redis adapter for multi-instance pub/sub
    const sub = (0, redis_1.getNotificationSub)();
    const pub = (0, redis_1.getNotificationPub)();
    if (sub && pub) {
        io.adapter((0, redis_adapter_1.createAdapter)(pub, sub));
    }
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token || socket.handshake.query?.token;
        if (!token) {
            return next();
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(String(token), config_1.default.jwt.secret);
            if (decoded.type === tokens_1.tokenTypes.ACCESS) {
                socket.userId = decoded.userId;
            }
        }
        catch {
            // optional auth for socket
        }
        next();
    });
    io.on("connection", (socket) => {
        if (socket.userId) {
            socket.join(`user:${socket.userId}`);
        }
        socket.on("disconnect", () => { });
    });
    // Subscribe to Redis "notification" channel and emit to user room
    if (sub) {
        sub.subscribe("notification", (err) => {
            if (err)
                console.error("Redis subscribe error:", err);
        });
        sub.on("message", (channel, message) => {
            if (channel === "notification" && io) {
                try {
                    const payload = JSON.parse(message);
                    if (payload.userId) {
                        io.to(`user:${payload.userId}`).emit("notification", payload);
                    }
                    io.emit("notification:broadcast", payload);
                }
                catch (e) {
                    console.error("Socket notification parse error:", e);
                }
            }
        });
    }
    return io;
}
function getIO() {
    return io;
}
//# sourceMappingURL=socket.js.map