import { prisma } from "../lib/prisma";

export async function getProductViews(filters: { productId?: string; startDate?: Date; endDate?: Date; limit?: number }) {
  const where: Record<string, unknown> = {};
  if (filters.productId) (where as any).productId = filters.productId;
  if (filters.startDate || filters.endDate) {
    (where as any).createdAt = {};
    if (filters.startDate) (where as any).createdAt.gte = filters.startDate;
    if (filters.endDate) (where as any).createdAt.lte = filters.endDate;
  }
  const views = await prisma.productView.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: filters.limit ?? 100,
    include: { product: { select: { name: true, slug: true } } },
  });
  const byProduct = views.reduce((acc: Record<string, { count: number; product: any }>, v) => {
    const id = v.productId;
    if (!acc[id]) acc[id] = { count: 0, product: v.product };
    acc[id].count++;
    return acc;
  }, {});
  return { views, byProduct: Object.values(byProduct) };
}

export async function getSearchLogs(filters: { startDate?: Date; endDate?: Date; limit?: number }) {
  const where: Record<string, unknown> = {};
  if (filters.startDate || filters.endDate) {
    (where as any).createdAt = {};
    if (filters.startDate) (where as any).createdAt.gte = filters.startDate;
    if (filters.endDate) (where as any).createdAt.lte = filters.endDate;
  }
  const logs = await prisma.searchLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: filters.limit ?? 100,
  });
  const byQuery = logs.reduce((acc: Record<string, number>, l) => {
    acc[l.query] = (acc[l.query] || 0) + 1;
    return acc;
  }, {});
  return { logs, byQuery };
}

export async function getSalesReport(filters: {
  shopId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}) {
  const where: Record<string, unknown> = {};
  if (filters.shopId) (where as any).shopId = filters.shopId;
  if (filters.status) (where as any).status = filters.status;
  if (filters.startDate || filters.endDate) {
    (where as any).createdAt = {};
    if (filters.startDate) (where as any).createdAt.gte = filters.startDate;
    if (filters.endDate) (where as any).createdAt.lte = filters.endDate;
  }
  const orders = await prisma.order.findMany({
    where,
    include: { items: true },
  });
  const totalRevenue = orders.reduce((s, o) => s + o.grandTotal, 0);
  const totalOrders = orders.length;
  return { orders, totalRevenue, totalOrders };
}

export async function getOrdersReport(filters: {
  shopId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  page?: number;
  pageSize?: number;
}) {
  const where: Record<string, unknown> = {};
  if (filters.shopId) (where as any).shopId = filters.shopId;
  if (filters.status) (where as any).status = filters.status;
  if (filters.startDate || filters.endDate) {
    (where as any).createdAt = {};
    if (filters.startDate) (where as any).createdAt.gte = filters.startDate;
    if (filters.endDate) (where as any).createdAt.lte = filters.endDate;
  }
  const page = filters.page ?? 1;
  const pageSize = Math.min(filters.pageSize ?? 20, 100);
  const skip = (page - 1) * pageSize;
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      include: { user: { select: { email: true, firstName: true, lastName: true } }, items: true },
    }),
    prisma.order.count({ where }),
  ]);
  return {
    data: orders,
    pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
  };
}
