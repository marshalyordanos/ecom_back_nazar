"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerExpoPushToken = registerExpoPushToken;
exports.removeExpoPushToken = removeExpoPushToken;
exports.listExpoPushTokensByUser = listExpoPushTokensByUser;
exports.removeExpoPushTokenById = removeExpoPushTokenById;
const prisma_1 = require("../lib/prisma");
async function registerExpoPushToken(input) {
    const token = input.token.trim();
    if (!token) {
        throw new Error("Push token is required");
    }
    return prisma_1.prisma.expoPushToken.upsert({
        where: { token },
        create: {
            userId: input.userId,
            token,
            platform: input.platform,
        },
        update: {
            userId: input.userId,
            platform: input.platform,
            updatedAt: new Date(),
        },
    });
}
async function removeExpoPushToken(userId, token) {
    const normalized = token.trim();
    if (!normalized) {
        throw new Error("Push token is required");
    }
    await prisma_1.prisma.expoPushToken.deleteMany({
        where: { userId, token: normalized },
    });
    return { message: "Push token removed" };
}
async function listExpoPushTokensByUser(userId) {
    return prisma_1.prisma.expoPushToken.findMany({
        where: { userId },
        select: { id: true, token: true },
    });
}
async function removeExpoPushTokenById(id) {
    await prisma_1.prisma.expoPushToken.deleteMany({ where: { id } });
}
//# sourceMappingURL=expoPushToken.service.js.map