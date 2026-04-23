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
exports.handleChapaCallback = handleChapaCallback;
const axios_1 = __importDefault(require("axios"));
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const notification_service_1 = require("./notification.service");
const sendSms_1 = require("../utils/sendSms");
const helper_1 = require("../utils/helper");
const generateOrderNumber = (counter) => {
    const year = new Date().getFullYear();
    const paddedCounter = String(counter).padStart(7, '0');
    return `ORD-${year}-${paddedCounter}`;
};
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
    const orderCount = await prisma_1.prisma.order.count({
        where: {
            createdAt: {
                gte: new Date(`${new Date().getFullYear()}-01-01`),
                lt: new Date(`${new Date().getFullYear() + 1}-01-01`),
            },
        },
    });
    const orderNumber = generateOrderNumber(orderCount + 1);
    let ord;
    let checkout_url;
    const orderData = await prisma_1.prisma.$transaction(async (tx) => {
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
        const phone = (0, helper_1.formatPhoneTo251)(data.shippingAddress.phone || "");
        const txRef = `${Date.now()}-order-${newOrder.id}`;
        console.log('=====================txRef:', {
            amount: grandTotal,
            currency: 'ETB',
            tx_ref: txRef,
            callback_url: `https://api.wheellol.com/bookings/chapa-callback`,
            'customization[title]': 'Car Rental Booking',
            'customization[description]': 'Payment for car booking',
            phone_number: phone,
            return_url: `https://api.wheellol.com/bookings/confirmation`,
        });
        const chapaData = {
            amount: grandTotal,
            currency: 'ETB',
            tx_ref: txRef,
            callback_url: `https://api.wheellol.com/bookings/chapa-callback`,
            'customization[title]': 'Car Rental Booking',
            'customization[description]': 'Payment for car booking',
            phone_number: phone,
            return_url: `https://api.wheellol.com/bookings/confirmation`,
        };
        try {
            const chapaResponse = await axios_1.default.post('https://api.chapa.co/v1/transaction/initialize', chapaData, {
                headers: {
                    Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log('000000000000000000000005:', chapaResponse);
            const chapaRes = chapaResponse.data;
            if (chapaRes?.status !== 'success') {
                throw new appError_1.default('Chapa initialization failed', 500);
            }
            const fullOrder = await tx.order.findUnique({
                where: { id: newOrder.id },
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
            await (0, notification_service_1.notifyAllAdminsOrderEvent)({
                title: "New order placed",
                message: `Order ${fullOrder.orderNumber} has been placed successfully.`,
                metadata: { orderId: fullOrder.id, eventKind: "order_created" },
            });
            // await tx.commit();
            ord = fullOrder;
            checkout_url = chapaRes.data.checkout_url;
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
            // return {
            //   order: fullOrder,
            //   checkout_url: chapaRes.checkout_url,
            // };
        }
        catch (err) {
            // await tx.abort();
            // console.error('Chapa error:', err.response?.data || err.message);
            throw new appError_1.default('Failed to initialize Chapa payment', 500);
        }
        // 5️⃣ Create payment record
        //  await tx.payment.create({
        //   data: {
        //     orderId: newOrder.id,
        //     provider: "",
        //     providerTransactionId: txRef,
        //     amount: grandTotal,
        //     currency: shop.currency,
        //     status: "PENDING",
        //   },
        // });
    });
    return { order: ord, checkout_url: checkout_url };
}
async function handleChapaCallback(data) {
    if (!data || (!data.trx_ref && !data.tx_ref) || !data.status) {
        throw new appError_1.default('Invalid Chapa payload', 400);
    }
    const refFromCallback = String(data.trx_ref || data.tx_ref);
    let verifiedStatus = data.status;
    try {
        const verifyResponse = await axios_1.default.get(`https://api.chapa.co/v1/transaction/verify/${refFromCallback}`, {
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        if (verifyResponse.data?.status === 'success') {
            verifiedStatus = verifyResponse.data?.data?.status ?? data.status;
        }
    }
    catch (error) {
        console.warn('⚠️ Chapa verification failed, fallback to callback data');
    }
    const finalPaymentStatus = verifiedStatus === 'success' ? 'PAID' : 'FAILED';
    // Update existing payment row created during checkout
    return await prisma_1.prisma.$transaction(async (tx) => {
        const updatedPayment = await tx.payment.updateMany({
            where: {
                provider: 'CHAPA',
                OR: [
                    { providerTransactionId: refFromCallback },
                    { providerTransactionId: String(data.tx_ref || '') },
                    { providerTransactionId: String(data.trx_ref || '') },
                ],
            },
            data: {
                status: finalPaymentStatus,
                providerTransactionId: refFromCallback,
            },
        });
        if (updatedPayment.count === 0) {
            throw new appError_1.default('Payment not found for callback reference', 404);
        }
        const payment = await tx.payment.findFirst({
            where: {
                provider: 'CHAPA',
                providerTransactionId: refFromCallback,
            },
            include: { order: { include: { address: true } } },
            orderBy: { createdAt: 'desc' },
        });
        if (!payment) {
            throw new appError_1.default('Payment not found after callback update', 404);
        }
        if (finalPaymentStatus === 'PAID') {
            await tx.order.update({
                where: { id: payment.orderId },
                data: { status: 'PAID' },
            });
            await (0, notification_service_1.createNotification)({
                userId: payment.order.userId,
                type: "order_paid",
                title: "Order placed",
                message: `Order ${payment.order.orderNumber} has been paid successfully.`,
                metadata: { orderId: payment.order.id },
            });
            await (0, notification_service_1.notifyAllAdminsPaymentEvent)({
                title: "Payment received",
                message: `Order ${payment.order.orderNumber} has been paid successfully.`,
                metadata: { orderId: payment.order.id, eventKind: "payment_received" },
            });
            await (0, sendSms_1.sendSms)(`Your order ${payment.order.orderNumber} has been paid successfully.`, payment.order.address?.phone || '');
        }
        return payment;
    });
}
//# sourceMappingURL=cart.service.js.map