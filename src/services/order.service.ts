import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";
import { createNotification, notifyAllAdminsOrderEvent } from "./notification.service";
import axios from "axios";
import bcrypt from "bcrypt";
import { ethiopiaPhoneLookupVariants, finalizeShippingAddressForOrder } from "../utils/helper";
import { notifyOrderPlacedSms } from "./sms.service";

const orderSearchableFields = ["orderNumber", "user.firstName", "user.lastName", "user.email"];
const orderDateFields = ["createdAt", "updatedAt"];
const CHAPA_INIT_URL = "https://api.chapa.co/v1/transaction/initialize";

const generateOrderNumber = (counter: number) => {
  const year = new Date().getFullYear();
  const paddedCounter = String(counter).padStart(7, "0");
  return `ORD-${year}-${paddedCounter}`;
};

/** Maps checkout full name to required User.firstName / lastName. */
function splitGuestFullName(full: string): { firstName: string; lastName: string } {
  const trimmed = full.trim().replace(/\s+/g, " ");
  if (!trimmed) return { firstName: "Guest", lastName: "Customer" };
  const parts = trimmed.split(" ");
  if (parts.length === 1) return { firstName: parts[0], lastName: "Customer" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

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
      include: {
        address: true,
        pickupLocation: { select: { id: true, name: true, addressLine1: true, city: true } },
        shipments: { select: { id: true, status: true } },
        items: {
          include: {
            variant: {
              select: {
                id: true,
                image: true,
                productId: true,
                sku: true,
                product: { select: { id: true, name: true } },
                media: {
                  orderBy: [{ position: "asc" }, { id: "asc" }],
                  take: 1,
                  select: { url: true },
                },
              },
            },
          },
        },
      },
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
      pickupLocation: { select: { id: true, name: true, addressLine1: true, city: true } },
    },
  });
  if (!order) throw new AppError("Order not found", 404);
  return order;
}

