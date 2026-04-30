import axios from "axios";
import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import {
  createNotification,
  notifyAllAdminsOrderEvent,
  notifyAllAdminsPaymentEvent,
} from "./notification.service";
import { createId } from '@paralleldrive/cuid2'
import config from "../config/config";
import { notifyOrderPlacedSms } from "./sms.service";
import { sendSms } from "../utils/sendSms";
import { finalizeShippingAddressForOrder } from "../utils/helper";

const generateOrderNumber = (counter: number) => {
const year = new Date().getFullYear();
  const paddedCounter = String(counter).padStart(7, '0');
  return `ORD-${year}-${paddedCounter}`;
}

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
  
  console.log("variant.price", variant.price, "price", price);
  if(variant.price !== price) {
    throw new AppError("Price mismatch", 400);
  }
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
  const item = cart.items.find((i) =>  i.id === itemId);
  if (!item) throw new AppError("Cart item not found", 404);
  await prisma.cartItem.delete({ where: { id: itemId } });
  return await getOrCreateCart(userId);
}

export async function checkout(
  userId: string,
  data: {
    shopId: string;
    paymentMethod?: "chapa" | "pickup";
    /** Required when paymentMethod is pickup — must be a ShopLocation belonging to shopId */
    pickupLocationId?: string;
    shippingAddress: {
      name: string;
      phone: string;
      addressLine1: string;
      addressLine2?: string;
      city?: string;
      state?: string;
      country?: string;
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
  let shippingAddress = finalizeShippingAddressForOrder(data.shippingAddress);
  if (paymentMethod === "pickup" && pickupLocationIdResolved) {
    const pl = await prisma.shopLocation.findUnique({
      where: { id: pickupLocationIdResolved },
      select: { name: true, city: true, country: true },
    });
    if (pl) {
      shippingAddress = {
        ...shippingAddress,
        addressLine1: `Pickup — ${pl.name}`,
        city: shippingAddress.city || pl.city,
        country: shippingAddress.country || pl.country,
      };
    }
  }
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
  const orderCount = await prisma.order.count({
    where: {
      createdAt: {
        gte: new Date(`${new Date().getFullYear()}-01-01`),
        lt: new Date(`${new Date().getFullYear() + 1}-01-01`),
      },
    },
  });
  const orderNumber = generateOrderNumber(orderCount + 1);
  let ord: any;
  let checkout_url: string | null = null;

 await prisma.$transaction(async (tx) => {
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
        ...(pickupLocationIdResolved
          ? { pickupLocationId: pickupLocationIdResolved }
          : {}),
        address: {
          create: shippingAddress,
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
      const phone = shippingAddress.phone;
      const txRef = `${Date.now()}-order-${newOrder.id}`;
      const chapaData = {
        amount: grandTotal,
        currency: "ETB",
        tx_ref: txRef,
        callback_url: `${process.env.BACKEND_URL || ""}/cart/chapa-callback`,
        return_url: `${process.env.FRONTEND_URL || ""}/orders/${newOrder.id}?paid=1`,
        phone_number: phone,
      };

      try {
        const chapaResponse = await axios.post(
          'https://api.chapa.co/v1/transaction/initialize',
          chapaData,
          {
            headers: {
              Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const chapaRes: any = chapaResponse.data;
        if (chapaRes?.status !== 'success') {
          throw new AppError('Chapa initialization failed', 500);
        }

        checkout_url = chapaRes.data.checkout_url || null;
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
      } catch (_err: any) {
        throw new AppError('Failed to initialize Chapa payment', 500);
      }
    }

    const fullOrder = await tx.order.findUnique({
      where: { id: newOrder.id },
      include: {
        items: true,
        address: true,
        pickupLocation: { select: { id: true, name: true, addressLine1: true, city: true } },
      },
    });
    if (!fullOrder) throw new AppError("Order not found", 404);

    await createNotification({
      userId,
      type: "order_created",
      title: "Order placed",
      message: `Order ${fullOrder.orderNumber} has been placed successfully.`,
      metadata: { orderId: fullOrder.id },
    });
    await notifyAllAdminsOrderEvent({
      title: "New order placed",
      message: `Order ${fullOrder.orderNumber} has been placed successfully.`,
      metadata: { orderId: fullOrder.id, eventKind: "order_created" },
    });
    ord = fullOrder;

  });

  void notifyOrderPlacedSms(shippingAddress.phone, orderNumber, shop.name);

return {order: ord, checkout_url};
}


export async function handleChapaCallback(data: any) {
  if (!data || (!data.trx_ref && !data.tx_ref) || !data.status) {
    throw new AppError('Invalid Chapa payload', 400);
  }

  const refFromCallback = String(data.trx_ref || data.tx_ref);
  let verifiedStatus = data.status;

  try {
    const verifyResponse = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${refFromCallback}`,
      {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (verifyResponse.data?.status === 'success') {
      verifiedStatus = verifyResponse.data?.data?.status ?? data.status;
    }
  } catch (error) {
    console.warn('⚠️ Chapa verification failed, fallback to callback data');
  }

  const finalPaymentStatus = verifiedStatus === 'success' ? 'PAID' : 'FAILED';

  // Update existing payment row created during checkout
  return await prisma.$transaction(async (tx) => {
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
        status: finalPaymentStatus as any,
        providerTransactionId: refFromCallback,
      },
    });

    if (updatedPayment.count === 0) {
      throw new AppError('Payment not found for callback reference', 404);
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
      throw new AppError('Payment not found after callback update', 404);
    }

    if (finalPaymentStatus === 'PAID') {
      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: 'PAID' },
      });
      await tx.cartItem.deleteMany({
        where: {
          cart: {
            userId: payment.order.userId,
            status: "active",
          },
        },
      });

      await createNotification({
        userId: payment.order.userId,
        type: "order_paid",
        title: "Order placed",
        message: `Order ${payment.order.orderNumber} has been paid successfully.`,
        metadata: { orderId: payment.order.id },
      });
      await notifyAllAdminsPaymentEvent({
        title: "Payment received",
        message: `Order ${payment.order.orderNumber} has been paid successfully.`,
        metadata: { orderId: payment.order.id, eventKind: "payment_received" },
      });

      await sendSms(
        `Your order ${payment.order.orderNumber} payment is confirmed. Thank you!`,
        payment.order.address?.phone || '',
      );

    }

    return payment;
  });
}
