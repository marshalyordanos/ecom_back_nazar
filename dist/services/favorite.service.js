"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFavoriteIds = listFavoriteIds;
exports.listFavorites = listFavorites;
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const productInclude = {
    brand: { select: { id: true, name: true, slug: true } },
    category: { select: { id: true, name: true, slug: true } },
    variants: {
        take: 3,
        include: { media: { take: 1 } },
    },
};
async function listFavoriteIds(userId, shopId) {
    const where = {
        userId,
        product: { status: "ACTIVE", ...(shopId ? { shopId } : {}) },
    };
    const rows = await prisma_1.prisma.favorite.findMany({
        where,
        select: { productId: true },
    });
    return { productIds: rows.map((r) => r.productId) };
}
async function listFavorites(userId, shopId, page, pageSize) {
    const where = {
        userId,
        product: { status: "ACTIVE", ...(shopId ? { shopId } : {}) },
    };
    const [rows, total] = await Promise.all([
        prisma_1.prisma.favorite.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                product: { include: productInclude },
            },
        }),
        prisma_1.prisma.favorite.count({ where }),
    ]);
    const products = rows.map((r) => r.product).filter(Boolean);
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    return {
        data: products,
        pagination: { page, pageSize, total, totalPages },
    };
}
async function addFavorite(userId, productId) {
    const product = await prisma_1.prisma.product.findUnique({
        where: { id: productId },
        select: { id: true, status: true },
    });
    if (!product)
        throw new appError_1.default("Product not found", 404);
    if (product.status !== "ACTIVE")
        throw new appError_1.default("Product is not available", 400);
    await prisma_1.prisma.favorite.upsert({
        where: { userId_productId: { userId, productId } },
        create: { userId, productId },
        update: {},
    });
    return { ok: true, productId };
}
async function removeFavorite(userId, productId) {
    await prisma_1.prisma.favorite.deleteMany({
        where: { userId, productId },
    });
    return { ok: true, productId };
}
//# sourceMappingURL=favorite.service.js.map