import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { tokenTypes } from "../config/tokens";
import { getAppNotificationSub, getSocketAdapterRedisClients } from "./redis";

interface JwtPayload {
  userId: string;
  email: string;
  type: string;
}

let io: Server | null = null;

export function initSocket(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: { origin: "*" },
    path: "/socket.io",
  });

  // Redis adapter for multi-instance pub/sub
  const adapterClients = getSocketAdapterRedisClients();
  if (adapterClients) {
    io.adapter(createAdapter(adapterClients.pubClient, adapterClients.subClient));
  }

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) {
      return next();
    }
    try {
      const decoded = jwt.verify(String(token), config.jwt.secret) as JwtPayload;
      if (decoded.type === tokenTypes.ACCESS) {
        (socket as Socket & { userId?: string }).userId = decoded.userId;
      }
    } catch {
      // optional auth for socket
    }
    next();
  });

  io.on("connection", (socket: Socket & { userId?: string }) => {
    if (socket.userId) {
      socket.join(`user:${socket.userId}`);
    }

    socket.on("disconnect", () => {});
  });

  // Subscribe to Redis "notification" channel and emit to user room
  const notificationSub = getAppNotificationSub();
  if (notificationSub) {
    notificationSub.subscribe("notification", (err) => {
      if (err) console.error("Redis subscribe error:", err);
    });
    notificationSub.on("message", (channel, message) => {
      if (channel === "notification" && io) {
        try {
          const payload = JSON.parse(message);
          if (payload.userId) {
            io.to(`user:${payload.userId}`).emit("notification", payload);
          }
          io.emit("notification:broadcast", payload);
        } catch (e) {
          console.error("Socket notification parse error:", e);
        }
      }
    });
  }

  return io;
}

export function getIO(): Server | null {
  return io;
}
