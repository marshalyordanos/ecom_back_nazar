"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateCart = getOrCreateCart;
exports.addItem = addItem;
exports.updateItemQuantity = updateItemQuantity;
exports.removeItem = removeItem;
exports.checkout = checkout;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const notification_service_1 = require("./notification.service");
async function getOrCreateCart(userId) {
    let cart = await prisma_1.prisma.cart.findFirst({
        where: { userId, status: "active" },
        include: {
            items: {
                include: {
                    variant: {
                        include: {
                            product: { select: { name: true, slug: true } },
                            media: { take: 1 },
                        },
                    },
                },
            },
        },
    });
    if (!cart) {
        cart = await prisma_1.prisma.cart.create({
            data: { userId, status: "active" },
            include: {
                items: {
                    include: {
                        variant: {
                            include: {
                                product: { select: { name: true, slug: true } },
                                media: { take: 1 },
                            },
                        },
                    },
                },
            },
        });
    }
    return cart;
}
async function addItem(userId, variantId, quantity, price) {
    const variant = await prisma_1.prisma.productVariant.findUnique({ where: { id: variantId } });
    if (!variant)
        throw new appError_1.default("Variant not found", 404);
    console.log("variant.price", variant.price, "price", price);
    if (variant.price !== price) {
        throw new appError_1.default("Price mismatch", 400);
    }
    let cart = await prisma_1.prisma.cart.findFirst({
        where: { userId, status: "active" },
        include: { items: true },
    });
    if (!cart) {
        cart = await prisma_1.prisma.cart.create({
            data: { userId, status: "active" },
            include: { items: true },
        });
    }
    const existing = cart.items.find((i) => i.variantId === variantId);
    if (existing) {
        const updated = await prisma_1.prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + quantity, price },
        });
        return await getOrCreateCart(userId);
    }
    await prisma_1.prisma.cartItem.create({
        data: { cartId: cart.id, variantId, quantity, price },
    });
    return await getOrCreateCart(userId);
}
async function updateItemQuantity(userId, itemId, quantity) {
    const cart = await prisma_1.prisma.cart.findFirst({
        where: { userId, status: "active" },
        include: { items: true },
    });
    if (!cart)
        throw new appError_1.default("Cart not found", 404);
    const item = cart.items.find((i) => i.id === itemId);
    if (!item)
        throw new appError_1.default("Cart item not found", 404);
    if (quantity <= 0) {
        await prisma_1.prisma.cartItem.delete({ where: { id: itemId } });
    }
    else {
        await prisma_1.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });
    }
    return await getOrCreateCart(userId);
}
async function removeItem(userId, itemId) {
    const cart = await prisma_1.prisma.cart.findFirst({
        where: { userId, status: "active" },
        include: { items: true },
    });
    if (!cart)
        throw new appError_1.default("Cart not found", 404);
    const item = cart.items.find((i) => i.id === itemId);
    if (!item)
        throw new appError_1.default("Cart item not found", 404);
    await prisma_1.prisma.cartItem.delete({ where: { id: itemId } });
    return await getOrCreateCart(userId);
}
async function checkout(userId, data) {
    const cart = await prisma_1.prisma.cart.findFirst({
        where: { userId, status: "active" },
        include: {
            items: {
                include: { variant: { include: { product: { select: { name: true } } } } },
            },
        },
    });
    if (!cart || cart.items.length === 0)
        throw new appError_1.default("Cart is empty", 400);
    const shop = await prisma_1.prisma.shop.findUnique({ where: { id: data.shopId } });
    if (!shop)
        throw new appError_1.default("Shop not found", 404);
    let subtotal = 0;
    for (const item of cart.items) {
        subtotal += item.price * item.quantity;
    }
    let discountTotal = 0;
    let couponId;
    if (data.couponCode) {
        const coupon = await prisma_1.prisma.coupon.findFirst({
            where: { code: data.couponCode },
        });
        if (coupon && (!coupon.expiresAt || coupon.expiresAt > new Date()) && (coupon.usageLimit == null || coupon.usedCount < coupon.usageLimit)) {
            if (coupon.minOrderAmount == null || subtotal >= coupon.minOrderAmount) {
                discountTotal = coupon.type === "PERCENTAGE" ? (subtotal * coupon.value) / 100 : Math.min(coupon.value, subtotal);
                couponId = coupon.id;
            }
        }
    }
    const taxTotal = 0;
    const grandTotal = subtotal - discountTotal + taxTotal;
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
    const order = await prisma_1.prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
            data: {
                shopId: data.shopId,
                userId,
                orderNumber,
                status: "PENDING",
                subtotal,
                taxTotal,
                discountTotal,
                grandTotal,
                currency: shop.currency,
                address: {
                    create: data.shippingAddress,
                },
            },
            include: { address: true },
        });
        for (const item of cart.items) {
            await tx.orderItem.create({
                data: {
                    orderId: newOrder.id,
                    variantId: item.variantId,
                    productName: item.variant.product?.name || "Product",
                    variantName: item.variant.sku,
                    price: item.price,
                    quantity: item.quantity,
                    total: item.price * item.quantity,
                },
            });
        }
        if (couponId) {
            await tx.couponUsage.create({
                data: { couponId, userId, orderId: newOrder.id },
            });
            await tx.coupon.update({
                where: { id: couponId },
                data: { usedCount: { increment: 1 } },
            });
        }
        await tx.cart.update({
            where: { id: cart.id },
            data: { status: "completed" },
        });
        // 5️⃣ Create payment record
        await tx.payment.create({
            data: {
                orderId: newOrder.id,
                provider: "",
                amount: grandTotal,
                currency: shop.currency,
                status: "PENDING",
            },
        });
        return newOrder;
    });
    const fullOrder = await prisma_1.prisma.order.findUnique({
        where: { id: order.id },
        include: { items: true, address: true },
    });
    if (!fullOrder)
        throw new appError_1.default("Order not found", 404);
    // Notify the customer so their in-app notifications are user-specific.
    await (0, notification_service_1.createNotification)({
        userId,
        type: "order_created",
        title: "Order placed",
        message: `Order ${fullOrder.orderNumber} has been placed successfully.`,
        metadata: { orderId: fullOrder.id },
    });
    return fullOrder;
}
//# sourceMappingURL=cart.service.js.map