"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductViews = getProductViews;
exports.getSearchLogs = getSearchLogs;
exports.getSalesReport = getSalesReport;
exports.getOrdersReport = getOrdersReport;
const prisma_1 = require("../lib/prisma");
async function getProductViews(filters) {
    const where = {};
    if (filters.productId)
        where.productId = filters.productId;
    if (filters.startDate || filters.endDate) {
        where.createdAt = {};
        if (filters.startDate)
            where.createdAt.gte = filters.startDate;
        if (filters.endDate)
            where.createdAt.lte = filters.endDate;
    }
    const views = await prisma_1.prisma.productView.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: filters.limit ?? 100,
        include: { product: { select: { name: true, slug: true } } },
    });
    const byProduct = views.reduce((acc, v) => {
        const id = v.productId;
        if (!acc[id])
            acc[id] = { count: 0, product: v.product };
        acc[id].count++;
        return acc;
    }, {});
    return { views, byProduct: Object.values(byProduct) };
}
async function getSearchLogs(filters) {
    const where = {};
    if (filters.startDate || filters.endDate) {
        where.createdAt = {};
        if (filters.startDate)
            where.createdAt.gte = filters.startDate;
        if (filters.endDate)
            where.createdAt.lte = filters.endDate;
    }
    const logs = await prisma_1.prisma.searchLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: filters.limit ?? 100,
    });
    const byQuery = logs.reduce((acc, l) => {
        acc[l.query] = (acc[l.query] || 0) + 1;
        return acc;
    }, {});
    return { logs, byQuery };
}
async function getSalesReport(filters) {
    const where = {};
    if (filters.shopId)
        where.shopId = filters.shopId;
    if (filters.status)
        where.status = filters.status;
    if (filters.startDate || filters.endDate) {
        where.createdAt = {};
        if (filters.startDate)
            where.createdAt.gte = filters.startDate;
        if (filters.endDate)
            where.createdAt.lte = filters.endDate;
    }
    const orders = await prisma_1.prisma.order.findMany({
        where,
        include: { items: true },
    });
    const totalRevenue = orders.reduce((s, o) => s + o.grandTotal, 0);
    const totalOrders = orders.length;
    return { orders, totalRevenue, totalOrders };
}
async function getOrdersReport(filters) {
    const where = {};
    if (filters.shopId)
        where.shopId = filters.shopId;
    if (filters.status)
        where.status = filters.status;
    if (filters.startDate || filters.endDate) {
        where.createdAt = {};
        if (filters.startDate)
            where.createdAt.gte = filters.startDate;
        if (filters.endDate)
            where.createdAt.lte = filters.endDate;
    }
    const page = filters.page ?? 1;
    const pageSize = Math.min(filters.pageSize ?? 20, 100);
    const skip = (page - 1) * pageSize;
    const [orders, total] = await Promise.all([
        prisma_1.prisma.order.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
            include: { user: { select: { email: true, firstName: true, lastName: true } }, items: true },
        }),
        prisma_1.prisma.order.count({ where }),
    ]);
    return {
        data: orders,
        pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    };
}
//# sourceMappingURL=analytics.service.js.map