"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPayments = listPayments;
exports.getPaymentById = getPaymentById;
exports.capturePayment = capturePayment;
exports.refundPayment = refundPayment;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const notification_service_1 = require("./notification.service");
const dateFields = ["createdAt", "paidAt"];
async function listPayments(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: [],
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const whereOrder = query.orderId ? { ...where, orderId: query.orderId } : where;
    const [data, total] = await Promise.all([
        prisma_1.prisma.payment.findMany({
            where: whereOrder,
            orderBy,
            skip,
            take,
            include: { order: { select: { orderNumber: true, userId: true } } },
        }),
        prisma_1.prisma.payment.count({ where: whereOrder }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getPaymentById(id) {
    const payment = await prisma_1.prisma.payment.findUnique({
        where: { id },
        include: { order: true },
    });
    if (!payment)
        throw new appError_1.default("Payment not found", 404);
    return payment;
}
async function capturePayment(id) {
    const payment = await prisma_1.prisma.payment.findUnique({
        where: { id },
        include: { order: true },
    });
    if (!payment)
        throw new appError_1.default("Payment not found", 404);
    if (payment.status !== "PENDING") {
        throw new appError_1.default("Payment is not in PENDING state", 400);
    }
    const updated = await prisma_1.prisma.payment.update({
        where: { id },
        data: { status: "PAID", paidAt: new Date() },
    });
    await prisma_1.prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "PAID" },
    });
    await (0, notification_service_1.createNotification)({
        userId: payment.order.userId,
        type: "payment",
        title: "Payment received",
        message: `Payment for order ${payment.order.orderNumber} has been confirmed.`,
        metadata: { orderId: payment.orderId, paymentId: id },
    });
    // 5️⃣ Create shipment if payment is NOT cash
    if (payment.provider.toLowerCase() !== "cash") {
        const trackingNumber = `TRACK-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
        const shipment = await prisma_1.prisma.shipment.create({
            data: {
                orderId: payment.orderId,
                status: "PENDING", // initial shipment status
                trackingNumber: trackingNumber,
                carrier: null,
            },
        });
        // Optional: notify customer about shipment creation
        await (0, notification_service_1.createNotification)({
            userId: payment.order.userId,
            type: "shipment",
            title: "Shipment created",
            message: `Your order ${payment.order.orderNumber} shipment has been created.`,
            metadata: { orderId: payment.orderId, shipmentId: shipment.id },
        });
    }
    return updated;
}
async function refundPayment(id) {
    const payment = await prisma_1.prisma.payment.findUnique({
        where: { id },
        include: { order: true },
    });
    if (!payment)
        throw new appError_1.default("Payment not found", 404);
    const updated = await prisma_1.prisma.payment.update({
        where: { id },
        data: { status: "REFUNDED" },
    });
    await prisma_1.prisma.order.update({
        where: { id: payment.orderId },
        data: { status: "REFUNDED" },
    });
    await (0, notification_service_1.createNotification)({
        userId: payment.order.userId,
        type: "payment",
        title: "Payment refunded",
        message: `Payment for order ${payment.order.orderNumber} has been refunded.`,
        metadata: { orderId: payment.orderId, paymentId: id },
    });
    return updated;
}
//# sourceMappingURL=payment.service.js.map