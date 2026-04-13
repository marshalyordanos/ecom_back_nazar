"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserOrders = listUserOrders;
exports.getOrderById = getOrderById;
exports.trackOrderByReference = trackOrderByReference;
exports.cancelOrder = cancelOrder;
exports.completeOrder = completeOrder;
exports.listOrderItems = listOrderItems;
exports.listOrdersAdmin = listOrdersAdmin;
exports.createOrderAdmin = createOrderAdmin;
exports.checkoutAsGuest = checkoutAsGuest;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const notification_service_1 = require("./notification.service");
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const helper_1 = require("../utils/helper");
const orderSearchableFields = ["orderNumber", "user.firstName", "user.lastName", "user.email"];
const orderDateFields = ["createdAt", "updatedAt"];
const CHAPA_INIT_URL = "https://api.chapa.co/v1/transaction/initialize";
const generateOrderNumber = (counter) => {
    const year = new Date().getFullYear();
    const paddedCounter = String(counter).padStart(7, "0");
    return `ORD-${year}-${paddedCounter}`;
};
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
async function trackOrderByReference(reference) {
    const ref = String(reference || "").trim();
    if (!ref)
        throw new appError_1.default("tracking number is required", 400);
    const order = await prisma_1.prisma.order.findFirst({
        where: {
            OR: [
                { orderNumber: ref },
                { shipments: { some: { trackingNumber: ref } } },
            ],
        },
        include: {
            items: {
                select: {
                    id: true,
                    productName: true,
                    variantName: true,
                    price: true,
                    quantity: true,
                    total: true,
                },
            },
            address: {
                select: {
                    name: true,
                    city: true,
                    state: true,
                    country: true,
                    phone: true,
                },
            },
            shipments: {
                select: {
                    id: true,
                    status: true,
                    trackingNumber: true,
                    carrier: true,
                    shippedAt: true,
                    deliveredAt: true,
                },
            },
            payments: {
                select: {
                    id: true,
                    provider: true,
                    status: true,
                    amount: true,
                    currency: true,
                    paidAt: true,
                    createdAt: true,
                },
            },
        },
    });
    if (!order)
        throw new appError_1.default("Order not found", 404);
    return {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        grandTotal: order.grandTotal,
        currency: order.currency,
        createdAt: order.createdAt,
        address: order.address,
        items: order.items,
        shipments: order.shipments,
        payments: order.payments,
    };
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
            include: { items: { include: { variant: { include: { variantOptionValues: { include: { optionValue: { include: { option: true } } } } } } } }, address: true, user: { select: { id: true, email: true, firstName: true, lastName: true } } },
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
async function checkoutAsGuest(data) {
    if (!data.shopId)
        throw new appError_1.default("shopId required", 400);
    if (!data.items?.length)
        throw new appError_1.default("Cart is empty", 400);
    if (!data.shippingAddress?.name || !data.shippingAddress?.phone || !data.shippingAddress?.addressLine1 || !data.shippingAddress?.city) {
        throw new appError_1.default("Incomplete shippingAddress", 400);
    }
    const paymentMethod = data.paymentMethod === "pickup" ? "pickup" : "chapa";
    const shop = await prisma_1.prisma.shop.findUnique({ where: { id: data.shopId } });
    if (!shop)
        throw new appError_1.default("Shop not found", 404);
    const variantIds = data.items.map((i) => i.variantId);
    const variants = await prisma_1.prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
        include: { product: { select: { id: true, name: true, shopId: true } } },
    });
    const variantById = new Map(variants.map((v) => [v.id, v]));
    if (variantById.size !== variantIds.length)
        throw new appError_1.default("Some cart items are invalid", 400);
    let subtotal = 0;
    const normalizedItems = data.items.map((item) => {
        const variant = variantById.get(item.variantId);
        if (variant.product.shopId !== data.shopId)
            throw new appError_1.default("Item does not belong to selected shop", 400);
        if (Number(item.price) !== Number(variant.price))
            throw new appError_1.default("Price changed, refresh your cart", 400);
        const quantity = Math.max(1, Number(item.quantity || 1));
        const lineTotal = Number(variant.price) * quantity;
        subtotal += lineTotal;
        return { item, variant, quantity, lineTotal };
    });
    let discountTotal = 0;
    let couponId;
    if (data.couponCode) {
        const coupon = await prisma_1.prisma.coupon.findFirst({ where: { code: data.couponCode } });
        if (coupon && (!coupon.expiresAt || coupon.expiresAt > new Date()) && (coupon.usageLimit == null || coupon.usedCount < coupon.usageLimit)) {
            if (coupon.minOrderAmount == null || subtotal >= coupon.minOrderAmount) {
                discountTotal = coupon.type === "PERCENTAGE" ? (subtotal * coupon.value) / 100 : Math.min(coupon.value, subtotal);
                couponId = coupon.id;
            }
        }
    }
    const taxTotal = 0;
    const grandTotal = subtotal - discountTotal + taxTotal;
    const phone = (0, helper_1.formatPhoneTo251)(data.shippingAddress.phone || "");
    const phoneDigits = phone.replace(/\D/g, "");
    const firstName = "registerd";
    const lastName = "byadmin";
    const email = `user+${phoneDigits}@gmail.com`;
    let user = await prisma_1.prisma.user.findFirst({
        where: { OR: [{ phone }, { email }] },
    });
    if (!user) {
        const passwordHash = await bcrypt_1.default.hash("12345678", 10);
        const defaultRole = await prisma_1.prisma.role.findFirst({ where: { name: "user" } });
        if (!defaultRole) {
            throw new appError_1.default("Default role 'user' not found. Run seed.", 500);
        }
        user = await prisma_1.prisma.user.create({
            data: {
                email,
                phone,
                passwordHash,
                firstName,
                lastName,
                isSuperAdmin: false,
                roles: { connect: [{ id: defaultRole.id }] },
            },
        });
    }
    const orderCount = await prisma_1.prisma.order.count({
        where: {
            createdAt: {
                gte: new Date(`${new Date().getFullYear()}-01-01`),
                lt: new Date(`${new Date().getFullYear() + 1}-01-01`),
            },
        },
    });
    const orderNumber = generateOrderNumber(orderCount + 1);
    return prisma_1.prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
            data: {
                shopId: data.shopId,
                userId: user.id,
                orderNumber,
                status: "PENDING",
                subtotal,
                taxTotal,
                discountTotal,
                grandTotal,
                currency: shop.currency,
                address: {
                    create: {
                        name: data.shippingAddress.name || `${firstName} ${lastName}`,
                        phone,
                        addressLine1: data.shippingAddress.addressLine1,
                        addressLine2: data.shippingAddress.addressLine2,
                        city: data.shippingAddress.city,
                        state: data.shippingAddress.state,
                        country: data.shippingAddress.country || "—",
                        postalCode: data.shippingAddress.postalCode,
                    },
                },
            },
        });
        for (const row of normalizedItems) {
            await tx.orderItem.create({
                data: {
                    orderId: newOrder.id,
                    variantId: row.variant.id,
                    productName: row.variant.product?.name || "Product",
                    variantName: row.variant.sku,
                    price: Number(row.variant.price),
                    quantity: row.quantity,
                    total: row.lineTotal,
                },
            });
        }
        if (couponId) {
            await tx.couponUsage.create({
                data: { couponId, userId: user.id, orderId: newOrder.id },
            });
            await tx.coupon.update({
                where: { id: couponId },
                data: { usedCount: { increment: 1 } },
            });
        }
        let checkout_url = null;
        if (paymentMethod === "pickup") {
            await tx.payment.create({
                data: {
                    orderId: newOrder.id,
                    provider: "PICKUP",
                    amount: grandTotal,
                    currency: shop.currency,
                    status: "PENDING",
                },
            });
        }
        else {
            const txRef = `${Date.now()}-order-${newOrder.id}`;
            const chapaResponse = await axios_1.default.post(CHAPA_INIT_URL, {
                amount: grandTotal,
                currency: "ETB",
                tx_ref: txRef,
                phone_number: phone,
                callback_url: `${process.env.BACKEND_URL || ""}/cart/chapa-callback`,
                return_url: `${process.env.FRONTEND_URL || ""}/orders/${newOrder.id}?paid=1`,
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            });
            const chapaRes = chapaResponse.data;
            if (chapaRes?.status !== "success") {
                throw new appError_1.default("Failed to initialize Chapa payment", 500);
            }
            checkout_url = chapaRes?.data?.checkout_url || null;
            await tx.payment.create({
                data: {
                    orderId: newOrder.id,
                    provider: "CHAPA",
                    providerTransactionId: txRef,
                    amount: grandTotal,
                    currency: "ETB",
                    status: "PENDING",
                },
            });
        }
        const fullOrder = await tx.order.findUnique({
            where: { id: newOrder.id },
            include: { items: true, address: true, payments: true },
        });
        return { order: fullOrder, checkout_url };
    });
}
//# sourceMappingURL=order.service.js.map