import { prisma } from "../lib/prisma";

export async function getOverview(shopId: string) {
  const [totalOrders, totalRevenue, ordersByStatus, lowInventoryCount] = await Promise.all([
    prisma.order.count({ where: { shopId } }),
    prisma.order.aggregate({
      where: { shopId, status: { in: ["PAID", "PROCESSING", "SHIPPED", "COMPLETED"] } },
      _sum: { grandTotal: true },
    }),
    prisma.order.groupBy({
      by: ["status"],
      where: { shopId },
      _count: { id: true },
    }),
    (async () => {
      const invs = await prisma.inventory.findMany({
        where: { variant: { product: { shopId } }, reorderLevel: { not: null } },
        select: { quantity: true, reorderLevel: true },
      });
      return invs.filter((i) => i.reorderLevel != null && i.quantity <= i.reorderLevel).length;
    })(),
  ]);

  const topProducts = await prisma.orderItem.groupBy({
    by: ["variantId"],
    where: { order: { shopId } },
    _sum: { total: true },
    _count: { id: true },
    orderBy: { _sum: { total: "desc" } },
    take: 5,
  });

  const variantIds = topProducts.map((p) => p.variantId);
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: variantIds } },
    include: { product: { select: { name: true, slug: true } } },
  });
  const topProductsWithNames = topProducts.map((p) => {
    const v = variants.find((x) => x.id === p.variantId);
    return {
      variantId: p.variantId,
      totalRevenue: p._sum.total,
      orderCount: p._count.id,
      productName: v?.product?.name,
    };
  });

  return {
    totalOrders,
    totalRevenue: totalRevenue._sum.grandTotal ?? 0,
    ordersByStatus: ordersByStatus.reduce((acc, s) => ({ ...acc, [s.status]: s._count.id }), {}),
    lowInventoryAlerts: lowInventoryCount,
    topProducts: topProductsWithNames,
  };
}

