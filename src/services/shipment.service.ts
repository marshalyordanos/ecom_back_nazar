import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";
import { createNotification } from "./notification.service";

const dateFields = ["shippedAt", "deliveredAt"];

export async function listShipments(query: {
  page?: number;
  pageSize?: number;
  filter?: string;
  sort?: string;
  orderId?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: [],
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereOrder = query.orderId ? { ...where, orderId: query.orderId } : where;

  const [data, total] = await Promise.all([
    prisma.shipment.findMany({
      where: whereOrder,
      orderBy,
      skip,
      take,
      include: { order: { select: { orderNumber: true, userId: true } } },
    }),
    prisma.shipment.count({ where: whereOrder }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getShipmentById(id: string) {
  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { order: true },
  });
  if (!shipment) throw new AppError("Shipment not found", 404);
  return shipment;
}

export async function getTrackingInfo(id: string) {
  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { order: { include: { address: true } } },
  });
  if (!shipment) throw new AppError("Shipment not found", 404);
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

export async function updateShipmentStatus(
  id: string,
  data: {
    status?: string;
    trackingNumber?: string;
    carrier?: string;
    shippedAt?: Date;
    deliveredAt?: Date;
  }
) {
  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: { order: true },
  });
  if (!shipment) throw new AppError("Shipment not found", 404);

  const updated = await prisma.shipment.update({
    where: { id },
    data: data as Parameters<typeof prisma.shipment.update>[0]["data"],
  });

  await createNotification({
    userId: shipment.order.userId,
    type: "shipment",
    title: "Shipment update",
    message: `Your order ${shipment.order.orderNumber} shipment status: ${updated.status}.`,
    metadata: { orderId: shipment.orderId, shipmentId: id },
  });
  return updated;
}
