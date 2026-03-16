import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";

export async function getOrCreateCart(userId: string) {
  let cart = await prisma.cart.findFirst({
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
    cart = await prisma.cart.create({
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

export async function addItem(userId: string, variantId: string, quantity: number, price: number) {
  const variant = await prisma.productVariant.findUnique({ where: { id: variantId } });
  if (!variant) throw new AppError("Variant not found", 404);

  let cart = await prisma.cart.findFirst({
    where: { userId, status: "active" },
    include: { items: true },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId, status: "active" },
      include: { items: true },
    });
  }

  const existing = cart.items.find((i) => i.variantId === variantId);
  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity, price },
    });
    return await getOrCreateCart(userId);
  }

  await prisma.cartItem.create({
    data: { cartId: cart.id, variantId, quantity, price },
  });
  return await getOrCreateCart(userId);
}

export async function updateItemQuantity(userId: string, itemId: string, quantity: number) {
  const cart = await prisma.cart.findFirst({
    where: { userId, status: "active" },
    include: { items: true },
  });
  if (!cart) throw new AppError("Cart not found", 404);
  const item = cart.items.find((i) => i.id === itemId);
  if (!item) throw new AppError("Cart item not found", 404);

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
  } else {
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }
  return await getOrCreateCart(userId);
}

export async function removeItem(userId: string, itemId: string) {
  const cart = await prisma.cart.findFirst({
    where: { userId, status: "active" },
    include: { items: true },
  });
  if (!cart) throw new AppError("Cart not found", 404);
  const item = cart.items.find((i) => i.id === itemId);
  if (!item) throw new AppError("Cart item not found", 404);
  await prisma.cartItem.delete({ where: { id: itemId } });
  return await getOrCreateCart(userId);
}

export async function checkout(
  userId: string,
  data: {
    shopId: string;
    shippingAddress: {
      name: string;
      phone: string;
      addressLine1: string;
      addressLine2?: string;
      city: string;
      state?: string;
      country: string;
      postalCode?: string;
    };
    couponCode?: string;
  }
) {
  const cart = await prisma.cart.findFirst({
    where: { userId, status: "active" },
    include: {
      items: {
        include: { variant: { include: { product: { select: { name: true } } } } },
      },
    },
  });
  if (!cart || cart.items.length === 0) throw new AppError("Cart is empty", 400);

  const shop = await prisma.shop.findUnique({ where: { id: data.shopId } });
  if (!shop) throw new AppError("Shop not found", 404);

  let subtotal = 0;
  for (const item of cart.items) {
    subtotal += item.price * item.quantity;
  }
  let discountTotal = 0;
  let couponId: string | undefined;
  if (data.couponCode) {
    const coupon = await prisma.coupon.findFirst({
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

  const order = await prisma.$transaction(async (tx) => {
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

    return newOrder;
  });

  const fullOrder = await prisma.order.findUnique({
    where: { id: order.id },
    include: { items: true, address: true },
  });
  return fullOrder;
}
