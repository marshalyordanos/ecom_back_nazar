import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";

const searchableFields = ["code"];
const dateFields = ["createdAt", "expiresAt"];

export async function listCoupons(query: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields,
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();

  const [data, total] = await Promise.all([
    prisma.coupon.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { usages: { take: 5 } },
    }),
    prisma.coupon.count({ where }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getCouponById(id: string) {
  const coupon = await prisma.coupon.findUnique({
    where: { id },
    include: { usages: { include: { user: { select: { id: true, email: true } }, order: { select: { orderNumber: true } } } } },
  });
  if (!coupon) throw new AppError("Coupon not found", 404);
  return coupon;
}

export async function createCoupon(data: {
  code: string;
  type: string;
  value: number;
  minOrderAmount?: number;
  usageLimit?: number;
  expiresAt?: Date;
}) {
  const coupon = await prisma.coupon.create({
    data: {
      code: data.code,
      type: data.type as any,
      value: data.value,
      minOrderAmount: data.minOrderAmount,
      usageLimit: data.usageLimit,
      expiresAt: data.expiresAt,
    },
  });
  return coupon;
}

export async function updateCoupon(
  id: string,
  data: {
    code?: string;
    type?: string;
    value?: number;
    minOrderAmount?: number;
    usageLimit?: number;
    expiresAt?: Date;
  }
) {
  const coupon = await prisma.coupon.update({
    where: { id },
    data: data as Parameters<typeof prisma.coupon.update>[0]["data"],
  });
  return coupon;
}

export async function deleteCoupon(id: string) {
  await prisma.coupon.delete({ where: { id } });
  return { message: "Coupon deleted successfully" };
}

export async function applyCouponToOrder(orderId: string, couponId: string, userId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });
  if (!order) throw new AppError("Order not found", 404);
  if (order.userId !== userId) throw new AppError("Forbidden", 403);

  const coupon = await prisma.coupon.findUnique({
    where: { id: couponId },
  });
  if (!coupon) throw new AppError("Coupon not found", 404);
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    throw new AppError("Coupon has expired", 400);
  }
  if (coupon.usageLimit != null && coupon.usedCount >= coupon.usageLimit) {
    throw new AppError("Coupon usage limit reached", 400);
  }
  if (coupon.minOrderAmount != null && order.subtotal < coupon.minOrderAmount) {
    throw new AppError(`Minimum order amount for this coupon is ${coupon.minOrderAmount}`, 400);
  }

  const discountTotal =
    coupon.type === "PERCENTAGE"
      ? (order.subtotal * coupon.value) / 100
      : Math.min(coupon.value, order.subtotal);
  const grandTotal = order.subtotal - discountTotal + order.taxTotal;

  await prisma.$transaction([
    prisma.order.update({
      where: { id: orderId },
      data: { discountTotal, grandTotal },
    }),
    prisma.couponUsage.create({
      data: { couponId, userId, orderId },
    }),
    prisma.coupon.update({
      where: { id: couponId },
      data: { usedCount: { increment: 1 } },
    }),
  ]);

  return await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, address: true },
  });
}
