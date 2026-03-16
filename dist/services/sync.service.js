"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerProductSync = triggerProductSync;
exports.listSyncLogs = listSyncLogs;
exports.getSyncLogById = getSyncLogById;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
async function triggerProductSync(shopId) {
    const startedAt = new Date();
    const shop = await prisma_1.prisma.shop.findUnique({ where: { id: shopId } });
    if (!shop)
        throw new appError_1.default("Shop not found", 404);
    const products = await prisma_1.prisma.product.findMany({
        where: { shopId },
        include: { variants: true },
    });
    let productsSynced = 0;
    try {
        for (const product of products) {
            const existing = await prisma_1.prisma.syncedProduct.findFirst({
                where: { productId: product.id },
            });
            if (existing) {
                await prisma_1.prisma.syncedProduct.update({
                    where: { id: existing.id },
                    data: { syncedAt: new Date() },
                });
            }
            else {
                await prisma_1.prisma.syncedProduct.create({
                    data: {
                        productId: product.id,
                        externalProductId: product.id,
                    },
                });
            }
            productsSynced++;
        }
        const log = await prisma_1.prisma.syncLog.create({
            data: {
                shopId,
                status: "SUCCESS",
                productsSynced,
                startedAt,
                finishedAt: new Date(),
            },
        });
        return log;
    }
    catch (err) {
        await prisma_1.prisma.syncLog.create({
            data: {
                shopId,
                status: "FAILED",
                productsSynced,
                startedAt,
                finishedAt: new Date(),
            },
        });
        throw err;
    }
}
async function listSyncLogs(shopId, query) {
    const where = shopId ? { shopId } : {};
    const page = query.page ?? 1;
    const pageSize = Math.min(query.pageSize ?? 20, 100);
    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
        prisma_1.prisma.syncLog.findMany({
            where,
            orderBy: { startedAt: "desc" },
            skip,
            take: pageSize,
        }),
        prisma_1.prisma.syncLog.count({ where }),
    ]);
    return {
        data,
        pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    };
}
async function getSyncLogById(id) {
    const log = await prisma_1.prisma.syncLog.findUnique({
        where: { id },
    });
    if (!log)
        throw new appError_1.default("Sync log not found", 404);
    return log;
}
//# sourceMappingURL=sync.service.js.map