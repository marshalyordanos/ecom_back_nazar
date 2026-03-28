import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";
import { createNotification } from "./notification.service";

const orderSearchableFields = ["orderNumber", "user.firstName", "user.lastName", "user.email"];
const orderDateFields = ["createdAt", "updatedAt"];

export async function listUserOrders(
  userId: string,
  query: { page?: number; pageSize?: number; search?: string; filter?: string; sort?: string }
) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: orderSearchableFields,
    dateFields: orderDateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereUser = { ...where, userId };

  const [data, total] = await Promise.all([
    prisma.order.findMany({
      where: whereUser,
      orderBy,
      skip,
      take,
      include: { items: true, address: true },
    }),
    prisma.order.count({ where: whereUser }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getOrderById(orderId: string, userId?: string) {
  const where: Record<string, unknown> = { id: orderId };
  if (userId) (where as any).userId = userId;
  const order = await prisma.order.findFirst({
    where,
    include: {
      items: true,
      address: true,
      payments: true,
      shipments: true,
    },
  });
  if (!order) throw new AppError("Order not found", 404);
  return order;
}

export async function cancelOrder(orderId: string, userId: string) {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
  });
  if (!order) throw new AppError("Order not found", 404);
  if (order.status !== "PENDING" && order.status !== "PAID") {
    throw new AppError("Order cannot be cancelled", 400);
  }
  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });
  await createNotification({
    userId,
    type: "order_update",
    title: "Order cancelled",
    message: `Order ${order.orderNumber} has been cancelled.`,
    metadata: { orderId: order.id },
  });
  return updated;
}

export async function completeOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });
  if (!order) throw new AppError("Order not found", 404);
  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: "COMPLETED" },
  });
  await createNotification({
    userId: order.userId,
    type: "order_update",
    title: "Order completed",
    message: `Order ${order.orderNumber} has been completed.`,
    metadata: { orderId: order.id },
  });
  return updated;
}

export async function listOrderItems(orderId: string) {
  const items = await prisma.orderItem.findMany({
    where: { orderId },
    include: { variant: { include: { product: { select: { name: true, slug: true } } } } },
  });
  return items;
}

export async function listOrdersAdmin(query: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
  shopId?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: orderSearchableFields,
    dateFields: orderDateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereShop = query.shopId ? { ...where, shopId: query.shopId } : where;

  const [data, total] = await Promise.all([
    prisma.order.findMany({
      where: whereShop,
      orderBy,
      skip,
      take,
      include: { items: {include: {variant: {include:{variantOptionValues:{include:{optionValue:{include:{option:true}}}}}}}}, address: true, user: { select: { id: true, email: true, firstName: true, lastName: true } } },
    }),
    prisma.order.count({ where: whereShop }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function createOrderAdmin(data: {
  shopId: string;
  userId: string;
  orderNumber?: string;
  status?: string;
  subtotal: number;
  taxTotal?: number;
  discountTotal?: number;
  grandTotal: number;
  currency: string;
  items: Array<{ variantId: string; productName: string; variantName?: string; price: number; quantity: number; total: number }>;
  address: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
  };
}) {
  const orderNumber = data.orderNumber || `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
  const order = await prisma.order.create({
    data: {
      shopId: data.shopId,
      userId: data.userId,
      orderNumber,
      status: (data.status as any) || "PENDING",
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
    await prisma.orderItem.create({
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
  const full = await prisma.order.findUnique({
    where: { id: order.id },
    include: { items: true, address: true },
  });
  await createNotification({
    userId: data.userId,
    type: "order_created",
    title: "Order placed",
    message: `Order ${orderNumber} has been created.`,
    metadata: { orderId: order.id },
  });
  return full;
}
