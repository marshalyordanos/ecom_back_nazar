"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserOrders = listUserOrders;
exports.getOrderById = getOrderById;
exports.cancelOrder = cancelOrder;
exports.completeOrder = completeOrder;
exports.listOrderItems = listOrderItems;
exports.listOrdersAdmin = listOrdersAdmin;
exports.createOrderAdmin = createOrderAdmin;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const notification_service_1 = require("./notification.service");
const orderSearchableFields = ["orderNumber"];
const orderDateFields = ["createdAt", "updatedAt"];
async function listUserOrders(userId, query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: orderSearchableFields,
        dateFields: orderDateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const whereUser = { ...where, userId };
    const [data, total] = await Promise.all([
        prisma_1.prisma.order.findMany({
            where: whereUser,
            orderBy,
            skip,
            take,
            include: { items: true, address: true },
        }),
        prisma_1.prisma.order.count({ where: whereUser }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getOrderById(orderId, userId) {
    const where = { id: orderId };
    if (userId)
        where.userId = userId;
    const order = await prisma_1.prisma.order.findFirst({
        where,
        include: {
            items: true,
            address: true,
            payments: true,
            shipments: true,
        },
    });
    if (!order)
        throw new appError_1.default("Order not found", 404);
    return order;
}
async function cancelOrder(orderId, userId) {
    const order = await prisma_1.prisma.order.findFirst({
        where: { id: orderId, userId },
    });
    if (!order)
        throw new appError_1.default("Order not found", 404);
    if (order.status !== "PENDING" && order.status !== "PAID") {
        throw new appError_1.default("Order cannot be cancelled", 400);
    }
    const updated = await prisma_1.prisma.order.update({
        where: { id: orderId },
        data: { status: "CANCELLED" },
    });
    await (0, notification_service_1.createNotification)({
        userId,
        type: "order_update",
        title: "Order cancelled",
        message: `Order ${order.orderNumber} has been cancelled.`,
        metadata: { orderId: order.id },
    });
    return updated;
}
async function completeOrder(orderId) {
    const order = await prisma_1.prisma.order.findUnique({
        where: { id: orderId },
    });
    if (!order)
        throw new appError_1.default("Order not found", 404);
    const updated = await prisma_1.prisma.order.update({
        where: { id: orderId },
        data: { status: "COMPLETED" },
    });
    await (0, notification_service_1.createNotification)({
        userId: order.userId,
        type: "order_update",
        title: "Order completed",
        message: `Order ${order.orderNumber} has been completed.`,
        metadata: { orderId: order.id },
    });
    return updated;
}
async function listOrderItems(orderId) {
    const items = await prisma_1.prisma.orderItem.findMany({
        where: { orderId },
        include: { variant: { include: { product: { select: { name: true, slug: true } } } } },
    });
    return items;
}
async function listOrdersAdmin(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: orderSearchableFields,
        dateFields: orderDateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const whereShop = query.shopId ? { ...where, shopId: query.shopId } : where;
    const [data, total] = await Promise.all([
        prisma_1.prisma.order.findMany({
            where: whereShop,
            orderBy,
            skip,
            take,
            include: { items: true, address: true, user: { select: { id: true, email: true, firstName: true, lastName: true } } },
        }),
        prisma_1.prisma.order.count({ where: whereShop }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function createOrderAdmin(data) {
    const orderNumber = data.orderNumber || `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
    const order = await prisma_1.prisma.order.create({
        data: {
            shopId: data.shopId,
            userId: data.userId,
            orderNumber,
            status: data.status || "PENDING",
            subtotal: data.subtotal,
            taxTotal: data.taxTotal ?? 0,
            discountTotal: data.discountTotal ?? 0,
            grandTotal: data.grandTotal,
            currency: data.currency,
            address: { create: data.address },
        },
        include: { address: true },
    });
    for (const item of data.items) {
        await prisma_1.prisma.orderItem.create({
            data: {
                orderId: order.id,
                variantId: item.variantId,
                productName: item.productName,
                variantName: item.variantName,
                price: item.price,
                quantity: item.quantity,
                total: item.total,
            },
        });
    }
    const full = await prisma_1.prisma.order.findUnique({
        where: { id: order.id },
        include: { items: true, address: true },
    });
    await (0, notification_service_1.createNotification)({
        userId: data.userId,
        type: "order_created",
        title: "Order placed",
        message: `Order ${orderNumber} has been created.`,
        metadata: { orderId: order.id },
    });
    return full;
}
//# sourceMappingURL=order.service.js.map