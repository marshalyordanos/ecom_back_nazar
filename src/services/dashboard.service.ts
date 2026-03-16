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
