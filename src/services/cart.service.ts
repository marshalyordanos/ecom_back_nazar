import axios from "axios";
import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { createNotification } from "./notification.service";
import { createId } from '@paralleldrive/cuid2'
import config from "../config/config";
import { sendSms } from "../utils/sendSms";
import { formatPhoneTo251 } from "../utils/helper";

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
  const orderCount = await prisma.order.count({
    where: {
      createdAt: {
        gte: new Date(`${new Date().getFullYear()}-01-01`),
        lt: new Date(`${new Date().getFullYear() + 1}-01-01`),
      },
    },
  });
  const orderNumber = generateOrderNumber(orderCount + 1);
let ord:any;
let checkout_url:any;

 const orderData = await prisma.$transaction(async (tx) => {
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

    const phone = formatPhoneTo251(data.shippingAddress.phone || "");
    const txRef = `${Date.now()}-order-${newOrder.id}`;
    console.log('=====================txRef:',{
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

      // console.log('000000000000000000000005:', chapaResponse);
      const chapaRes: any = chapaResponse.data;
      if (chapaRes?.status !== 'success') {
        throw new AppError('Chapa initialization failed', 500);
      }
      
     
      const fullOrder = await tx.order.findUnique({
        where: { id: newOrder.id },
        include: { items: true, address: true },
      });
      if (!fullOrder) throw new AppError("Order not found", 404);
    
      // Notify the customer so their in-app notifications are user-specific.
      await createNotification({
        userId,
        type: "order_created",
        title: "Order placed",
        message: `Order ${fullOrder.orderNumber} has been placed successfully.`,
        metadata: { orderId: fullOrder.id },
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
        } catch (err: any) {
      // await tx.abort();
      // console.error('Chapa error:', err.response?.data || err.message);
      throw new AppError('Failed to initialize Chapa payment', 500);
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

return {order: ord, checkout_url: checkout_url};
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

      await createNotification({
        userId: payment.order.userId,
        type: "order_paid",
        title: "Order placed",
        message: `Order ${payment.order.orderNumber} has been paid successfully.`,
        metadata: { orderId: payment.order.id },
      });

      await sendSms(
        `Your order ${payment.order.orderNumber} has been paid successfully.`,
        payment.order.address?.phone || '',
      );

    }

    return payment;
  });
}
