import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";
import { createNotification } from "./notification.service";

const dateFields = ["createdAt", "paidAt"];

export async function listPayments(query: {
  page?: number;
  pageSize?: number;
  filter?: string;
  sort?: string;
  orderId?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: ["order.orderNumber", "order.user.firstName", "order.user.lastName", "order.user.email"],
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereOrder = query.orderId ? { ...where, orderId: query.orderId } : where;

  const [data, total] = await Promise.all([
    prisma.payment.findMany({
      where: whereOrder,
      orderBy,
      skip,
      take,
      include: { order: { select: { orderNumber: true, user: true } } },
    }),
    prisma.payment.count({ where: whereOrder }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getPaymentById(id: string) {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { order: true },
  });
  if (!payment) throw new AppError("Payment not found", 404);
  return payment;
}

export async function capturePayment(id: string) {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { order: true },
  });
  if (!payment) throw new AppError("Payment not found", 404);
  if (payment.status !== "PENDING") {
    throw new AppError("Payment is not in PENDING state", 400);
  }
  const updated = await prisma.payment.update({
    where: { id },
    data: { status: "PAID", paidAt: new Date() },
  });
  await prisma.order.update({
    where: { id: payment.orderId },
    data: { status: "PAID" },
  });
  await createNotification({
    userId: payment.order.userId,
    type: "payment",
    title: "Payment received",
    message: `Payment for order ${payment.order.orderNumber} has been confirmed.`,
    metadata: { orderId: payment.orderId, paymentId: id },
  });


  // 5️⃣ Create shipment if payment is NOT cash
  if (payment.provider.toLowerCase() !== "cash") {
    const trackingNumber = `TRACK-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
    const shipment = await prisma.shipment.create({
      data: {
        
        orderId: payment.orderId,
        status: "PENDING", // initial shipment status
        trackingNumber: trackingNumber,
        carrier: null,

      },
    });

    // Optional: notify customer about shipment creation
    await createNotification({
      userId: payment.order.userId,
      type: "shipment",
      title: "Shipment created",
      message: `Your order ${payment.order.orderNumber} shipment has been created.`,
      metadata: { orderId: payment.orderId, shipmentId: shipment.id },
    });
  }



  return updated;
}

export async function refundPayment(id: string) {
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { order: true },
  });
  if (!payment) throw new AppError("Payment not found", 404);
  const updated = await prisma.payment.update({
    where: { id },
    data: { status: "REFUNDED" },
  });
  await prisma.order.update({
    where: { id: payment.orderId },
    data: { status: "REFUNDED" },
  });
  await createNotification({
    userId: payment.order.userId,
    type: "payment",
    title: "Payment refunded",
    message: `Payment for order ${payment.order.orderNumber} has been refunded.`,
    metadata: { orderId: payment.orderId, paymentId: id },
  });
  return updated;
}
