"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCoupons = listCoupons;
exports.getCouponById = getCouponById;
exports.createCoupon = createCoupon;
exports.updateCoupon = updateCoupon;
exports.deleteCoupon = deleteCoupon;
exports.applyCouponToOrder = applyCouponToOrder;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const searchableFields = ["code"];
const dateFields = ["createdAt", "expiresAt"];
async function listCoupons(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields,
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const [data, total] = await Promise.all([
        prisma_1.prisma.coupon.findMany({
            where,
            orderBy,
            skip,
            take,
            include: { usages: { take: 5 } },
        }),
        prisma_1.prisma.coupon.count({ where }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getCouponById(id) {
    const coupon = await prisma_1.prisma.coupon.findUnique({
        where: { id },
        include: { usages: { include: { user: { select: { id: true, email: true } }, order: { select: { orderNumber: true } } } } },
    });
    if (!coupon)
        throw new appError_1.default("Coupon not found", 404);
    return coupon;
}
async function createCoupon(data) {
    const coupon = await prisma_1.prisma.coupon.create({
        data: {
            code: data.code,
            type: data.type,
            value: data.value,
            minOrderAmount: data.minOrderAmount,
            usageLimit: data.usageLimit,
            expiresAt: data.expiresAt,
        },
    });
    return coupon;
}
async function updateCoupon(id, data) {
    const coupon = await prisma_1.prisma.coupon.update({
        where: { id },
        data: data,
    });
    return coupon;
}
async function deleteCoupon(id) {
    await prisma_1.prisma.coupon.delete({ where: { id } });
    return { message: "Coupon deleted successfully" };
}
async function applyCouponToOrder(orderId, couponId, userId) {
    const order = await prisma_1.prisma.order.findUnique({
        where: { id: orderId },
    });
    if (!order)
        throw new appError_1.default("Order not found", 404);
    if (order.userId !== userId)
        throw new appError_1.default("Forbidden", 403);
    const coupon = await prisma_1.prisma.coupon.findUnique({
        where: { id: couponId },
    });
    if (!coupon)
        throw new appError_1.default("Coupon not found", 404);
    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        throw new appError_1.default("Coupon has expired", 400);
    }
    if (coupon.usageLimit != null && coupon.usedCount >= coupon.usageLimit) {
        throw new appError_1.default("Coupon usage limit reached", 400);
    }
    if (coupon.minOrderAmount != null && order.subtotal < coupon.minOrderAmount) {
        throw new appError_1.default(`Minimum order amount for this coupon is ${coupon.minOrderAmount}`, 400);
    }
    const discountTotal = coupon.type === "PERCENTAGE"
        ? (order.subtotal * coupon.value) / 100
        : Math.min(coupon.value, order.subtotal);
    const grandTotal = order.subtotal - discountTotal + order.taxTotal;
    await prisma_1.prisma.$transaction([
        prisma_1.prisma.order.update({
            where: { id: orderId },
            data: { discountTotal, grandTotal },
        }),
        prisma_1.prisma.couponUsage.create({
            data: { couponId, userId, orderId },
        }),
        prisma_1.prisma.coupon.update({
            where: { id: couponId },
            data: { usedCount: { increment: 1 } },
        }),
    ]);
    return await prisma_1.prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true, address: true },
    });
}
//# sourceMappingURL=coupon.service.js.map