export async function trackOrderByReference(reference: string) {
  const ref = String(reference || "").trim();
  if (!ref) throw new AppError("tracking number is required", 400);

  const order = await prisma.order.findFirst({
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

  if (!order) throw new AppError("Order not found", 404);

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
  await notifyAllAdminsOrderEvent({
    title: "Order cancelled",
    message: `Order ${order.orderNumber} has been cancelled.`,
    metadata: { orderId: order.id, eventKind: "order_cancelled" },
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
  await notifyAllAdminsOrderEvent({
    title: "Order completed",
    message: `Order ${order.orderNumber} has been completed.`,
    metadata: { orderId: order.id, eventKind: "order_completed" },
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
  await notifyAllAdminsOrderEvent({
    title: "New order created",
    message: `Order ${orderNumber} has been created.`,
    metadata: { orderId: order.id, eventKind: "order_created" },
  });
  return full;
}

export async function checkoutAsGuest(data: {
  shopId: string;
  items: Array<{ variantId: string; quantity: number; price: number }>;
  shippingAddress: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    email?: string;
  };
  couponCode?: string;
  paymentMethod?: "chapa" | "pickup";
  /** Required when paymentMethod is pickup */
  pickupLocationId?: string;
}) {
  if (!data.shopId) throw new AppError("shopId required", 400);
  if (!data.items?.length) throw new AppError("Cart is empty", 400);
  if (!data.shippingAddress?.name || !data.shippingAddress?.phone || !data.shippingAddress?.addressLine1) {
    throw new AppError("Incomplete shippingAddress", 400);
  }

  const paymentMethod = data.paymentMethod === "pickup" ? "pickup" : "chapa";

  let pickupLocationIdResolved: string | undefined;
  if (paymentMethod === "pickup") {
    const lid = typeof data.pickupLocationId === "string" ? data.pickupLocationId.trim() : "";
    if (!lid) throw new AppError("Pickup location is required for store pickup", 400);
    const pickupLoc = await prisma.shopLocation.findFirst({
      where: { id: lid, shopId: data.shopId },
    });
    if (!pickupLoc) throw new AppError("Pickup location not found for this shop", 400);
    pickupLocationIdResolved = pickupLoc.id;
  }
  const shop = await prisma.shop.findUnique({ where: { id: data.shopId } });
  if (!shop) throw new AppError("Shop not found", 404);

  const variantIds = data.items.map((i) => i.variantId);
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: variantIds } },
    include: { product: { select: { id: true, name: true, shopId: true } } },
  });
  const variantById = new Map(variants.map((v) => [v.id, v]));
  if (variantById.size !== variantIds.length) throw new AppError("Some cart items are invalid", 400);

  let subtotal = 0;
  const normalizedItems = data.items.map((item) => {
    const variant = variantById.get(item.variantId)!;
    if (variant.product.shopId !== data.shopId) throw new AppError("Item does not belong to selected shop", 400);
    if (Number(item.price) !== Number(variant.price)) throw new AppError("Price changed, refresh your cart", 400);
    const quantity = Math.max(1, Number(item.quantity || 1));
    const lineTotal = Number(variant.price) * quantity;
    subtotal += lineTotal;
    return { item, variant, quantity, lineTotal };
  });

  let discountTotal = 0;
  let couponId: string | undefined;
  if (data.couponCode) {
    const coupon = await prisma.coupon.findFirst({ where: { code: data.couponCode } });
    if (coupon && (!coupon.expiresAt || coupon.expiresAt > new Date()) && (coupon.usageLimit == null || coupon.usedCount < coupon.usageLimit)) {
      if (coupon.minOrderAmount == null || subtotal >= coupon.minOrderAmount) {
        discountTotal = coupon.type === "PERCENTAGE" ? (subtotal * coupon.value) / 100 : Math.min(coupon.value, subtotal);
        couponId = coupon.id;
      }
    }
  }
  const taxTotal = 0;
  const grandTotal = subtotal - discountTotal + taxTotal;

  let shipping = finalizeShippingAddressForOrder(data.shippingAddress);
  if (paymentMethod === "pickup" && pickupLocationIdResolved) {
    const pl = await prisma.shopLocation.findUnique({
      where: { id: pickupLocationIdResolved },
      select: { name: true, city: true, country: true },
    });
    if (pl) {
      shipping = {
        ...shipping,
        addressLine1: `Pickup — ${pl.name}`,
        city: shipping.city || pl.city,
        country: shipping.country || pl.country,
      };
    }
  }
  const phoneNormalized = shipping.phone.replace(/\s/g, "");
  const phoneDigits = phoneNormalized.replace(/\D/g, "");
  const email = `user+${phoneDigits}@gmail.com`;

  const phoneVariants = ethiopiaPhoneLookupVariants(data.shippingAddress.phone);
  let user = await prisma.user.findFirst({
    where: {
      OR: [{ email }, ...phoneVariants.map((p) => ({ phone: p }))],
    },
  });

  const { firstName, lastName } = splitGuestFullName(shipping.name);

  if (!user) {
    const passwordHash = await bcrypt.hash("12345678", 10);
    const defaultRole = await prisma.role.findFirst({ where: { name: "user" } });
    if (!defaultRole) {
      throw new AppError("Default role 'user' not found. Run seed.", 500);
    }
    user = await prisma.user.create({
      data: {
        email,
        phone: phoneNormalized,
        passwordHash,
        firstName,
        lastName,
        registrationSource: "SYSTEM_GUEST_CHECKOUT",
        isSuperAdmin: false,
        roles: { connect: [{ id: defaultRole.id }] },
      },
    });
  }

  const orderCount = await prisma.order.count({
    where: {
      createdAt: {
        gte: new Date(`${new Date().getFullYear()}-01-01`),
        lt: new Date(`${new Date().getFullYear() + 1}-01-01`),
      },
    },
  });
  const orderNumber = generateOrderNumber(orderCount + 1);

  const result = await prisma.$transaction(async (tx) => {
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
        ...(pickupLocationIdResolved ? { pickupLocationId: pickupLocationIdResolved } : {}),
        address: {
          create: {
            name: shipping.name,
            phone: shipping.phone,
            addressLine1: shipping.addressLine1,
            addressLine2: shipping.addressLine2,
            city: shipping.city,
            state: shipping.state,
            country: shipping.country,
            postalCode: shipping.postalCode,
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

    let checkout_url: string | null = null;
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
    } else {
      const txRef = `${Date.now()}-order-${newOrder.id}`;
      const chapaResponse = await axios.post(
        CHAPA_INIT_URL,
        {
          amount: grandTotal,
          currency: "ETB",
          tx_ref: txRef,
          phone_number: phoneNormalized,
          callback_url: `${process.env.BACKEND_URL || ""}/cart/chapa-callback`,
          return_url: `${process.env.FRONTEND_URL || ""}/orders/${newOrder.id}?paid=1`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const chapaRes: any = chapaResponse.data;
      if (chapaRes?.status !== "success") {
        throw new AppError("Failed to initialize Chapa payment", 500);
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
      include: {
        items: true,
        address: true,
        payments: true,
        pickupLocation: { select: { id: true, name: true, addressLine1: true, city: true } },
      },
    });
    return { order: fullOrder, checkout_url };
  });

  const o = result.order;
  const phoneNotify = o?.address?.phone;
  if (phoneNotify && o?.orderNumber) {
    void notifyOrderPlacedSms(phoneNotify, o.orderNumber, shop.name);
  }

  return result;
}