export async function getSalesSummary(shopId: string, groupBy: "day" | "week" | "month") {
  const orders = await prisma.order.findMany({
    where: { shopId },
    select: { grandTotal: true, createdAt: true },
  });
  const buckets: Record<string, number> = {};
  for (const o of orders) {
    const d = new Date(o.createdAt);
    let key: string;
    if (groupBy === "day") key = d.toISOString().slice(0, 10);
    else if (groupBy === "week") key = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`;
    else key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    buckets[key] = (buckets[key] || 0) + o.grandTotal;
  }
  return buckets;
}

export async function getOrdersSummary(shopId: string) {
  const byStatus = await prisma.order.groupBy({
    by: ["status"],
    where: { shopId },
    _count: { id: true },
  });
  return byStatus.reduce((acc, s) => ({ ...acc, [s.status]: s._count.id }), {} as Record<string, number>);
}

export async function getTopProducts(shopId: string, limit = 10) {
  const items = await prisma.orderItem.groupBy({
    by: ["variantId"],
    where: { order: { shopId } },
    _sum: { total: true },
    _count: { id: true },
    orderBy: { _sum: { total: "desc" } },
    take: limit,
  });
  const variantIds = items.map((i) => i.variantId);
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: variantIds } },
    include: { product: { select: { name: true, slug: true } } },
  });
  return items.map((p) => {
    const v = variants.find((x) => x.id === p.variantId);
    return {
      variantId: p.variantId,
      revenue: p._sum.total,
      orderCount: p._count.id,
      productName: v?.product?.name,
    };
  });
}

export async function getLowInventory(shopId: string) {
  const inventories = await prisma.inventory.findMany({
    where: {
      variant: { product: { shopId } },
    },
    include: {
      variant: { include: { product: { select: { name: true, slug: true } } } },
      location: true,
    },
  });
  return inventories.filter((inv) => inv.reorderLevel != null && inv.quantity <= inv.reorderLevel);
}

export async function getNewCustomers(shopId: string, days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const count = await prisma.order.findMany({
    where: { shopId, createdAt: { gte: since } },
    distinct: ["userId"],
    select: { userId: true },
  });
  return count.length;
}

export async function getRecentOrders(shopId: string, limit = 10) {
  return prisma.order.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { user: { select: { email: true, firstName: true, lastName: true } }, items: true },
  });
}

export async function getRecentActivities(_shopId: string, limit = 20) {
  const [recentOrders, recentMovements] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, orderNumber: true, status: true, createdAt: true },
    }),
    prisma.inventoryMovement.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { variant: { include: { product: { select: { name: true } } } } },
    }),
  ]);
  const activities = [
    ...recentOrders.map((o) => ({ type: "order", data: o })),
    ...recentMovements.map((m) => ({ type: "inventory", data: m })),
  ]
    .sort((a, b) => new Date(b.data.createdAt).getTime() - new Date(a.data.createdAt).getTime())
    .slice(0, limit);
  return activities;
}

// ===============================
// Helper utilities (local to this service)
// ===============================
function getSinceDate(days: number) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  return since;
}

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function getWeekKey(d: Date) {
  // Simple week key; sufficient for admin dashboards.
  return `${d.getFullYear()}-W${Math.ceil((d.getDate() + 1) / 7)}`;
}

function bucketKey(d: Date, groupBy: "day" | "week" | "month") {
  if (groupBy === "day") return toISODate(d);
  if (groupBy === "week") return getWeekKey(d);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function safeNumber(n: number | null | undefined) {
  return n ?? 0;
}

// ===============================
// 📊 GLOBAL SUMMARY (MAIN API)
// ===============================
export async function getDashboardSummary(shopId: string) {
  const [ordersCount, revenueAgg, productsCount, userIds] = await Promise.all([
    prisma.order.count({ where: { shopId } }),
    prisma.order.aggregate({
      where: { shopId, status: { in: ["PAID", "PROCESSING", "SHIPPED", "COMPLETED"] } },
      _sum: { grandTotal: true },
    }),
    prisma.product.count({ where: { shopId } }),
    prisma.order.findMany({
      where: { shopId },
      distinct: ["userId"],
      select: { userId: true },
    }),
  ]);

  const lowInventoryCount = (await getLowStockCount(shopId)).count;
  const usersCount = userIds.length;
  const revenue = safeNumber(revenueAgg._sum.grandTotal);

  return {
    revenue,
    users: usersCount,
    orders: ordersCount,
    products: productsCount,
    alerts: lowInventoryCount,
  };
}

// ===============================
// 👤 USER SUMMARY
// ===============================
export async function getUserSummary(shopId: string, days = 30) {
  const firstOrderByUser = await prisma.order.groupBy({
    by: ["userId"],
    where: { shopId },
    _min: { createdAt: true },
  });

  const totalUsers = firstOrderByUser.length;
  const since = getSinceDate(days);
  const newUsers = firstOrderByUser.filter((u) => u._min.createdAt && u._min.createdAt >= since).length;

  const userIds = firstOrderByUser.map((u) => u.userId);
  const statuses = userIds.length
    ? await prisma.user.groupBy({
        by: ["status"],
        where: { id: { in: userIds } },
        _count: { id: true },
      })
    : [];

  const statusCounts = statuses.reduce<Record<string, number>>((acc, s) => {
    acc[String(s.status)] = s._count.id;
    return acc;
  }, {});

  return {
    totalUsers,
    newUsers,
    active: statusCounts.ACTIVE ?? 0,
    inactive: statusCounts.INACTIVE ?? 0,
    suspended: statusCounts.SUSPENDED ?? 0,
  };
}

export async function getUserVerificationStats(shopId: string) {
  const userIds = await prisma.order.findMany({
    where: { shopId },
    distinct: ["userId"],
    select: { userId: true },
  });
  const ids = userIds.map((u) => u.userId);
  const totalUsers = ids.length;

  if (!ids.length) {
    return {
      totalUsers: 0,
      emailVerified: 0,
      emailNotVerified: 0,
      phoneVerified: 0,
      phoneNotVerified: 0,
    };
  }

  const [emailVerified, phoneVerified] = await Promise.all([
    prisma.user.count({ where: { id: { in: ids }, emailVerifiedAt: { not: null } } }),
    prisma.user.count({ where: { id: { in: ids }, phoneVerifiedAt: { not: null } } }),
  ]);

  return {
    totalUsers,
    emailVerified,
    emailNotVerified: totalUsers - emailVerified,
    phoneVerified,
    phoneNotVerified: totalUsers - phoneVerified,
  };
}

// ===============================
// 📦 ORDER SUMMARY
// ===============================
export async function getOrderSummaryExtended(shopId: string) {
  const byStatus = await prisma.order.groupBy({
    by: ["status"],
    where: { shopId },
    _count: { id: true },
  });

  const map = byStatus.reduce<Record<string, number>>((acc, s) => {
    acc[String(s.status)] = s._count.id;
    return acc;
  }, {});

  const totalOrders = Object.values(map).reduce((a, b) => a + b, 0);
  return {
    totalOrders,
    pending: map.PENDING ?? 0,
    completed: map.COMPLETED ?? 0,
    cancelled: map.CANCELLED ?? 0,
    refunded: map.REFUNDED ?? 0,
    byStatus: map,
  };
}

export async function getOrderRevenueSummary(shopId: string) {
  const agg = await prisma.order.aggregate({
    where: { shopId },
    _sum: { subtotal: true, taxTotal: true, discountTotal: true, grandTotal: true },
  });
  return {
    subtotal: safeNumber(agg._sum.subtotal),
    taxTotal: safeNumber(agg._sum.taxTotal),
    discountTotal: safeNumber(agg._sum.discountTotal),
    grandTotal: safeNumber(agg._sum.grandTotal),
  };
}

export async function getDailyOrdersSummary(shopId: string, days = 30) {
  const since = getSinceDate(days);
  const orders = await prisma.order.findMany({
    where: { shopId, createdAt: { gte: since } },
    select: { createdAt: true },
  });

  const buckets: Record<string, number> = {};
  for (const o of orders) {
    const key = toISODate(o.createdAt);
    buckets[key] = (buckets[key] || 0) + 1;
  }

  return {
    days,
    series: Object.entries(buckets)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count })),
  };
}

// ===============================
// 💳 PAYMENT SUMMARY
// ===============================
export async function getPaymentSummary(shopId: string) {
  const byStatus = await prisma.payment.groupBy({
    by: ["status"],
    where: { order: { shopId } },
    _count: { id: true },
  });

  const map = byStatus.reduce<Record<string, number>>((acc, s) => {
    acc[String(s.status)] = s._count.id;
    return acc;
  }, {});

  const totalPayments = Object.values(map).reduce((a, b) => a + b, 0);
  return {
    totalPayments,
    pending: map.PENDING ?? 0,
    paid: map.PAID ?? 0,
    failed: map.FAILED ?? 0,
    refunded: map.REFUNDED ?? 0,
    byStatus: map,
  };
}

export async function getPaymentMethodStats(shopId: string) {
  const grouped = await prisma.payment.groupBy({
    by: ["provider"],
    where: { order: { shopId } },
    _count: { id: true },
    _sum: { amount: true },
  });

  return grouped
    .map((g) => ({
      provider: g.provider,
      count: g._count.id,
      totalAmount: safeNumber(g._sum.amount),
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
}

export async function getDailyPayments(shopId: string, days = 30) {
  const since = getSinceDate(days);
  const payments = await prisma.payment.findMany({
    where: { order: { shopId }, createdAt: { gte: since } },
    select: { createdAt: true, amount: true },
  });

  const buckets: Record<string, { count: number; amount: number }> = {};
  for (const p of payments) {
    const key = toISODate(p.createdAt);
    if (!buckets[key]) buckets[key] = { count: 0, amount: 0 };
    buckets[key].count += 1;
    buckets[key].amount += p.amount;
  }

  return {
    days,
    series: Object.entries(buckets)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, v]) => ({ date, count: v.count, amount: v.amount })),
  };
}

// ===============================
// 🛍 PRODUCT SUMMARY
// ===============================
export async function getProductSummary(shopId: string) {
  const byStatus = await prisma.product.groupBy({
    by: ["status"],
    where: { shopId },
    _count: { id: true },
  });

  const map = byStatus.reduce<Record<string, number>>((acc, s) => {
    acc[String(s.status)] = s._count.id;
    return acc;
  }, {});

  const totalProducts = await prisma.product.count({ where: { shopId } });
  return {
    totalProducts,
    byStatus: map,
    active: map.ACTIVE ?? 0,
    draft: map.DRAFT ?? 0,
    archived: map.ARCHIVED ?? 0,
  };
}

export async function getVariantSummary(shopId: string) {
  const totalVariants = await prisma.productVariant.count({ where: { product: { shopId } } });
  const activeVariants = await prisma.productVariant.count({
    where: { product: { shopId }, status: "ACTIVE" },
  });

  const agg = await prisma.productVariant.aggregate({
    where: { product: { shopId } },
    _avg: { price: true, comparePrice: true, costPrice: true, weight: true },
    _min: { price: true },
    _max: { price: true },
    _sum: { price: true },
  });

  return {
    totalVariants,
    activeVariants,
    pricing: {
      minPrice: safeNumber(agg._min.price),
      maxPrice: safeNumber(agg._max.price),
      avgPrice: safeNumber(agg._avg.price),
      avgComparePrice: safeNumber(agg._avg.comparePrice),
      avgCostPrice: safeNumber(agg._avg.costPrice),
      avgWeight: safeNumber(agg._avg.weight),
    },
  };
}

// ===============================
// 📦 INVENTORY SUMMARY
// ===============================
export async function getInventorySummary(shopId: string) {
  const sums = await prisma.inventory.aggregate({
    where: { variant: { product: { shopId } } },
    _sum: { quantity: true, reservedQuantity: true },
  });

  const total = safeNumber(sums._sum.quantity);
  const reserved = safeNumber(sums._sum.reservedQuantity);
  const available = total - reserved;

  return { totalStock: total, reserved, available };
}

export async function getLowStockCount(shopId: string) {
  // reorderLevel is nullable; low stock => reorderLevel != null AND quantity <= reorderLevel.
  const items = await prisma.inventory.findMany({
    where: { variant: { product: { shopId } }, reorderLevel: { not: null } },
    select: { quantity: true, reorderLevel: true },
  });
  return { count: items.filter((i) => (i.reorderLevel ?? Infinity) >= i.quantity).length };
}

export async function getOutOfStock(shopId: string) {
  const count = await prisma.inventory.count({
    where: { variant: { product: { shopId } }, quantity: 0 },
  });
  return { count };
}

// ===============================
// 🏪 SHOP SUMMARY
// ===============================
export async function getShopSummary() {
  const [totalShops, activeShops, locationsCount] = await Promise.all([
    prisma.shop.count(),
    prisma.shop.count({ where: { status: { in: ["ACTIVE", "active"] } } }),
    prisma.shopLocation.count(),
  ]);

  return { totalShops, activeShops, locationsCount };
}

export async function getLocationSummary() {
  const locations = await prisma.shopLocation.findMany({
    select: { city: true, country: true },
  });

  const map = new Map<string, number>();
  for (const l of locations) {
    const key = `${l.city ?? "Unknown"}|${l.country ?? "Unknown"}`;
    map.set(key, (map.get(key) || 0) + 1);
  }

  return Array.from(map.entries())
    .map(([key, count]) => {
      const [city, country] = key.split("|");
      return { city, country, count };
    })
    .sort((a, b) => b.count - a.count);
}

// ===============================
// 🎟 COUPON SUMMARY
// ===============================
export async function getCouponSummary(shopId: string) {
  const couponUsage = await prisma.couponUsage.findMany({
    where: { order: { shopId } },
    distinct: ["couponId"],
    select: { couponId: true },
  });
  const couponIds = couponUsage.map((c) => c.couponId);
  const totalCoupons = couponIds.length;

  const now = new Date();
  const [activeCount, expiredCount, usageCount] = await Promise.all([
    prisma.coupon.count({
      where: { id: { in: couponIds }, OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] },
    }),
    prisma.coupon.count({
      where: { id: { in: couponIds }, expiresAt: { not: null, lte: now } },
    }),
    prisma.couponUsage.count({ where: { order: { shopId } } }),
  ]);

  return {
    totalCoupons,
    activeCoupons: activeCount,
    expiredCoupons: expiredCount,
    usageCount,
  };
}

export async function getCouponUsageSummary(shopId: string) {
  const totalUsage = await prisma.couponUsage.count({ where: { order: { shopId } } });
  const grouped = await prisma.couponUsage.groupBy({
    by: ["userId"],
    where: { order: { shopId } },
    _count: { id: true },
  });

  return {
    totalUsage,
    byUser: grouped
      .map((g) => ({ userId: g.userId, count: g._count.id }))
      .sort((a, b) => b.count - a.count),
  };
}

// ===============================
// ⭐ REVIEW SUMMARY
// ===============================
export async function getReviewSummary(shopId: string) {
  const [totalReviews, byStatus, avg] = await Promise.all([
    prisma.review.count({ where: { product: { shopId } } }),
    prisma.review.groupBy({
      by: ["status"],
      where: { product: { shopId } },
      _count: { id: true },
    }),
    prisma.review.aggregate({ where: { product: { shopId } }, _avg: { rating: true } }),
  ]);

  const map = byStatus.reduce<Record<string, number>>((acc, s) => {
    acc[String(s.status)] = s._count.id;
    return acc;
  }, {});

  return {
    totalReviews,
    approved: map.APPROVED ?? 0,
    pending: map.PENDING ?? 0,
    rejected: map.REJECTED ?? 0,
    avgRating: safeNumber(avg._avg.rating),
    byStatus: map,
  };
}

// ===============================
// 🔔 NOTIFICATION SUMMARY
// ===============================
export async function getNotificationSummary(shopId: string) {
  const userIds = await prisma.order.findMany({
    where: { shopId },
    distinct: ["userId"],
    select: { userId: true },
  });
  const ids = userIds.map((u) => u.userId);

  if (!ids.length) return { totalNotifications: 0, readCount: 0, unreadCount: 0 };

  const [total, unread] = await Promise.all([
    prisma.notification.count({ where: { userId: { in: ids } } }),
    prisma.notification.count({ where: { userId: { in: ids }, readAt: null } }),
  ]);

  return { totalNotifications: total, unreadCount: unread, readCount: total - unread };
}

// ===============================
// 🔍 SEARCH SUMMARY
// ===============================
export async function getSearchSummary(shopId: string, days = 30) {
  const since = getSinceDate(days);

  const [totalSearches, distinctQueries, failed] = await Promise.all([
    prisma.searchLog.count({ where: { createdAt: { gte: since } } }),
    prisma.searchLog.findMany({
      where: { createdAt: { gte: since } },
      distinct: ["query"],
      select: { query: true },
    }),
    (async () => {
      const byQuery = await prisma.searchLog.groupBy({
        by: ["query"],
        where: { createdAt: { gte: since }, query: { not: "" } },
        _count: { id: true },
      });

      let failedSearches = 0;
      for (const q of byQuery) {
        const query = (q.query ?? "").trim();
        if (!query) continue;
        const exists = await prisma.product.findFirst({
          where: {
            shopId,
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { slug: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              { shortDescription: { contains: query, mode: "insensitive" } },
            ],
          },
          select: { id: true },
        });
        if (!exists) failedSearches += q._count.id;
      }
      return failedSearches;
    })(),
  ]);

  return {
    days,
    totalSearches,
    uniqueQueries: distinctQueries.length,
    failedSearches: failed,
  };
}

// ===============================
// 💰 SALES ANALYTICS
// ===============================
export async function getSalesTrends(shopId: string, groupBy: "day" | "week" | "month", days = 30) {
  const since = getSinceDate(days);
  const orders = await prisma.order.findMany({
    where: { shopId, createdAt: { gte: since } },
    select: { createdAt: true, grandTotal: true },
  });

  const buckets: Record<string, number> = {};
  for (const o of orders) {
    const key = bucketKey(o.createdAt, groupBy);
    buckets[key] = (buckets[key] || 0) + o.grandTotal;
  }

  return {
    groupBy,
    days,
    series: Object.entries(buckets)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([period, revenue]) => ({ period, revenue })),
  };
}

export async function getSalesByChannel(shopId: string, days = 30) {
  const since = getSinceDate(days);
  // No explicit "source/channel" exists in the current schema; use payment provider as the closest proxy.
  const grouped = await prisma.payment.groupBy({
    by: ["provider"],
    where: { order: { shopId }, createdAt: { gte: since } },
    _count: { id: true },
    _sum: { amount: true },
  });

  return grouped
    .map((g) => ({
      channel: g.provider || "unknown",
      count: g._count.id,
      revenue: safeNumber(g._sum.amount),
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

export async function getSalesForecast(shopId: string, historyDays = 30, forecastDays = 7) {
  const since = getSinceDate(historyDays);
  const orders = await prisma.order.findMany({
    where: { shopId, createdAt: { gte: since } },
    select: { createdAt: true, grandTotal: true },
  });

  const buckets: Record<string, number> = {};
  for (const o of orders) {
    const key = toISODate(o.createdAt);
    buckets[key] = (buckets[key] || 0) + o.grandTotal;
  }

  const historyTotal = Object.values(buckets).reduce((a, b) => a + b, 0);
  const avgPerDay = historyDays > 0 ? historyTotal / historyDays : 0;

  const start = new Date();
  const series: Array<{ date: string; revenue: number }> = [];
  for (let i = 1; i <= forecastDays; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    series.push({ date: toISODate(d), revenue: avgPerDay });
  }

  const forecastTotal = avgPerDay * forecastDays;
  return {
    historyDays,
    forecastDays,
    historyTotal,
    avgPerDay,
    forecastTotal,
    series,
  };
}

export async function getRefundStats(shopId: string, days = 90) {
  const since = getSinceDate(days);
  const [count, agg] = await Promise.all([
    prisma.payment.count({ where: { order: { shopId }, status: "REFUNDED", createdAt: { gte: since } } }),
    prisma.payment.aggregate({
      where: { order: { shopId }, status: "REFUNDED", createdAt: { gte: since } },
      _sum: { amount: true },
    }),
  ]);

  return {
    days,
    refundedCount: count,
    refundedAmount: safeNumber(agg._sum.amount),
  };
}

// ===============================
// 📦 ORDER ANALYTICS
// ===============================
export async function getOrderStatusStats(shopId: string, days = 30) {
  const since = getSinceDate(days);
  const grouped = await prisma.order.groupBy({
    by: ["status"],
    where: { shopId, createdAt: { gte: since } },
    _count: { id: true },
  });

  const byStatus = grouped.reduce<Record<string, number>>((acc, g) => {
    acc[String(g.status)] = g._count.id;
    return acc;
  }, {});

  return { days, byStatus };
}

export async function getOrderFulfillmentStats(shopId: string, days = 30) {
  const since = getSinceDate(days);
  const grouped = await prisma.shipment.groupBy({
    by: ["status"],
    where: { order: { shopId }, createdAt: { gte: since } },
    _count: { id: true },
  });

  const map = grouped.reduce<Record<string, number>>((acc, g) => {
    acc[String(g.status)] = g._count.id;
    return acc;
  }, {});

  return {
    days,
    pending: map.PENDING ?? 0,
    shipped: map.SHIPPED ?? 0,
    delivered: map.DELIVERED ?? 0,
    byStatus: map,
  };
}

export async function getOrderValueStats(shopId: string, days = 90) {
  const since = getSinceDate(days);
  const orders = await prisma.order.findMany({
    where: { shopId, createdAt: { gte: since }, status: { not: "CANCELLED" } },
    select: { grandTotal: true },
  });

  const totals = orders.map((o) => o.grandTotal).filter((n) => Number.isFinite(n));
  totals.sort((a, b) => a - b);
  if (!totals.length) {
    return { days, buckets: { low: { count: 0, revenue: 0 }, medium: { count: 0, revenue: 0 }, high: { count: 0, revenue: 0 } } };
  }

  const p33Index = Math.floor(totals.length * 0.33);
  const p66Index = Math.floor(totals.length * 0.66);
  const lowMax = totals[p33Index] ?? totals[0];
  const highMin = totals[p66Index] ?? totals[tmaxIndex(totals.length - 1)];

  function tmaxIndex(i: number) {
    return i;
  }

  const buckets = {
    low: { count: 0, revenue: 0 },
    medium: { count: 0, revenue: 0 },
    high: { count: 0, revenue: 0 },
  };

  for (const t of totals) {
    if (t <= lowMax) {
      buckets.low.count += 1;
      buckets.low.revenue += t;
    } else if (t < highMin) {
      buckets.medium.count += 1;
      buckets.medium.revenue += t;
    } else {
      buckets.high.count += 1;
      buckets.high.revenue += t;
    }
  }

  return {
    days,
    thresholds: { lowMax, highMin },
    buckets,
  };
}

export async function getAbandonedOrders(shopId: string, minAgeDays = 1) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - minAgeDays);

  // Find active carts that are older than the cutoff.
  const carts = await prisma.cart.findMany({
    where: { status: "active", createdAt: { lte: cutoff } },
    include: { items: { select: { price: true, quantity: true } } },
  });

  const cartUserIds = Array.from(new Set(carts.map((c) => c.userId)));
  if (!cartUserIds.length) return { minAgeDays, abandonedCartCount: 0, abandonedUsersCount: 0, potentialRevenue: 0 };

  const orderUsers = await prisma.order.findMany({
    where: { shopId, userId: { in: cartUserIds } },
    distinct: ["userId"],
    select: { userId: true },
  });
  const orderedUserIdSet = new Set(orderUsers.map((o) => o.userId));

  const abandoned = carts.filter((c) => !orderedUserIdSet.has(c.userId));
  const potentialRevenue = abandoned.reduce((acc, c) => {
    const subtotal = c.items.reduce((s, i) => s + i.price * i.quantity, 0);
    return acc + subtotal;
  }, 0);

  return {
    minAgeDays,
    abandonedCartCount: abandoned.length,
    abandonedUsersCount: Array.from(new Set(abandoned.map((c) => c.userId))).length,
    potentialRevenue,
  };
}

// ===============================
// 🛍 PRODUCT ANALYTICS
// ===============================
export async function getProductPerformance(shopId: string, days = 90, limit = 10) {
  const since = getSinceDate(days);
  const byVariant = await prisma.orderItem.groupBy({
    by: ["variantId"],
    where: { order: { shopId, createdAt: { gte: since } } },
    _sum: { total: true },
    _count: { id: true },
    orderBy: { _sum: { total: "desc" } },
  });

  const variantIds = byVariant.map((v) => v.variantId);
  const variants = variantIds.length
    ? await prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
        select: {
          id: true,
          productId: true,
          product: { select: { id: true, name: true, slug: true } },
        },
      })
    : [];
  const variantToProduct = new Map(variants.map((v) => [v.id, v.product]));

  const totalsByProduct = new Map<
    string,
    { productId: string; productName: string | null; revenue: number; salesCount: number }
  >();
  for (const item of byVariant) {
    const p = variantToProduct.get(item.variantId);
    if (!p) continue;
    const cur =
      totalsByProduct.get(p.id) ?? {
        productId: p.id,
        productName: p.name ?? null,
        revenue: 0,
        salesCount: 0,
      };
    cur.revenue += safeNumber(item._sum.total);
    cur.salesCount += item._count.id;
    totalsByProduct.set(p.id, cur);
  }

  return Array.from(totalsByProduct.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}

export async function getProductConversion(shopId: string, days = 30, limit = 20) {
  const since = getSinceDate(days);

  const viewGrouped = await prisma.productView.groupBy({
    by: ["productId"],
    where: { product: { shopId }, createdAt: { gte: since } },
    _count: { id: true },
  });

  const viewsByProduct = new Map<string, number>(viewGrouped.map((g) => [g.productId, g._count.id]));
  const productIds = Array.from(viewsByProduct.keys()).slice(0, limit);

  const viewTop = productIds
    .map((productId) => ({ productId, views: viewsByProduct.get(productId) || 0 }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);

  if (!viewTop.length) {
    return { days, series: [] };
  }

  // Purchases come from orderItems. We aggregate by variantId then map variant -> product.
  const purchasedByVariant = await prisma.orderItem.groupBy({
    by: ["variantId"],
    where: { order: { shopId, createdAt: { gte: since } } },
    _count: { id: true },
  });
  const variantIds = purchasedByVariant.map((v) => v.variantId);
  const variantRows = variantIds.length
    ? await prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
        select: { id: true, productId: true },
      })
    : [];
  const variantToProduct = new Map(variantRows.map((v) => [v.id, v.productId]));

  const purchasesByProduct = new Map<string, number>();
  for (const p of purchasedByVariant) {
    const productId = variantToProduct.get(p.variantId);
    if (!productId) continue;
    purchasesByProduct.set(productId, (purchasesByProduct.get(productId) || 0) + p._count.id);
  }

  const products = await prisma.product.findMany({
    where: { id: { in: viewTop.map((v) => v.productId) } },
    select: { id: true, name: true, slug: true },
  });
  const productById = new Map(products.map((p) => [p.id, p]));

  const series = viewTop
    .map((v) => {
      const p = productById.get(v.productId);
      const purchases = purchasesByProduct.get(v.productId) || 0;
      return {
        productId: v.productId,
        productName: p?.name ?? null,
        views: v.views,
        purchases,
        conversionRate: v.views > 0 ? purchases / v.views : 0,
      };
    })
    .sort((a, b) => b.conversionRate - a.conversionRate);

  return { days, series };
}

export async function getCategoryStats(shopId: string, days = 90) {
  const since = getSinceDate(days);

  const byVariant = await prisma.orderItem.groupBy({
    by: ["variantId"],
    where: { order: { shopId, createdAt: { gte: since } } },
    _sum: { total: true },
    _count: { id: true },
  });

  const variantIds = byVariant.map((v) => v.variantId);
  const variants = variantIds.length
    ? await prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
        include: { product: { select: { categoryId: true, category: { select: { name: true } } } } },
      })
    : [];

  const map = new Map<
    string,
    { categoryId: string | null; categoryName: string; revenue: number; orderCount: number }
  >();

  for (const item of byVariant) {
    const v = variants.find((x) => x.id === item.variantId);
    if (!v) continue;
    const categoryId = v.product.categoryId ?? null;
    const categoryName = v.product.category?.name ?? "Uncategorized";
    const cur = map.get(String(categoryId ?? "none")) ?? {
      categoryId,
      categoryName,
      revenue: 0,
      orderCount: 0,
    };
    cur.revenue += safeNumber(item._sum.total);
    cur.orderCount += item._count.id;
    map.set(String(categoryId ?? "none"), cur);
  }

  return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue);
}

export async function getBrandStats(shopId: string, days = 90) {
  const since = getSinceDate(days);

  const byVariant = await prisma.orderItem.groupBy({
    by: ["variantId"],
    where: { order: { shopId, createdAt: { gte: since } } },
    _sum: { total: true },
    _count: { id: true },
  });

  const variantIds = byVariant.map((v) => v.variantId);
  const variants = variantIds.length
    ? await prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
        include: { product: { select: { brandId: true, brand: { select: { name: true } } } } },
      })
    : [];

  const map = new Map<string, { brandId: string | null; brandName: string; revenue: number; orderCount: number }>();

  for (const item of byVariant) {
    const v = variants.find((x) => x.id === item.variantId);
    if (!v) continue;
    const brandId = v.product.brandId ?? null;
    const brandName = v.product.brand?.name ?? "Unbranded";
    const key = String(brandId ?? "none");
    const cur = map.get(key) ?? { brandId, brandName, revenue: 0, orderCount: 0 };
    cur.revenue += safeNumber(item._sum.total);
    cur.orderCount += item._count.id;
    map.set(key, cur);
  }

  return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue);
}

// ===============================
// 👥 CUSTOMER ANALYTICS
// ===============================
export async function getCustomerGrowth(shopId: string, days = 30) {
  const since = getSinceDate(days);
  const userIds = await prisma.order.findMany({
    where: { shopId },
    distinct: ["userId"],
    select: { userId: true },
  });
  const ids = userIds.map((u) => u.userId);

  if (!ids.length) return { days, series: [] };

  const users = await prisma.user.findMany({
    where: { id: { in: ids }, createdAt: { gte: since } },
    select: { createdAt: true },
  });

  const buckets: Record<string, number> = {};
  for (const u of users) {
    const key = toISODate(u.createdAt);
    buckets[key] = (buckets[key] || 0) + 1;
  }

  return {
    days,
    series: Object.entries(buckets)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count })),
  };
}

export async function getCustomerRetention(shopId: string, days = 30) {
  const since = getSinceDate(days);

  const firstOrder = await prisma.order.groupBy({
    by: ["userId"],
    where: { shopId },
    _min: { createdAt: true },
  });

  const returningWindowUsers = await prisma.order.findMany({
    where: { shopId, createdAt: { gte: since } },
    distinct: ["userId"],
    select: { userId: true },
  });
  const windowSet = new Set(returningWindowUsers.map((u) => u.userId));

  let newUsers = 0;
  let returningUsers = 0;
  for (const u of firstOrder) {
    if (!u._min.createdAt) continue;
    const isNew = u._min.createdAt >= since;
    const isInWindow = windowSet.has(u.userId);
    if (isNew && isInWindow) newUsers += 1;
    else if (!isNew && isInWindow) returningUsers += 1;
  }

  return { days, newUsers, returningUsers, retentionRate: newUsers + returningUsers > 0 ? returningUsers / (newUsers + returningUsers) : 0 };
}

export async function getCustomerLTV(shopId: string, days = 90) {
  const since = getSinceDate(days);
  const grouped = await prisma.order.groupBy({
    by: ["userId"],
    where: { shopId, createdAt: { gte: since } },
    _sum: { grandTotal: true },
  });

  const customersCount = grouped.length;
  const totalRevenue = grouped.reduce((acc, g) => acc + safeNumber(g._sum.grandTotal), 0);
  const avgLTV = customersCount > 0 ? totalRevenue / customersCount : 0;

  return { days, customersCount, totalRevenue, avgLTV };
}

export async function getCustomerSegments(shopId: string, days = 90) {
  const since = getSinceDate(days);
  const grouped = await prisma.order.groupBy({
    by: ["userId"],
    where: { shopId, createdAt: { gte: since } },
    _sum: { grandTotal: true },
  });

  const spends = grouped.map((g) => safeNumber(g._sum.grandTotal)).filter((n) => Number.isFinite(n));
  spends.sort((a, b) => a - b);
  if (!spends.length) {
    return {
      days,
      segments: {
        low: { count: 0, revenue: 0 },
        medium: { count: 0, revenue: 0 },
        high: { count: 0, revenue: 0 },
      },
      thresholds: { lowMax: 0, highMin: 0 },
    };
  }

  const lowMax = spends[Math.floor(spends.length * 0.33)] ?? spends[0];
  const highMin = spends[Math.floor(spends.length * 0.66)] ?? spends[spends.length - 1];

  const segments = {
    low: { count: 0, revenue: 0 },
    medium: { count: 0, revenue: 0 },
    high: { count: 0, revenue: 0 },
  };

  for (const g of grouped) {
    const total = safeNumber(g._sum.grandTotal);
    if (total <= lowMax) {
      segments.low.count += 1;
      segments.low.revenue += total;
    } else if (total < highMin) {
      segments.medium.count += 1;
      segments.medium.revenue += total;
    } else {
      segments.high.count += 1;
      segments.high.revenue += total;
    }
  }

  return { days, thresholds: { lowMax, highMin }, segments };
}

// ===============================
// 📦 INVENTORY ANALYTICS
// ===============================
export async function getInventoryValuation(shopId: string) {
  const inventories = await prisma.inventory.findMany({
    where: { variant: { product: { shopId } } },
    select: {
      quantity: true,
      reservedQuantity: true,
      variant: { select: { price: true, costPrice: true } },
    },
  });

  let stockValuePrice = 0;
  let stockValueCost = 0;
  let reservedValuePrice = 0;

  for (const inv of inventories) {
    const qty = inv.quantity;
    const reserved = inv.reservedQuantity ?? 0;
    const available = qty - reserved;
    const unitPrice = inv.variant.price;
    const unitCost = safeNumber(inv.variant.costPrice);

    stockValuePrice += available * unitPrice;
    stockValueCost += available * unitCost;
    reservedValuePrice += reserved * unitPrice;
  }

  return { stockValuePrice, stockValueCost, reservedValuePrice };
}

export async function getInventoryTurnover(shopId: string, days = 30) {
  const since = getSinceDate(days);

  const sold = await prisma.inventoryMovement.aggregate({
    where: { variant: { product: { shopId } }, type: "SALE", createdAt: { gte: since } },
    _sum: { quantity: true },
  });

  const current = await prisma.inventory.aggregate({
    where: { variant: { product: { shopId } } },
    _sum: { quantity: true, reservedQuantity: true },
  });

  const soldQuantity = safeNumber(sold._sum.quantity);
  const total = safeNumber(current._sum.quantity);
  const reserved = safeNumber(current._sum.reservedQuantity);
  const available = total - reserved;

  const turnover = available > 0 ? soldQuantity / available : 0;
  return { days, soldQuantity, available, turnover };
}

export async function getInventoryAlerts(shopId: string, limit = 50) {
  const inventories = await prisma.inventory.findMany({
    where: { variant: { product: { shopId } }, reorderLevel: { not: null } },
    include: {
      location: true,
      variant: { include: { product: { select: { name: true, slug: true } } } },
    },
    take: limit * 5,
  });

  const filtered = inventories
    .filter((inv) => inv.reorderLevel != null && inv.quantity <= inv.reorderLevel)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, limit);

  return {
    count: filtered.length,
    items: filtered.map((inv) => ({
      inventoryId: inv.id,
      variantId: inv.variantId,
      productName: inv.variant.product?.name ?? null,
      sku: inv.variant.sku,
      location: inv.location ? { id: inv.location.id, name: inv.location.name, city: inv.location.city, country: inv.location.country } : null,
      quantity: inv.quantity,
      reservedQuantity: inv.reservedQuantity,
      available: inv.quantity - inv.reservedQuantity,
      reorderLevel: inv.reorderLevel,
    })),
  };
}

export async function getInventoryByLocation(shopId: string) {
  const inventories = await prisma.inventory.findMany({
    where: { variant: { product: { shopId } } },
    select: {
      locationId: true,
      quantity: true,
      reservedQuantity: true,
      location: { select: { id: true, name: true, city: true, country: true } },
    },
  });

  const map = new Map<
    string,
    { locationId: string; locationName: string | null; city: string | null; country: string | null; total: number; reserved: number; available: number }
  >();

  for (const inv of inventories) {
    const key = inv.locationId;
    const cur =
      map.get(key) ?? {
        locationId: inv.locationId,
        locationName: inv.location?.name ?? null,
        city: inv.location?.city ?? null,
        country: inv.location?.country ?? null,
        total: 0,
        reserved: 0,
        available: 0,
      };
    cur.total += inv.quantity;
    cur.reserved += inv.reservedQuantity ?? 0;
    cur.available += inv.quantity - (inv.reservedQuantity ?? 0);
    map.set(key, cur);
  }

  return { byLocation: Array.from(map.values()).sort((a, b) => b.available - a.available) };
}

// ===============================
// 🎟 COUPONS / PROMOTIONS
// ===============================
export async function getCouponPerformance(shopId: string, limit = 10) {
  const usages = await prisma.couponUsage.findMany({
    where: { order: { shopId }, orderId: { not: null } },
    include: {
      coupon: true,
      order: { select: { discountTotal: true } },
    },
  });

  const map = new Map<string, { couponId: string; code: string; discountTotal: number; usageCount: number }>();
  for (const u of usages) {
    if (!u.order) continue;
    const cur = map.get(u.couponId) ?? { couponId: u.couponId, code: u.coupon.code, discountTotal: 0, usageCount: 0 };
    cur.discountTotal += safeNumber(u.order.discountTotal);
    cur.usageCount += 1;
    map.set(u.couponId, cur);
  }

  return Array.from(map.values())
    .sort((a, b) => b.discountTotal - a.discountTotal)
    .slice(0, limit);
}

export async function getActiveCoupons(shopId: string, limit = 50) {
  const couponUsage = await prisma.couponUsage.findMany({
    where: { order: { shopId } },
    distinct: ["couponId"],
    select: { couponId: true },
  });
  const couponIds = couponUsage.map((c) => c.couponId);
  if (!couponIds.length) return [];

  const now = new Date();
  return prisma.coupon
    .findMany({
      where: {
        id: { in: couponIds },
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
      take: limit,
      orderBy: { usedCount: "desc" },
    })
    .then((rows) =>
      rows.map((c) => ({
        id: c.id,
        code: c.code,
        type: c.type,
        value: c.value,
        usageLimit: c.usageLimit,
        usedCount: c.usedCount,
        expiresAt: c.expiresAt,
      })),
    );
}

export async function getExpiredCoupons(shopId: string, limit = 50) {
  const couponUsage = await prisma.couponUsage.findMany({
    where: { order: { shopId } },
    distinct: ["couponId"],
    select: { couponId: true },
  });
  const couponIds = couponUsage.map((c) => c.couponId);
  if (!couponIds.length) return [];

  const now = new Date();
  return prisma.coupon
    .findMany({
      where: { id: { in: couponIds }, expiresAt: { not: null, lte: now } },
      take: limit,
      orderBy: { expiresAt: "desc" },
    })
    .then((rows) =>
      rows.map((c) => ({
        id: c.id,
        code: c.code,
        type: c.type,
        value: c.value,
        usageLimit: c.usageLimit,
        usedCount: c.usedCount,
        expiresAt: c.expiresAt,
      })),
    );
}

// ===============================
// ⭐ REVIEWS & RATINGS
// ===============================
export async function getRatingDistribution(shopId: string) {
  const grouped = await prisma.review.groupBy({
    by: ["rating"],
    where: { product: { shopId } },
    _count: { id: true },
  });

  const dist: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
  for (const g of grouped) {
    const r = String(g.rating);
    if (dist[r] != null) dist[r] = g._count.id;
  }
  const totalReviews = Object.values(dist).reduce((a, b) => a + b, 0);
  return { totalReviews, distribution: dist };
}

export async function getRecentReviews(shopId: string, limit = 10) {
  return prisma.review
    .findMany({
      where: { product: { shopId } },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
        product: { select: { id: true, name: true, slug: true } },
      },
    })
    .then((rows) =>
      rows.map((r) => ({
        id: r.id,
        productId: r.productId,
        productName: r.product?.name ?? null,
        userId: r.userId,
        user: r.user ? { id: r.user.id, email: r.user.email, name: `${r.user.firstName ?? ""} ${r.user.lastName ?? ""}`.trim() } : null,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        status: r.status,
        createdAt: r.createdAt,
      })),
    );
}

export async function getPendingReviews(shopId: string, limit = 20) {
  return prisma.review
    .findMany({
      where: { product: { shopId }, status: "PENDING" },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
        product: { select: { id: true, name: true, slug: true } },
      },
    })
    .then((rows) =>
      rows.map((r) => ({
        id: r.id,
        productId: r.productId,
        productName: r.product?.name ?? null,
        userId: r.userId,
        user: r.user ? { id: r.user.id, email: r.user.email, name: `${r.user.firstName ?? ""} ${r.user.lastName ?? ""}`.trim() } : null,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        status: r.status,
        createdAt: r.createdAt,
      })),
    );
}

// ===============================
// 🔔 ACTIVITY / SYSTEM LOGS
// ===============================
export async function getOrderActivities(shopId: string, limit = 30) {
  const [orders, shipments, payments] = await Promise.all([
    prisma.order.findMany({
      where: { shopId },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, orderNumber: true, status: true, createdAt: true },
    }),
    prisma.shipment.findMany({
      where: { order: { shopId } },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, orderId: true, status: true, trackingNumber: true, carrier: true, createdAt: true },
    }),
    prisma.payment.findMany({
      where: { order: { shopId } },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, orderId: true, status: true, provider: true, amount: true, createdAt: true },
    }),
  ]);

  const events = [
    ...orders.map((o) => ({ type: "order", createdAt: o.createdAt, data: o })),
    ...shipments.map((s) => ({ type: "shipment", createdAt: s.createdAt, data: s })),
    ...payments.map((p) => ({ type: "payment", createdAt: p.createdAt, data: p })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);

  return events;
}

export async function getUserActivities(shopId: string, days = 30, limit = 20) {
  const since = getSinceDate(days);
  const userIds = await prisma.order.findMany({
    where: { shopId },
    distinct: ["userId"],
    select: { userId: true },
  });
  const ids = userIds.map((u) => u.userId);

  if (!ids.length) return { registrations: [], recentOrders: [] };

  const [registrations, recentOrders] = await Promise.all([
    prisma.user.findMany({
      where: { id: { in: ids }, createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, email: true, firstName: true, lastName: true, createdAt: true },
    }),
    prisma.order.findMany({
      where: { shopId, createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: { id: true, orderNumber: true, status: true, userId: true, createdAt: true },
    }),
  ]);

  return {
    days,
    registrations: registrations.map((u) => ({
      id: u.id,
      email: u.email,
      name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim(),
      createdAt: u.createdAt,
    })),
    recentOrders,
  };
}

export async function getInventoryActivities(shopId: string, limit = 50) {
  return prisma.inventoryMovement
    .findMany({
      where: { variant: { product: { shopId } } },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        variant: { include: { product: { select: { name: true, slug: true } } } },
        location: { select: { id: true, name: true, city: true, country: true } },
      },
    })
    .then((rows) =>
      rows.map((m) => ({
        id: m.id,
        type: m.type,
        quantity: m.quantity,
        referenceId: m.referenceId,
        createdAt: m.createdAt,
        variantId: m.variantId,
        sku: m.variant.sku,
        productName: m.variant.product?.name ?? null,
        location: m.location,
      })),
    );
}

// ===============================
// 🔍 SEARCH & BEHAVIOR
// ===============================
export async function getTopSearchQueries(shopId: string, days = 30, limit = 10) {
  const since = getSinceDate(days);
  const grouped = await prisma.searchLog.groupBy({
    by: ["query"],
    where: { createdAt: { gte: since }, query: { not: "" } },
    _count: { id: true },
  });

  return grouped
    .map((g) => ({ query: g.query, count: g._count.id }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function getNoResultSearches(shopId: string, days = 30, limit = 10) {
  const since = getSinceDate(days);
  const byQuery = await prisma.searchLog.groupBy({
    by: ["query"],
    where: { createdAt: { gte: since }, query: { not: "" } },
    _count: { id: true },
  });

  const results: Array<{ query: string; count: number }> = [];
  let failedTotal = 0;

  for (const q of byQuery) {
    const query = (q.query ?? "").trim();
    if (!query) continue;

    const exists = await prisma.product.findFirst({
      where: {
        shopId,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { shortDescription: { contains: query, mode: "insensitive" } },
        ],
      },
      select: { id: true },
    });

    if (!exists) {
      failedTotal += q._count.id;
      results.push({ query, count: q._count.id });
    }
  }

  return {
    days,
    failedSearches: failedTotal,
    failedQueries: results.sort((a, b) => b.count - a.count).slice(0, limit),
  };
}

export async function getMostViewedProducts(shopId: string, limit = 10) {
  const grouped = await prisma.productView.groupBy({
    by: ["productId"],
    where: { product: { shopId } },
    _count: { id: true },
  });

  const productIds = grouped.map((g) => g.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true, slug: true },
  });
  const productById = new Map(products.map((p) => [p.id, p]));

  return grouped
    .map((g) => {
      const p = productById.get(g.productId);
      return { productId: g.productId, productName: p?.name ?? null, slug: p?.slug ?? null, views: g._count.id };
    })
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

// ===============================
// ⚙️ SYSTEM / SHOP HEALTH
// ===============================
export async function getSystemHealth(shopId?: string) {
  const days = 30;
  const since = getSinceDate(days);

  const [ordersByStatus, paymentsByStatus, lowStock] = await Promise.all([
    prisma.order.groupBy({
      by: ["status"],
      where: shopId ? { shopId, createdAt: { gte: since } } : { createdAt: { gte: since } },
      _count: { id: true },
    }),
    prisma.payment.groupBy({
      by: ["status"],
      where: shopId ? { order: { shopId }, createdAt: { gte: since } } : { createdAt: { gte: since } },
      _count: { id: true },
    }),
    shopId ? getLowStockCount(shopId).then((r) => r.count) : Promise.resolve(0),
  ]);

  const orders = ordersByStatus.reduce<Record<string, number>>((acc, g) => {
    acc[String(g.status)] = g._count.id;
    return acc;
  }, {});
  const payments = paymentsByStatus.reduce<Record<string, number>>((acc, g) => {
    acc[String(g.status)] = g._count.id;
    return acc;
  }, {});

  return {
    timestamp: new Date().toISOString(),
    shopId: shopId ?? null,
    ordersHealth: { days, byStatus: orders },
    paymentsHealth: { days, byStatus: payments },
    inventoryAlerts: { lowStockCount: lowStock },
  };
}

export async function getSyncStatus(shopId?: string, limit = 20) {
  const where = shopId ? { shopId } : undefined;
  const [byStatus, recent, total] = await Promise.all([
    prisma.syncLog.groupBy({
      by: ["status"],
      where: where as any,
      _count: { id: true },
    }),
    prisma.syncLog.findMany({
      where: where as any,
      orderBy: { startedAt: "desc" },
      take: limit,
    }),
    prisma.syncLog.count({ where: where as any }),
  ]);

  return {
    total,
    byStatus: byStatus.reduce<Record<string, number>>((acc, g) => {
      acc[String(g.status)] = g._count.id;
      return acc;
    }, {}),
    recent,
  };
}

export async function getUnreadNotifications(userId?: string) {
  const where = userId ? { userId } : {};
  const [unreadCount, grouped] = await Promise.all([
    prisma.notification.count({ where: { ...(where as any), readAt: null } as any }),
    prisma.notification.groupBy({
      by: ["type"],
      where: { ...(where as any), readAt: null } as any,
      _count: { id: true },
    }),
  ]);

  return {
    userId: userId ?? null,
    unreadCount,
    byType: grouped.map((g) => ({ type: g.type, count: g._count.id })).sort((a, b) => b.count - a.count),
  };
}
