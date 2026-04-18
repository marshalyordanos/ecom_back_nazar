"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalDashboardSummary = getGlobalDashboardSummary;
exports.getGlobalRevenueSeries = getGlobalRevenueSeries;
exports.getGlobalOrdersCountSeries = getGlobalOrdersCountSeries;
exports.getGlobalOrderStatusDistribution = getGlobalOrderStatusDistribution;
exports.getGlobalPaymentsSeries = getGlobalPaymentsSeries;
exports.getOverview = getOverview;
exports.getSalesSummary = getSalesSummary;
exports.getOrdersSummary = getOrdersSummary;
exports.getTopProducts = getTopProducts;
exports.getEcommerceHighlights = getEcommerceHighlights;
exports.getLowInventory = getLowInventory;
exports.getNewCustomers = getNewCustomers;
exports.getRecentOrders = getRecentOrders;
exports.getRecentActivities = getRecentActivities;
exports.getSummaryWithDetails = getSummaryWithDetails;
exports.getShopDashboardSummary = getShopDashboardSummary;
exports.getUserSummary = getUserSummary;
exports.getUserVerificationStats = getUserVerificationStats;
exports.getOrderSummaryExtended = getOrderSummaryExtended;
exports.getOrderRevenueSummary = getOrderRevenueSummary;
exports.getDailyOrdersSummary = getDailyOrdersSummary;
exports.getPaymentSummary = getPaymentSummary;
exports.getPaymentMethodStats = getPaymentMethodStats;
exports.getDailyPayments = getDailyPayments;
exports.getProductSummary = getProductSummary;
exports.getVariantSummary = getVariantSummary;
exports.getInventorySummary = getInventorySummary;
exports.getLowStockCount = getLowStockCount;
exports.getOutOfStock = getOutOfStock;
exports.getShopSummary = getShopSummary;
exports.getLocationSummary = getLocationSummary;
exports.getCouponSummary = getCouponSummary;
exports.getCouponUsageSummary = getCouponUsageSummary;
exports.getReviewSummary = getReviewSummary;
exports.getNotificationSummary = getNotificationSummary;
exports.getSearchSummary = getSearchSummary;
exports.getSalesTrends = getSalesTrends;
exports.getSalesByChannel = getSalesByChannel;
exports.getSalesForecast = getSalesForecast;
exports.getRefundStats = getRefundStats;
exports.getOrderStatusStats = getOrderStatusStats;
exports.getOrderFulfillmentStats = getOrderFulfillmentStats;
exports.getOrderValueStats = getOrderValueStats;
exports.getAbandonedOrders = getAbandonedOrders;
exports.getProductPerformance = getProductPerformance;
exports.getProductConversion = getProductConversion;
exports.getCategoryStats = getCategoryStats;
exports.getBrandStats = getBrandStats;
exports.getCustomerGrowth = getCustomerGrowth;
exports.getCustomerRetention = getCustomerRetention;
exports.getCustomerLTV = getCustomerLTV;
exports.getCustomerSegments = getCustomerSegments;
exports.getInventoryValuation = getInventoryValuation;
exports.getInventoryTurnover = getInventoryTurnover;
exports.getInventoryAlerts = getInventoryAlerts;
exports.getInventoryByLocation = getInventoryByLocation;
exports.getCouponPerformance = getCouponPerformance;
exports.getActiveCoupons = getActiveCoupons;
exports.getExpiredCoupons = getExpiredCoupons;
exports.getRatingDistribution = getRatingDistribution;
exports.getRecentReviews = getRecentReviews;
exports.getPendingReviews = getPendingReviews;
exports.getOrderActivities = getOrderActivities;
exports.getUserActivities = getUserActivities;
exports.getInventoryActivities = getInventoryActivities;
exports.getTopSearchQueries = getTopSearchQueries;
exports.getNoResultSearches = getNoResultSearches;
exports.getMostViewedProducts = getMostViewedProducts;
exports.getSystemHealth = getSystemHealth;
exports.getSyncStatus = getSyncStatus;
exports.getUnreadNotifications = getUnreadNotifications;
const prisma_1 = require("../lib/prisma");
function percentChangeGlobal(current, previous) {
    if (previous === 0)
        return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
}
/** Admin dashboard cards: global counts + week-over-week trend metrics */
async function getGlobalDashboardSummary() {
    const now = new Date();
    const currentWindowStart = new Date(now);
    currentWindowStart.setDate(currentWindowStart.getDate() - 7);
    const prevWindowStart = new Date(currentWindowStart);
    prevWindowStart.setDate(prevWindowStart.getDate() - 7);
    const [totalUsers, activeUsers, suspendedUsers, verifiedEmails, usersThisWeek, usersPrevWeek, inventoryAgg, lowStockRows, totalVariants, variantsThisWeek, variantsPrevWeek, totalOrders, completedOrders, pendingOrders, totalRevenueAgg, ordersThisWeek, ordersPrevWeek, revenueThisWeek, revenuePrevWeek, totalPayments, paidPayments, failedPayments, totalPaymentAmountAgg, paymentsThisWeek, paymentsPrevWeek, payAmountThisWeek, payAmountPrevWeek,] = await Promise.all([
        prisma_1.prisma.user.count(),
        prisma_1.prisma.user.count({ where: { status: "ACTIVE", } }),
        prisma_1.prisma.user.count({ where: { status: "SUSPENDED" } }),
        prisma_1.prisma.user.count({ where: { emailVerifiedAt: { not: null } } }),
        prisma_1.prisma.user.count({ where: { createdAt: { gte: currentWindowStart } } }),
        prisma_1.prisma.user.count({ where: { createdAt: { gte: prevWindowStart, lt: currentWindowStart } } }),
        prisma_1.prisma.inventory.aggregate({ _sum: { quantity: true, reservedQuantity: true } }),
        prisma_1.prisma.inventory.count({
            where: {
                reorderLevel: {
                    not: null, // optional, since it's nullable
                },
                quantity: {
                    lte: prisma_1.prisma.inventory.fields.reorderLevel,
                },
            },
        }),
        prisma_1.prisma.productVariant.count(),
        prisma_1.prisma.productVariant.count({ where: { createdAt: { gte: currentWindowStart } } }),
        prisma_1.prisma.productVariant.count({
            where: { createdAt: { gte: prevWindowStart, lt: currentWindowStart } },
        }),
        prisma_1.prisma.order.count(),
        prisma_1.prisma.order.count({ where: { status: "COMPLETED" } }),
        prisma_1.prisma.order.count({ where: { status: "PENDING" } }),
        prisma_1.prisma.order.aggregate({ _sum: { grandTotal: true } }),
        prisma_1.prisma.order.count({ where: { createdAt: { gte: currentWindowStart } } }),
        prisma_1.prisma.order.count({ where: { createdAt: { gte: prevWindowStart, lt: currentWindowStart } } }),
        prisma_1.prisma.order.aggregate({
            _sum: { grandTotal: true },
            where: { createdAt: { gte: currentWindowStart } },
        }),
        prisma_1.prisma.order.aggregate({
            _sum: { grandTotal: true },
            where: { createdAt: { gte: prevWindowStart, lt: currentWindowStart } },
        }),
        prisma_1.prisma.payment.count(),
        prisma_1.prisma.payment.count({ where: { status: "PAID" } }),
        prisma_1.prisma.payment.count({ where: { status: "FAILED" } }),
        prisma_1.prisma.payment.aggregate({ _sum: { amount: true } }),
        prisma_1.prisma.payment.count({ where: { createdAt: { gte: currentWindowStart } } }),
        prisma_1.prisma.payment.count({ where: { createdAt: { gte: prevWindowStart, lt: currentWindowStart } } }),
        prisma_1.prisma.payment.aggregate({
            _sum: { amount: true },
            where: { createdAt: { gte: currentWindowStart } },
        }),
        prisma_1.prisma.payment.aggregate({
            _sum: { amount: true },
            where: { createdAt: { gte: prevWindowStart, lt: currentWindowStart } },
        }),
    ]);
    const lowStockAlerts = lowStockRows;
    const invSum = inventoryAgg._sum;
    const totalRevenue = totalRevenueAgg._sum.grandTotal ?? 0;
    const rtThis = revenueThisWeek._sum.grandTotal ?? 0;
    const rtPrev = revenuePrevWeek._sum.grandTotal ?? 0;
    const totalPaymentAmount = totalPaymentAmountAgg._sum.amount ?? 0;
    const paThis = payAmountThisWeek._sum.amount ?? 0;
    const paPrev = payAmountPrevWeek._sum.amount ?? 0;
    return {
        users: {
            total: totalUsers,
            active: activeUsers,
            suspended: suspendedUsers,
            verifiedEmails,
            percentChange: percentChangeGlobal(usersThisWeek, usersPrevWeek),
        },
        inventory: {
            totalStock: invSum.quantity ?? 0,
            reservedQuantity: invSum.reservedQuantity ?? 0,
            lowStockAlerts,
            totalVariants,
            percentChange: percentChangeGlobal(variantsThisWeek, variantsPrevWeek),
        },
        orders: {
            totalOrders,
            completedOrders,
            pendingOrders,
            totalRevenue,
            percentChange: percentChangeGlobal(ordersThisWeek, ordersPrevWeek),
            revenueChange: percentChangeGlobal(rtThis, rtPrev),
        },
        payments: {
            totalPayments,
            paidPayments,
            failedPayments,
            totalPaymentAmount,
            percentChange: percentChangeGlobal(paymentsThisWeek, paymentsPrevWeek),
            amountChange: percentChangeGlobal(paThis, paPrev),
        },
    };
}
// ===============================
// Global admin (no shopId) — chart-friendly series
// ===============================
function fillDailyBucketsFromSince(since, buckets) {
    const categories = [];
    const data = [];
    const cursor = new Date(since);
    cursor.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(0, 0, 0, 0);
    while (cursor <= end) {
        const k = toISODate(cursor);
        categories.push(k);
        data.push(buckets[k] ?? 0);
        cursor.setDate(cursor.getDate() + 1);
    }
    return { categories, data };
}
async function getGlobalRevenueSeries(days) {
    const clamped = Math.min(Math.max(Number(days) || 30, 1), 90);
    const since = getSinceDate(clamped);
    const orders = await prisma_1.prisma.order.findMany({
        where: { createdAt: { gte: since } },
        select: { createdAt: true, grandTotal: true },
    });
    const buckets = {};
    for (const o of orders) {
        const key = toISODate(new Date(o.createdAt));
        buckets[key] = (buckets[key] || 0) + o.grandTotal;
    }
    const { categories, data } = fillDailyBucketsFromSince(since, buckets);
    return {
        days: clamped,
        categories,
        series: [{ name: "Revenue", data }],
        totalRevenue: data.reduce((a, b) => a + b, 0),
    };
}
async function getGlobalOrdersCountSeries(days) {
    const clamped = Math.min(Math.max(Number(days) || 30, 1), 90);
    const since = getSinceDate(clamped);
    const orders = await prisma_1.prisma.order.findMany({
        where: { createdAt: { gte: since } },
        select: { createdAt: true },
    });
    const buckets = {};
    for (const o of orders) {
        const key = toISODate(new Date(o.createdAt));
        buckets[key] = (buckets[key] || 0) + 1;
    }
    const { categories, data } = fillDailyBucketsFromSince(since, buckets);
    return {
        days: clamped,
        categories,
        series: [{ name: "Orders", data }],
        totalOrders: orders.length,
    };
}
async function getGlobalOrderStatusDistribution() {
    const grouped = await prisma_1.prisma.order.groupBy({
        by: ["status"],
        _count: { id: true },
    });
    return {
        labels: grouped.map((g) => String(g.status)),
        values: grouped.map((g) => g._count.id),
    };
}
async function getGlobalPaymentsSeries(days) {
    const clamped = Math.min(Math.max(Number(days) || 30, 1), 90);
    const since = getSinceDate(clamped);
    const payments = await prisma_1.prisma.payment.findMany({
        where: { createdAt: { gte: since }, status: "PAID" },
        select: { createdAt: true, amount: true },
    });
    const buckets = {};
    for (const p of payments) {
        const key = toISODate(new Date(p.createdAt));
        buckets[key] = (buckets[key] || 0) + p.amount;
    }
    const { categories, data } = fillDailyBucketsFromSince(since, buckets);
    return {
        days: clamped,
        categories,
        series: [{ name: "Payments", data }],
        totalAmount: data.reduce((a, b) => a + b, 0),
    };
}
async function getOverview(shopId) {
    const [totalOrders, totalRevenue, ordersByStatus, lowInventoryCount] = await Promise.all([
        prisma_1.prisma.order.count({ where: { shopId } }),
        prisma_1.prisma.order.aggregate({
            where: { shopId, status: { in: ["PAID", "PROCESSING", "SHIPPED", "COMPLETED"] } },
            _sum: { grandTotal: true },
        }),
        prisma_1.prisma.order.groupBy({
            by: ["status"],
            where: { shopId },
            _count: { id: true },
        }),
        (async () => {
            const invs = await prisma_1.prisma.inventory.findMany({
                where: { variant: { product: { shopId } }, reorderLevel: { not: null } },
                select: { quantity: true, reorderLevel: true },
            });
            return invs.filter((i) => i.reorderLevel != null && i.quantity <= i.reorderLevel).length;
        })(),
    ]);
    const topProducts = await prisma_1.prisma.orderItem.groupBy({
        by: ["variantId"],
        where: { order: { shopId, status: "COMPLETED" } },
        _sum: { total: true },
        _count: { id: true },
        orderBy: { _sum: { total: "desc" } },
        take: 5,
    });
    const variantIds = topProducts.map((p) => p.variantId);
    const variants = await prisma_1.prisma.productVariant.findMany({
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
async function getSalesSummary(shopId, groupBy) {
    const orders = await prisma_1.prisma.order.findMany({
        where: { shopId },
        select: { grandTotal: true, createdAt: true },
    });
    const buckets = {};
    for (const o of orders) {
        const d = new Date(o.createdAt);
        let key;
        if (groupBy === "day")
            key = d.toISOString().slice(0, 10);
        else if (groupBy === "week")
            key = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`;
        else
            key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        buckets[key] = (buckets[key] || 0) + o.grandTotal;
    }
    return buckets;
}
async function getOrdersSummary(shopId) {
    const byStatus = await prisma_1.prisma.order.groupBy({
        by: ["status"],
        where: { shopId },
        _count: { id: true },
    });
    return byStatus.reduce((acc, s) => ({ ...acc, [s.status]: s._count.id }), {});
}
async function getTopProducts(shopId, limit = 10) {
    const items = await prisma_1.prisma.orderItem.groupBy({
        by: ["variantId"],
        where: { order: { shopId } },
        _sum: { total: true },
        _count: { id: true },
        orderBy: { _sum: { total: "desc" } },
        take: limit,
    });
    const variantIds = items.map((i) => i.variantId);
    const variants = await prisma_1.prisma.productVariant.findMany({
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
async function getEcommerceHighlights(shopId, limit = 3) {
    const safeLimit = Math.min(Math.max(Number(limit) || 3, 1), 6);
    const now = new Date();
    const currentWindowStart = new Date(now);
    currentWindowStart.setDate(currentWindowStart.getDate() - 30);
    const previousWindowStart = new Date(currentWindowStart);
    previousWindowStart.setDate(previousWindowStart.getDate() - 30);
    const [totalVisits, totalOrders, visitsThisWindow, visitsPreviousWindow, ordersThisWindow, ordersPreviousWindow, topLevelCategories, soldVariants, productViewCounts,] = await Promise.all([
        prisma_1.prisma.productView.count({ where: { product: { shopId } } }),
        prisma_1.prisma.order.count({ where: { shopId } }),
        prisma_1.prisma.productView.count({
            where: { product: { shopId }, createdAt: { gte: currentWindowStart } },
        }),
        prisma_1.prisma.productView.count({
            where: {
                product: { shopId },
                createdAt: { gte: previousWindowStart, lt: currentWindowStart },
            },
        }),
        prisma_1.prisma.order.count({ where: { shopId, createdAt: { gte: currentWindowStart } } }),
        prisma_1.prisma.order.count({
            where: { shopId, createdAt: { gte: previousWindowStart, lt: currentWindowStart } },
        }),
        prisma_1.prisma.productCategory.findMany({
            where: { parentId: null },
            select: { id: true, name: true, track: true, image: true },
        }),
        prisma_1.prisma.orderItem.groupBy({
            by: ["variantId"],
            where: { order: { shopId } },
            _sum: { total: true },
            _count: { id: true },
        }),
        prisma_1.prisma.productView.groupBy({
            by: ["productId"],
            where: { product: { shopId } },
            _count: { id: true },
        }),
    ]);
    const variantIds = soldVariants.map((item) => item.variantId);
    const variants = variantIds.length
        ? await prisma_1.prisma.productVariant.findMany({
            where: { id: { in: variantIds } },
            select: {
                id: true,
                image: true,
                media: {
                    take: 1,
                    orderBy: { position: "asc" },
                    select: { url: true },
                },
                product: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        categoryId: true,
                        category: {
                            select: {
                                id: true,
                                name: true,
                                track: true,
                                parentId: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        })
        : [];
    const topLevelById = new Map(topLevelCategories.map((category) => [
        category.id,
        {
            id: category.id,
            name: category.name,
            track: category.track,
            image: category.image,
            revenue: 0,
            orderCount: 0,
        },
    ]));
    const variantById = new Map(variants.map((variant) => [variant.id, variant]));
    const productViewsById = new Map(productViewCounts.map((item) => [item.productId, item._count.id]));
    const categoryProducts = new Map();
    const categoryProductIds = new Map();
    for (const item of soldVariants) {
        const variant = variantById.get(item.variantId);
        if (!variant)
            continue;
        const categoryTrack = variant.product.category?.track ?? null;
        const rootCategoryId = categoryTrack?.split("/")[0] ?? variant.product.categoryId ?? null;
        if (!rootCategoryId)
            continue;
        const topLevelCategory = topLevelById.get(rootCategoryId);
        if (!topLevelCategory)
            continue;
        topLevelCategory.revenue += safeNumber(item._sum.total);
        topLevelCategory.orderCount += item._count.id;
        const productMap = categoryProducts.get(rootCategoryId) ?? new Map();
        const existingProduct = productMap.get(variant.product.id) ?? {
            productId: variant.product.id,
            productName: variant.product.name,
            productSlug: variant.product.slug,
            revenue: 0,
            orderCount: 0,
            views: productViewsById.get(variant.product.id) ?? 0,
            image: variant.image ?? variant.media[0]?.url ?? topLevelCategory.image ?? null,
        };
        existingProduct.revenue += safeNumber(item._sum.total);
        existingProduct.orderCount += item._count.id;
        productMap.set(variant.product.id, existingProduct);
        categoryProducts.set(rootCategoryId, productMap);
        const productIds = categoryProductIds.get(rootCategoryId) ?? new Set();
        productIds.add(variant.product.id);
        categoryProductIds.set(rootCategoryId, productIds);
    }
    const categoryHighlights = Array.from(topLevelById.values())
        .map((category) => {
        const topProduct = Array.from(categoryProducts.get(category.id)?.values() ?? []).sort((a, b) => {
            if (b.revenue !== a.revenue)
                return b.revenue - a.revenue;
            if (b.orderCount !== a.orderCount)
                return b.orderCount - a.orderCount;
            return b.views - a.views;
        })[0] ?? null;
        const totalViews = Array.from(categoryProductIds.get(category.id) ?? []).reduce((sum, productId) => sum + (productViewsById.get(productId) ?? 0), 0);
        return {
            categoryId: category.id,
            categoryName: category.name,
            track: category.track,
            image: category.image ?? topProduct?.image ?? null,
            revenue: category.revenue,
            orderCount: category.orderCount,
            totalViews,
            topProduct,
        };
    })
        .filter((category) => category.topProduct)
        .sort((a, b) => {
        if (b.revenue !== a.revenue)
            return b.revenue - a.revenue;
        if (b.orderCount !== a.orderCount)
            return b.orderCount - a.orderCount;
        return b.totalViews - a.totalViews;
    })
        .slice(0, safeLimit);
    return {
        visitsSummary: {
            totalVisits,
            totalOrders,
            conversionRate: totalVisits > 0 ? (totalOrders / totalVisits) * 100 : 0,
            visitsChangePct: percentChangeGlobal(visitsThisWindow, visitsPreviousWindow),
            ordersChangePct: percentChangeGlobal(ordersThisWindow, ordersPreviousWindow),
        },
        categoryHighlights,
    };
}
async function getLowInventory(shopId) {
    return prisma_1.prisma.inventory.findMany({
        where: {
            variant: { product: { shopId } },
            OR: [
                { quantity: { lte: 0 } },
                {
                    reorderLevel: { not: null },
                    quantity: { lte: prisma_1.prisma.inventory.fields.reorderLevel },
                },
            ],
        },
        orderBy: [{ quantity: "asc" }, { updatedAt: "asc" }],
        include: {
            variant: { include: { product: { select: { name: true, slug: true } } } },
            location: true,
        },
    });
}
async function getNewCustomers(shopId, days = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const count = await prisma_1.prisma.order.findMany({
        where: { shopId, createdAt: { gte: since } },
        distinct: ["userId"],
        select: { userId: true },
    });
    return count.length;
}
async function getRecentOrders(shopId, limit = 10) {
    return prisma_1.prisma.order.findMany({
        where: { shopId },
        orderBy: { createdAt: "desc" },
        take: limit,
        include: { user: { select: { email: true, firstName: true, lastName: true } }, items: true },
    });
}
async function getRecentActivities(_shopId, limit = 10) {
    const [recentOrders, recentMovements] = await Promise.all([
        prisma_1.prisma.order.findMany({
            orderBy: { createdAt: "desc" },
            take: limit,
            select: { id: true, orderNumber: true, status: true, createdAt: true },
        }),
        prisma_1.prisma.inventoryMovement.findMany({
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
function getSinceDate(days) {
    const since = new Date();
    since.setDate(since.getDate() - days);
    return since;
}
function toISODate(d) {
    return d.toISOString().slice(0, 10);
}
function getWeekKey(d) {
    // Simple week key; sufficient for admin dashboards.
    return `${d.getFullYear()}-W${Math.ceil((d.getDate() + 1) / 7)}`;
}
function bucketKey(d, groupBy) {
    if (groupBy === "day")
        return toISODate(d);
    if (groupBy === "week")
        return getWeekKey(d);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function safeNumber(n) {
    return n ?? 0;
}
// Returns summary details for the current month and growth compared to previous month:
// - New customers this month + percent growth
// - Orders this month + percent growth
// - Sales this month + percent growth
async function getSummaryWithDetails(shopId) {
    const now = new Date();
    // Current Month - first day & last day
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    // Previous Month - first day & last day
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    // New Customers (users with 'user' role) - created in this month and last month
    const [thisMonthNewCustomers, prevMonthNewCustomers] = await Promise.all([
        prisma_1.prisma.user.count({
            where: {
                roles: { some: { name: "user" } },
                createdAt: { gte: startOfMonth, lte: endOfMonth }
            }
        }),
        prisma_1.prisma.user.count({
            where: {
                roles: { some: { name: "user" } },
                createdAt: { gte: prevMonthStart, lte: prevMonthEnd }
            }
        }),
    ]);
    // Orders in current and previous month
    const [thisMonthOrders, prevMonthOrders] = await Promise.all([
        prisma_1.prisma.order.count({
            where: {
                shopId,
                createdAt: { gte: startOfMonth, lte: endOfMonth },
            },
        }),
        prisma_1.prisma.order.count({
            where: {
                shopId,
                createdAt: { gte: prevMonthStart, lte: prevMonthEnd },
            },
        }),
    ]);
    // Sales (payments, PAID or REFUNDED) in current and previous month
    const [thisMonthSalesAgg, prevMonthSalesAgg] = await Promise.all([
        prisma_1.prisma.payment.aggregate({
            where: {
                status: { in: ["PAID", "REFUNDED"] },
                createdAt: { gte: startOfMonth, lte: endOfMonth },
            },
            _sum: { amount: true },
        }),
        prisma_1.prisma.payment.aggregate({
            where: {
                status: { in: ["PAID", "REFUNDED"] },
                createdAt: { gte: prevMonthStart, lte: prevMonthEnd },
            },
            _sum: { amount: true },
        }),
    ]);
    const thisMonthSales = thisMonthSalesAgg._sum?.amount ?? 0;
    const prevMonthSales = prevMonthSalesAgg._sum?.amount ?? 0;
    // Helper for percent change (avoid division by zero and fallback to 100 or 0)
    function percentChange(current, prev) {
        if (prev === 0) {
            if (current === 0)
                return 0;
            return 100;
        }
        return ((current - prev) / Math.abs(prev)) * 100;
    }
    return {
        customers: {
            thisMonth: thisMonthNewCustomers,
            prevMonth: prevMonthNewCustomers,
            growth: percentChange(thisMonthNewCustomers, prevMonthNewCustomers),
        },
        orders: {
            thisMonth: thisMonthOrders,
            prevMonth: prevMonthOrders,
            growth: percentChange(thisMonthOrders, prevMonthOrders),
        },
        sales: {
            thisMonth: thisMonthSales,
            prevMonth: prevMonthSales,
            growth: percentChange(thisMonthSales, prevMonthSales),
        },
    };
}
// ===============================
// 📊 SHOP KPI SUMMARY (per shop, requires shopId)
// ===============================
async function getShopDashboardSummary(shopId) {
    const [ordersCount, revenueAgg, productsCount, userIds, customersCount, totalTransactions] = await Promise.all([
        prisma_1.prisma.order.count({ where: { shopId } }),
        prisma_1.prisma.payment.aggregate({
            where: { status: { in: ["PAID", "REFUNDED"] } },
            _sum: { amount: true },
        }),
        prisma_1.prisma.product.count({ where: { shopId } }),
        prisma_1.prisma.order.findMany({
            where: { shopId },
            distinct: ["userId"],
            select: { userId: true },
        }),
        prisma_1.prisma.user.count({ where: { roles: { some: { name: "user" } } } }),
        prisma_1.prisma.payment.count({ where: { status: "PAID" } }),
    ]);
    const lowInventoryCount = (await getLowStockCount(shopId)).count;
    const usersCount = userIds.length;
    console.log("revenueAgg", revenueAgg);
    const revenue = safeNumber(revenueAgg._sum?.amount ?? 0);
    return {
        totalTransactions,
        revenue,
        users: usersCount,
        orders: ordersCount,
        products: productsCount,
        alerts: lowInventoryCount,
        customers: customersCount,
    };
}
// ===============================
// 👤 USER SUMMARY
// ===============================
async function getUserSummary(shopId, days = 30) {
    const since = getSinceDate(days);
    // Only include users directly associated with this shop via location 
    // (users table, users might be staff or customers, depending on schema)
    // Total users: user.location.shopId == shopId
    const totalUsers = await prisma_1.prisma.user.count({});
    // New users in last X days: user.location.shopId == shopId AND createdAt >= since
    const newUsers = await prisma_1.prisma.user.count({
        where: { createdAt: { gte: since } }
    });
    // Active users: user.location.shopId == shopId AND status == ACTIVE
    const active = await prisma_1.prisma.user.count({
        where: { status: "ACTIVE" }
    });
    // Inactive users: 0 (as per your requirements)
    const inactive = await prisma_1.prisma.user.count({
        where: { status: "INACTIVE" }
    });
    // Suspended users: 0 (as per your requirements)
    const suspended = await prisma_1.prisma.user.count({
        where: { status: "SUSPENDED" }
    });
    return {
        totalUsers,
        newUsers,
        active,
        inactive,
        suspended
    };
}
async function getUserVerificationStats(shopId) {
    // Find all users whose location.shopId == shopId, using 'user' model as per schema.prisma
    // location is a relation, so we must filter where: { location: { shopId } }
    // We only use .count()
    const totalUsers = await prisma_1.prisma.user.count({});
    const emailVerified = await prisma_1.prisma.user.count({
        where: { emailVerifiedAt: { not: null } }
    });
    const phoneVerified = await prisma_1.prisma.user.count({
        where: { phoneVerifiedAt: { not: null } }
    });
    return {
        totalUsers,
        emailVerified,
        emailNotVerified: totalUsers - emailVerified,
        phoneVerified,
        phoneNotVerified: totalUsers - phoneVerified
    };
}
// ===============================
// 📦 ORDER SUMMARY
// ===============================
async function getOrderSummaryExtended(shopId) {
    const byStatus = await prisma_1.prisma.order.groupBy({
        by: ["status"],
        where: { shopId },
        _count: { id: true },
    });
    const map = byStatus.reduce((acc, s) => {
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
async function getOrderRevenueSummary(shopId) {
    const agg = await prisma_1.prisma.order.aggregate({
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
async function getDailyOrdersSummary(shopId, days = 30) {
    const since = getSinceDate(days);
    const orders = await prisma_1.prisma.order.findMany({
        where: { shopId, createdAt: { gte: since } },
        select: { createdAt: true },
    });
    const buckets = {};
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
async function getPaymentSummary(shopId) {
    const byStatus = await prisma_1.prisma.payment.groupBy({
        by: ["status"],
        where: { order: { shopId } },
        _count: { id: true },
    });
    const map = byStatus.reduce((acc, s) => {
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
async function getPaymentMethodStats(shopId) {
    const grouped = await prisma_1.prisma.payment.groupBy({
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
async function getDailyPayments(shopId, days = 30) {
    const since = getSinceDate(days);
    const payments = await prisma_1.prisma.payment.findMany({
        where: { order: { shopId }, createdAt: { gte: since } },
        select: { createdAt: true, amount: true },
    });
    const buckets = {};
    for (const p of payments) {
        const key = toISODate(p.createdAt);
        if (!buckets[key])
            buckets[key] = { count: 0, amount: 0 };
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
async function getProductSummary(shopId) {
    const byStatus = await prisma_1.prisma.product.groupBy({
        by: ["status"],
        where: { shopId },
        _count: { id: true },
    });
    const totalSearchLogs = await prisma_1.prisma.searchLog.count({});
    const totalViewCount = await prisma_1.prisma.productView.count({});
    const map = byStatus.reduce((acc, s) => {
        acc[String(s.status)] = s._count.id;
        return acc;
    }, {});
    const totalProducts = await prisma_1.prisma.product.count({ where: { shopId } });
    return {
        totalProducts,
        byStatus: map,
        active: map.ACTIVE ?? 0,
        draft: map.DRAFT ?? 0,
        archived: map.ARCHIVED ?? 0,
        totalSearchLogs,
        totalViewCount,
    };
}
async function getVariantSummary(shopId) {
    const totalVariants = await prisma_1.prisma.productVariant.count({ where: { product: { shopId } } });
    const activeVariants = await prisma_1.prisma.productVariant.count({
        where: { product: { shopId }, status: "ACTIVE" },
    });
    const agg = await prisma_1.prisma.productVariant.aggregate({
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
async function getInventorySummary(shopId) {
    const sums = await prisma_1.prisma.inventory.aggregate({
        where: { variant: { product: { shopId } } },
        _sum: { quantity: true, reservedQuantity: true },
    });
    const total = safeNumber(sums._sum.quantity);
    const reserved = safeNumber(sums._sum.reservedQuantity);
    const available = total - reserved;
    return { totalStock: total, reserved, available };
}
async function getLowStockCount(shopId) {
    // reorderLevel is nullable; low stock => reorderLevel != null AND quantity <= reorderLevel.
    const items = await prisma_1.prisma.inventory.findMany({
        where: { variant: { product: { shopId } }, reorderLevel: { not: null } },
        select: { quantity: true, reorderLevel: true },
    });
    return { count: items.filter((i) => (i.reorderLevel ?? Infinity) >= i.quantity).length };
}
async function getOutOfStock(shopId) {
    const count = await prisma_1.prisma.inventory.count({
        where: { variant: { product: { shopId } }, quantity: 0 },
    });
    return { count };
}
// ===============================
// 🏪 SHOP SUMMARY
// ===============================
async function getShopSummary() {
    const [totalShops, activeShops, locationsCount] = await Promise.all([
        prisma_1.prisma.shop.count(),
        prisma_1.prisma.shop.count({ where: { status: { in: ["ACTIVE", "active"] } } }),
        prisma_1.prisma.shopLocation.count(),
    ]);
    return { totalShops, activeShops, locationsCount };
}
async function getLocationSummary() {
    const locations = await prisma_1.prisma.shopLocation.findMany({
        select: { city: true, country: true },
    });
    const map = new Map();
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
async function getCouponSummary(shopId) {
    const couponUsage = await prisma_1.prisma.couponUsage.findMany({
        where: { order: { shopId } },
        distinct: ["couponId"],
        select: { couponId: true },
    });
    const couponIds = couponUsage.map((c) => c.couponId);
    const totalCoupons = couponIds.length;
    const now = new Date();
    const [activeCount, expiredCount, usageCount] = await Promise.all([
        prisma_1.prisma.coupon.count({
            where: { id: { in: couponIds }, OR: [{ expiresAt: null }, { expiresAt: { gt: now } }] },
        }),
        prisma_1.prisma.coupon.count({
            where: { id: { in: couponIds }, expiresAt: { not: null, lte: now } },
        }),
        prisma_1.prisma.couponUsage.count({ where: { order: { shopId } } }),
    ]);
    return {
        totalCoupons,
        activeCoupons: activeCount,
        expiredCoupons: expiredCount,
        usageCount,
    };
}
async function getCouponUsageSummary(shopId) {
    const totalUsage = await prisma_1.prisma.couponUsage.count({ where: { order: { shopId } } });
    const grouped = await prisma_1.prisma.couponUsage.groupBy({
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
async function getReviewSummary(shopId) {
    const [totalReviews, byStatus, avg] = await Promise.all([
        prisma_1.prisma.review.count({ where: { product: { shopId } } }),
        prisma_1.prisma.review.groupBy({
            by: ["status"],
            where: { product: { shopId } },
            _count: { id: true },
        }),
        prisma_1.prisma.review.aggregate({ where: { product: { shopId } }, _avg: { rating: true } }),
    ]);
    const map = byStatus.reduce((acc, s) => {
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
async function getNotificationSummary(shopId) {
    const userIds = await prisma_1.prisma.order.findMany({
        where: { shopId },
        distinct: ["userId"],
        select: { userId: true },
    });
    const ids = userIds.map((u) => u.userId);
    if (!ids.length)
        return { totalNotifications: 0, readCount: 0, unreadCount: 0 };
    const [total, unread] = await Promise.all([
        prisma_1.prisma.notification.count({ where: { userId: { in: ids } } }),
        prisma_1.prisma.notification.count({ where: { userId: { in: ids }, readAt: null } }),
    ]);
    return { totalNotifications: total, unreadCount: unread, readCount: total - unread };
}
// ===============================
// 🔍 SEARCH SUMMARY
// ===============================
async function getSearchSummary(shopId, days = 30) {
    const since = getSinceDate(days);
    const [totalSearches, distinctQueries] = await Promise.all([
        prisma_1.prisma.searchLog.count({ where: { createdAt: { gte: since } } }),
        prisma_1.prisma.searchLog.findMany({
            where: { createdAt: { gte: since } },
            distinct: ["query"],
            select: { query: true },
        }),
    ]);
    return {
        days,
        totalSearches,
        uniqueQueries: distinctQueries.length,
    };
}
// ===============================
// 💰 SALES ANALYTICS
// ===============================
async function getSalesTrends(shopId, groupBy, days = 30) {
    const since = getSinceDate(days);
    const orders = await prisma_1.prisma.payment.findMany({
        where: { status: "PAID", createdAt: { gte: since } },
        select: { createdAt: true, amount: true },
    });
    const buckets = {};
    for (const o of orders) {
        const key = bucketKey(o.createdAt, groupBy);
        buckets[key] = (buckets[key] || 0) + o.amount;
    }
    return {
        groupBy,
        days,
        series: Object.entries(buckets)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([period, revenue]) => ({ period, revenue })),
    };
}
async function getSalesByChannel(shopId, days = 30) {
    const since = getSinceDate(days);
    // No explicit "source/channel" exists in the current schema; use payment provider as the closest proxy.
    const grouped = await prisma_1.prisma.payment.groupBy({
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
async function getSalesForecast(shopId, historyDays = 30, forecastDays = 7) {
    const since = getSinceDate(historyDays);
    const orders = await prisma_1.prisma.payment.findMany({
        where: { createdAt: { gte: since } },
        select: { createdAt: true, amount: true },
    });
    const buckets = {};
    for (const o of orders) {
        const key = toISODate(o.createdAt);
        buckets[key] = (buckets[key] || 0) + o.amount;
    }
    const historyTotal = Object.values(buckets).reduce((a, b) => a + b, 0);
    const avgPerDay = historyDays > 0 ? historyTotal / historyDays : 0;
    const start = new Date();
    const series = [];
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
async function getRefundStats(shopId, days = 90) {
    const since = getSinceDate(days);
    const [count, agg] = await Promise.all([
        prisma_1.prisma.payment.count({ where: { order: { shopId }, status: "REFUNDED", createdAt: { gte: since } } }),
        prisma_1.prisma.payment.aggregate({
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
async function getOrderStatusStats(shopId, days = 30) {
    const since = getSinceDate(days);
    const grouped = await prisma_1.prisma.order.groupBy({
        by: ["status"],
        where: { shopId, createdAt: { gte: since } },
        _count: { id: true },
    });
    const byStatus = grouped.reduce((acc, g) => {
        acc[String(g.status)] = g._count.id;
        return acc;
    }, {});
    return { days, byStatus };
}
async function getOrderFulfillmentStats(shopId, days = 30) {
    const since = getSinceDate(days);
    const grouped = await prisma_1.prisma.shipment.groupBy({
        by: ["status"],
        where: { order: { shopId }, createdAt: { gte: since } },
        _count: { id: true },
    });
    const map = grouped.reduce((acc, g) => {
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
async function getOrderValueStats(shopId, days = 90) {
    const since = getSinceDate(days);
    const orders = await prisma_1.prisma.order.findMany({
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
    function tmaxIndex(i) {
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
        }
        else if (t < highMin) {
            buckets.medium.count += 1;
            buckets.medium.revenue += t;
        }
        else {
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
async function getAbandonedOrders(shopId, minAgeDays = 1) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - minAgeDays);
    // Find active carts that are older than the cutoff.
    const carts = await prisma_1.prisma.cart.findMany({
        where: { status: "active", createdAt: { lte: cutoff } },
        include: { items: { select: { price: true, quantity: true } } },
    });
    const cartUserIds = Array.from(new Set(carts.map((c) => c.userId)));
    if (!cartUserIds.length)
        return { minAgeDays, abandonedCartCount: 0, abandonedUsersCount: 0, potentialRevenue: 0 };
    const orderUsers = await prisma_1.prisma.order.findMany({
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
async function getProductPerformance(shopId, days = 90, limit = 10) {
    const since = getSinceDate(days);
    const byVariant = await prisma_1.prisma.orderItem.groupBy({
        by: ["variantId"],
        where: { order: { shopId, status: "COMPLETED", createdAt: { gte: since } } },
        _sum: { total: true },
        _count: { id: true },
        orderBy: { _sum: { total: "desc" } },
    });
    const variantIds = byVariant.map((v) => v.variantId);
    const variants = variantIds.length
        ? await prisma_1.prisma.productVariant.findMany({
            where: { id: { in: variantIds } },
            select: {
                id: true,
                productId: true,
                product: { select: { id: true, name: true, slug: true } },
            },
        })
        : [];
    const variantToProduct = new Map(variants.map((v) => [v.id, v.product]));
    const totalsByProduct = new Map();
    for (const item of byVariant) {
        const p = variantToProduct.get(item.variantId);
        if (!p)
            continue;
        const cur = totalsByProduct.get(p.id) ?? {
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
async function getProductConversion(shopId, days = 30, limit = 20) {
    const since = getSinceDate(days);
    const viewGrouped = await prisma_1.prisma.productView.groupBy({
        by: ["productId"],
        where: { product: { shopId }, createdAt: { gte: since } },
        _count: { id: true },
    });
    const viewsByProduct = new Map(viewGrouped.map((g) => [g.productId, g._count.id]));
    const productIds = Array.from(viewsByProduct.keys()).slice(0, limit);
    const viewTop = productIds
        .map((productId) => ({ productId, views: viewsByProduct.get(productId) || 0 }))
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
    if (!viewTop.length) {
        return { days, series: [] };
    }
    // Purchases come from orderItems. We aggregate by variantId then map variant -> product.
    const purchasedByVariant = await prisma_1.prisma.orderItem.groupBy({
        by: ["variantId"],
        where: { order: { shopId, createdAt: { gte: since } } },
        _count: { id: true },
    });
    const variantIds = purchasedByVariant.map((v) => v.variantId);
    const variantRows = variantIds.length
        ? await prisma_1.prisma.productVariant.findMany({
            where: { id: { in: variantIds } },
            select: { id: true, productId: true },
        })
        : [];
    const variantToProduct = new Map(variantRows.map((v) => [v.id, v.productId]));
    const purchasesByProduct = new Map();
    for (const p of purchasedByVariant) {
        const productId = variantToProduct.get(p.variantId);
        if (!productId)
            continue;
        purchasesByProduct.set(productId, (purchasesByProduct.get(productId) || 0) + p._count.id);
    }
    const products = await prisma_1.prisma.product.findMany({
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
async function getCategoryStats(shopId, days = 90) {
    const since = getSinceDate(days);
    const byVariant = await prisma_1.prisma.orderItem.groupBy({
        by: ["variantId"],
        where: { order: { shopId, createdAt: { gte: since } } },
        _sum: { total: true },
        _count: { id: true },
    });
    const variantIds = byVariant.map((v) => v.variantId);
    const variants = variantIds.length
        ? await prisma_1.prisma.productVariant.findMany({
            where: { id: { in: variantIds } },
            include: { product: { select: { categoryId: true, category: { select: { name: true } } } } },
        })
        : [];
    const map = new Map();
    for (const item of byVariant) {
        const v = variants.find((x) => x.id === item.variantId);
        if (!v)
            continue;
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
async function getBrandStats(shopId, days = 90) {
    const since = getSinceDate(days);
    const byVariant = await prisma_1.prisma.orderItem.groupBy({
        by: ["variantId"],
        where: { order: { shopId, createdAt: { gte: since } } },
        _sum: { total: true },
        _count: { id: true },
    });
    const variantIds = byVariant.map((v) => v.variantId);
    const variants = variantIds.length
        ? await prisma_1.prisma.productVariant.findMany({
            where: { id: { in: variantIds } },
            include: { product: { select: { brandId: true, brand: { select: { name: true } } } } },
        })
        : [];
    const map = new Map();
    for (const item of byVariant) {
        const v = variants.find((x) => x.id === item.variantId);
        if (!v)
            continue;
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
async function getCustomerGrowth(shopId, days = 30) {
    const since = getSinceDate(days);
    const userIds = await prisma_1.prisma.order.findMany({
        where: { shopId },
        distinct: ["userId"],
        select: { userId: true },
    });
    const ids = userIds.map((u) => u.userId);
    if (!ids.length)
        return { days, series: [] };
    const users = await prisma_1.prisma.user.findMany({
        where: { id: { in: ids }, createdAt: { gte: since } },
        select: { createdAt: true },
    });
    const buckets = {};
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
async function getCustomerRetention(shopId, days = 30) {
    const since = getSinceDate(days);
    const firstOrder = await prisma_1.prisma.order.groupBy({
        by: ["userId"],
        where: { shopId },
        _min: { createdAt: true },
    });
    const returningWindowUsers = await prisma_1.prisma.order.findMany({
        where: { shopId, createdAt: { gte: since } },
        distinct: ["userId"],
        select: { userId: true },
    });
    const windowSet = new Set(returningWindowUsers.map((u) => u.userId));
    let newUsers = 0;
    let returningUsers = 0;
    for (const u of firstOrder) {
        if (!u._min.createdAt)
            continue;
        const isNew = u._min.createdAt >= since;
        const isInWindow = windowSet.has(u.userId);
        if (isNew && isInWindow)
            newUsers += 1;
        else if (!isNew && isInWindow)
            returningUsers += 1;
    }
    return { days, newUsers, returningUsers, retentionRate: newUsers + returningUsers > 0 ? returningUsers / (newUsers + returningUsers) : 0 };
}
async function getCustomerLTV(shopId, days = 90) {
    const since = getSinceDate(days);
    const grouped = await prisma_1.prisma.order.groupBy({
        by: ["userId"],
        where: { shopId, status: "COMPLETED", createdAt: { gte: since } },
        _sum: { grandTotal: true },
    });
    const customersCount = grouped.length;
    const totalRevenue = grouped.reduce((acc, g) => acc + safeNumber(g._sum.grandTotal), 0);
    const avgLTV = customersCount > 0 ? totalRevenue / customersCount : 0;
    return { days, customersCount, totalRevenue, avgLTV };
}
async function getCustomerSegments(shopId, days = 90) {
    const since = getSinceDate(days);
    const grouped = await prisma_1.prisma.order.groupBy({
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
        }
        else if (total < highMin) {
            segments.medium.count += 1;
            segments.medium.revenue += total;
        }
        else {
            segments.high.count += 1;
            segments.high.revenue += total;
        }
    }
    return { days, thresholds: { lowMax, highMin }, segments };
}
// ===============================
// 📦 INVENTORY ANALYTICS
// ===============================
async function getInventoryValuation(shopId) {
    const inventories = await prisma_1.prisma.inventory.findMany({
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
async function getInventoryTurnover(shopId, days = 30) {
    const since = getSinceDate(days);
    const sold = await prisma_1.prisma.inventoryMovement.aggregate({
        where: { variant: { product: { shopId } }, type: "SALE", createdAt: { gte: since } },
        _sum: { quantity: true },
    });
    const current = await prisma_1.prisma.inventory.aggregate({
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
async function getInventoryAlerts(shopId, limit = 50) {
    const inventories = await prisma_1.prisma.inventory.findMany({
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
async function getInventoryByLocation(shopId) {
    const inventories = await prisma_1.prisma.inventory.findMany({
        where: { variant: { product: { shopId } } },
        select: {
            locationId: true,
            quantity: true,
            reservedQuantity: true,
            location: { select: { id: true, name: true, city: true, country: true } },
        },
    });
    const map = new Map();
    for (const inv of inventories) {
        const key = inv.locationId;
        const cur = map.get(key) ?? {
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
async function getCouponPerformance(shopId, limit = 10) {
    const usages = await prisma_1.prisma.couponUsage.findMany({
        where: { order: { shopId }, orderId: { not: null } },
        include: {
            coupon: true,
            order: { select: { discountTotal: true } },
        },
    });
    const map = new Map();
    for (const u of usages) {
        if (!u.order)
            continue;
        const cur = map.get(u.couponId) ?? { couponId: u.couponId, code: u.coupon.code, discountTotal: 0, usageCount: 0 };
        cur.discountTotal += safeNumber(u.order.discountTotal);
        cur.usageCount += 1;
        map.set(u.couponId, cur);
    }
    return Array.from(map.values())
        .sort((a, b) => b.discountTotal - a.discountTotal)
        .slice(0, limit);
}
async function getActiveCoupons(shopId, limit = 50) {
    const couponUsage = await prisma_1.prisma.couponUsage.findMany({
        where: { order: { shopId } },
        distinct: ["couponId"],
        select: { couponId: true },
    });
    const couponIds = couponUsage.map((c) => c.couponId);
    if (!couponIds.length)
        return [];
    const now = new Date();
    return prisma_1.prisma.coupon
        .findMany({
        where: {
            id: { in: couponIds },
            OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        },
        take: limit,
        orderBy: { usedCount: "desc" },
    })
        .then((rows) => rows.map((c) => ({
        id: c.id,
        code: c.code,
        type: c.type,
        value: c.value,
        usageLimit: c.usageLimit,
        usedCount: c.usedCount,
        expiresAt: c.expiresAt,
    })));
}
async function getExpiredCoupons(shopId, limit = 50) {
    const couponUsage = await prisma_1.prisma.couponUsage.findMany({
        where: { order: { shopId } },
        distinct: ["couponId"],
        select: { couponId: true },
    });
    const couponIds = couponUsage.map((c) => c.couponId);
    if (!couponIds.length)
        return [];
    const now = new Date();
    return prisma_1.prisma.coupon
        .findMany({
        where: { id: { in: couponIds }, expiresAt: { not: null, lte: now } },
        take: limit,
        orderBy: { expiresAt: "desc" },
    })
        .then((rows) => rows.map((c) => ({
        id: c.id,
        code: c.code,
        type: c.type,
        value: c.value,
        usageLimit: c.usageLimit,
        usedCount: c.usedCount,
        expiresAt: c.expiresAt,
    })));
}
// ===============================
// ⭐ REVIEWS & RATINGS
// ===============================
async function getRatingDistribution(shopId) {
    const grouped = await prisma_1.prisma.review.groupBy({
        by: ["rating"],
        where: { product: { shopId } },
        _count: { id: true },
    });
    const dist = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
    for (const g of grouped) {
        const r = String(g.rating);
        if (dist[r] != null)
            dist[r] = g._count.id;
    }
    const totalReviews = Object.values(dist).reduce((a, b) => a + b, 0);
    return { totalReviews, distribution: dist };
}
async function getRecentReviews(shopId, limit = 10) {
    return prisma_1.prisma.review
        .findMany({
        where: { product: { shopId } },
        orderBy: { createdAt: "desc" },
        take: limit,
        include: {
            user: { select: { id: true, email: true, firstName: true, lastName: true } },
            product: { select: { id: true, name: true, slug: true } },
        },
    })
        .then((rows) => rows.map((r) => ({
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
    })));
}
async function getPendingReviews(shopId, limit = 20) {
    return prisma_1.prisma.review
        .findMany({
        where: { product: { shopId }, status: "PENDING" },
        orderBy: { createdAt: "desc" },
        take: limit,
        include: {
            user: { select: { id: true, email: true, firstName: true, lastName: true } },
            product: { select: { id: true, name: true, slug: true } },
        },
    })
        .then((rows) => rows.map((r) => ({
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
    })));
}
// ===============================
// 🔔 ACTIVITY / SYSTEM LOGS
// ===============================
async function getOrderActivities(shopId, limit = 30) {
    const [orders, shipments, payments] = await Promise.all([
        prisma_1.prisma.order.findMany({
            where: { shopId },
            orderBy: { createdAt: "desc" },
            take: limit,
            select: { id: true, orderNumber: true, status: true, createdAt: true },
        }),
        prisma_1.prisma.shipment.findMany({
            where: { order: { shopId } },
            orderBy: { createdAt: "desc" },
            take: limit,
            select: { id: true, orderId: true, status: true, trackingNumber: true, carrier: true, createdAt: true },
        }),
        prisma_1.prisma.payment.findMany({
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
async function getUserActivities(shopId, days = 30, limit = 20) {
    const since = getSinceDate(days);
    const userIds = await prisma_1.prisma.order.findMany({
        where: { shopId },
        distinct: ["userId"],
        select: { userId: true },
    });
    const ids = userIds.map((u) => u.userId);
    if (!ids.length)
        return { registrations: [], recentOrders: [] };
    const [registrations, recentOrders] = await Promise.all([
        prisma_1.prisma.user.findMany({
            where: { id: { in: ids }, createdAt: { gte: since } },
            orderBy: { createdAt: "desc" },
            take: limit,
            select: { id: true, email: true, firstName: true, lastName: true, createdAt: true },
        }),
        prisma_1.prisma.order.findMany({
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
async function getInventoryActivities(shopId, limit = 50) {
    return prisma_1.prisma.inventoryMovement
        .findMany({
        where: { variant: { product: { shopId } } },
        orderBy: { createdAt: "desc" },
        take: limit,
        include: {
            variant: { include: { product: { select: { name: true, slug: true } } } },
            location: { select: { id: true, name: true, city: true, country: true } },
        },
    })
        .then((rows) => rows.map((m) => ({
        id: m.id,
        type: m.type,
        quantity: m.quantity,
        referenceId: m.referenceId,
        createdAt: m.createdAt,
        variantId: m.variantId,
        sku: m.variant.sku,
        productName: m.variant.product?.name ?? null,
        location: m.location,
    })));
}
// ===============================
// 🔍 SEARCH & BEHAVIOR
// ===============================
async function getTopSearchQueries(shopId, days = 30, limit = 10) {
    const since = getSinceDate(days);
    const grouped = await prisma_1.prisma.searchLog.groupBy({
        by: ["query"],
        where: { createdAt: { gte: since }, query: { not: "" } },
        _count: { id: true },
    });
    return grouped
        .map((g) => ({ query: g.query, count: g._count.id }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
}
async function getNoResultSearches(shopId, days = 30, limit = 10) {
    const since = getSinceDate(days);
    const byQuery = await prisma_1.prisma.searchLog.groupBy({
        by: ["query"],
        where: { createdAt: { gte: since }, query: { not: "" } },
        _count: { id: true },
    });
    const results = [];
    let failedTotal = 0;
    for (const q of byQuery) {
        const query = (q.query ?? "").trim();
        if (!query)
            continue;
        const exists = await prisma_1.prisma.product.findFirst({
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
async function getMostViewedProducts(shopId, limit = 10) {
    const grouped = await prisma_1.prisma.productView.groupBy({
        by: ["productId"],
        where: { product: { shopId } },
        _count: { id: true },
    });
    const productIds = grouped.map((g) => g.productId);
    const products = await prisma_1.prisma.product.findMany({
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
async function getSystemHealth(shopId) {
    const days = 30;
    const since = getSinceDate(days);
    const [ordersByStatus, paymentsByStatus, lowStock] = await Promise.all([
        prisma_1.prisma.order.groupBy({
            by: ["status"],
            where: shopId ? { shopId, createdAt: { gte: since } } : { createdAt: { gte: since } },
            _count: { id: true },
        }),
        prisma_1.prisma.payment.groupBy({
            by: ["status"],
            where: shopId ? { order: { shopId }, createdAt: { gte: since } } : { createdAt: { gte: since } },
            _count: { id: true },
        }),
        shopId ? getLowStockCount(shopId).then((r) => r.count) : Promise.resolve(0),
    ]);
    const orders = ordersByStatus.reduce((acc, g) => {
        acc[String(g.status)] = g._count.id;
        return acc;
    }, {});
    const payments = paymentsByStatus.reduce((acc, g) => {
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
async function getSyncStatus(shopId, limit = 20) {
    const where = shopId ? { shopId } : undefined;
    const [byStatus, recent, total] = await Promise.all([
        prisma_1.prisma.syncLog.groupBy({
            by: ["status"],
            where: where,
            _count: { id: true },
        }),
        prisma_1.prisma.syncLog.findMany({
            where: where,
            orderBy: { startedAt: "desc" },
            take: limit,
        }),
        prisma_1.prisma.syncLog.count({ where: where }),
    ]);
    return {
        total,
        byStatus: byStatus.reduce((acc, g) => {
            acc[String(g.status)] = g._count.id;
            return acc;
        }, {}),
        recent,
    };
}
async function getUnreadNotifications(userId) {
    const where = userId ? { userId } : {};
    const [unreadCount, grouped] = await Promise.all([
        prisma_1.prisma.notification.count({ where: { ...where, readAt: null } }),
        prisma_1.prisma.notification.groupBy({
            by: ["type"],
            where: { ...where, readAt: null },
            _count: { id: true },
        }),
    ]);
    return {
        userId: userId ?? null,
        unreadCount,
        byType: grouped.map((g) => ({ type: g.type, count: g._count.id })).sort((a, b) => b.count - a.count),
    };
}
//# sourceMappingURL=dashboard.service.js.map