"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listShipments = listShipments;
exports.getShipmentById = getShipmentById;
exports.getTrackingInfo = getTrackingInfo;
exports.updateShipmentStatus = updateShipmentStatus;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const notification_service_1 = require("./notification.service");
const dateFields = ["shippedAt", "deliveredAt"];
async function listShipments(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: [],
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const whereOrder = query.orderId ? { ...where, orderId: query.orderId } : where;
    const [data, total] = await Promise.all([
        prisma_1.prisma.shipment.findMany({
            where: whereOrder,
            orderBy,
            skip,
            take,
            include: { order: { select: { orderNumber: true, userId: true } } },
        }),
        prisma_1.prisma.shipment.count({ where: whereOrder }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getShipmentById(id) {
    const shipment = await prisma_1.prisma.shipment.findUnique({
        where: { id },
        include: { order: true },
    });
    if (!shipment)
        throw new appError_1.default("Shipment not found", 404);
    return shipment;
}
async function getTrackingInfo(id) {
    const shipment = await prisma_1.prisma.shipment.findUnique({
        where: { id },
        include: { order: { include: { address: true } } },
    });
    if (!shipment)
        throw new appError_1.default("Shipment not found", 404);
    return {
        trackingNumber: shipment.trackingNumber,
        carrier: shipment.carrier,
        status: shipment.status,
        shippedAt: shipment.shippedAt,
        deliveredAt: shipment.deliveredAt,
        orderNumber: shipment.order.orderNumber,
        address: shipment.order.address,
    };
}
async function updateShipmentStatus(id, data) {
    const shipment = await prisma_1.prisma.shipment.findUnique({
        where: { id },
        include: { order: true },
    });
    if (!shipment)
        throw new appError_1.default("Shipment not found", 404);
    const updated = await prisma_1.prisma.shipment.update({
        where: { id },
        data: data,
    });
    await (0, notification_service_1.createNotification)({
        userId: shipment.order.userId,
        type: "shipment",
        title: "Shipment update",
        message: `Your order ${shipment.order.orderNumber} shipment status: ${updated.status}.`,
        metadata: { orderId: shipment.orderId, shipmentId: id },
    });
    return updated;
}
//# sourceMappingURL=shipment.service.js.map