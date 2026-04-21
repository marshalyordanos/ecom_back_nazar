/** Admin dashboard cards: global counts + week-over-week trend metrics */
export declare function getGlobalDashboardSummary(): Promise<{
    users: {
        total: number;
        active: number;
        suspended: number;
        verifiedEmails: number;
        percentChange: number;
    };
    inventory: {
        totalStock: number;
        reservedQuantity: number;
        lowStockAlerts: number;
        totalVariants: number;
        percentChange: number;
    };
    orders: {
        totalOrders: number;
        completedOrders: number;
        pendingOrders: number;
        totalRevenue: number;
        percentChange: number;
        revenueChange: number;
    };
    payments: {
        totalPayments: number;
        paidPayments: number;
        failedPayments: number;
        totalPaymentAmount: number;
        percentChange: number;
        amountChange: number;
    };
}>;
export declare function getGlobalRevenueSeries(days: number): Promise<{
    days: number;
    categories: string[];
    series: {
        name: string;
        data: number[];
    }[];
    totalRevenue: number;
}>;
export declare function getGlobalOrdersCountSeries(days: number): Promise<{
    days: number;
    categories: string[];
    series: {
        name: string;
        data: number[];
    }[];
    totalOrders: number;
}>;
export declare function getGlobalOrderStatusDistribution(): Promise<{
    labels: string[];
    values: number[];
}>;
export declare function getGlobalPaymentsSeries(days: number): Promise<{
    days: number;
    categories: string[];
    series: {
        name: string;
        data: number[];
    }[];
    totalAmount: number;
}>;
export declare function getOverview(shopId: string): Promise<{
    totalOrders: number;
    totalRevenue: number;
    ordersByStatus: {};
    lowInventoryAlerts: number;
    topProducts: {
        variantId: string;
        totalRevenue: number | null;
        orderCount: number;
        productName: string | undefined;
    }[];
}>;
export declare function getSalesSummary(shopId: string, groupBy: "day" | "week" | "month"): Promise<Record<string, number>>;
export declare function getOrdersSummary(shopId: string): Promise<Record<string, number>>;
export declare function getTopProducts(shopId: string, limit?: number): Promise<{
    variantId: string;
    revenue: number | null;
    orderCount: number;
    productName: string | undefined;
}[]>;
export declare function getEcommerceHighlights(shopId: string, limit?: number): Promise<{
    visitsSummary: {
        totalVisits: number;
        totalOrders: number;
        conversionRate: number;
        visitsChangePct: number;
        ordersChangePct: number;
    };
    categoryHighlights: {
        categoryId: string;
        categoryName: string;
        track: string | null;
        image: string | null;
        revenue: number;
        orderCount: number;
        totalViews: number;
        topProduct: {
            productId: string;
            productName: string;
            productSlug: string;
            revenue: number;
            orderCount: number;
            views: number;
            image: string | null;
        };
    }[];
}>;
export declare function getLowInventory(shopId: string): Promise<({
    location: {
        name: string;
        id: string;
        phone: string | null;
        createdAt: Date;
        shopId: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string | null;
        country: string;
        postalCode: string | null;
        latitude: number | null;
        longitude: number | null;
    };
    variant: {
        product: {
            name: string;
            slug: string;
        };
    } & {
        id: string;
        status: import("../generated/prisma/enums").ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        image: string | null;
        productId: string;
        sku: string;
        barcode: string | null;
        comparePrice: number | null;
        costPrice: number | null;
        weight: number | null;
    };
} & {
    id: string;
    locationId: string;
    createdAt: Date;
    updatedAt: Date;
    variantId: string;
    quantity: number;
    reservedQuantity: number;
    reorderLevel: number | null;
})[]>;
export declare function getNewCustomers(shopId: string, days?: number): Promise<number>;
export declare function getRecentOrders(shopId: string, limit?: number): Promise<({
    user: {
        email: string;
        firstName: string;
        lastName: string;
    };
    items: {
        id: string;
        price: number;
        total: number;
        variantId: string;
        quantity: number;
        orderId: string;
        productName: string;
        variantName: string | null;
    }[];
} & {
    id: string;
    status: import("../generated/prisma/enums").OrderStatus;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    shopId: string;
    currency: string;
    orderNumber: string;
    subtotal: number;
    taxTotal: number;
    discountTotal: number;
    grandTotal: number;
})[]>;
export declare function getRecentActivities(_shopId: string, limit?: number): Promise<({
    type: string;
    data: {
        id: string;
        status: import("../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        orderNumber: string;
    };
} | {
    type: string;
    data: {
        variant: {
            product: {
                name: string;
            };
        } & {
            id: string;
            status: import("../generated/prisma/enums").ProductStatus;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            image: string | null;
            productId: string;
            sku: string;
            barcode: string | null;
            comparePrice: number | null;
            costPrice: number | null;
            weight: number | null;
        };
    } & {
        id: string;
        locationId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("../generated/prisma/enums").InventoryMovementType;
        variantId: string;
        quantity: number;
        inventoryId: string | null;
        referenceId: string | null;
    };
})[]>;
export declare function getSummaryWithDetails(shopId: string): Promise<{
    customers: {
        thisMonth: number;
        prevMonth: number;
        growth: number;
    };
    orders: {
        thisMonth: number;
        prevMonth: number;
        growth: number;
    };
    sales: {
        thisMonth: number;
        prevMonth: number;
        growth: number;
    };
}>;
export declare function getShopDashboardSummary(shopId: string): Promise<{
    totalTransactions: number;
    revenue: number;
    users: number;
    orders: number;
    products: number;
    alerts: number;
    customers: number;
}>;
export declare function getUserSummary(shopId: string, days?: number): Promise<{
    totalUsers: number;
    newUsers: number;
    active: number;
    inactive: number;
    suspended: number;
}>;
export declare function getUserVerificationStats(shopId: string): Promise<{
    totalUsers: number;
    emailVerified: number;
    emailNotVerified: number;
    phoneVerified: number;
    phoneNotVerified: number;
}>;
export declare function getOrderSummaryExtended(shopId: string): Promise<{
    totalOrders: number;
    pending: number;
    completed: number;
    cancelled: number;
    refunded: number;
    byStatus: Record<string, number>;
}>;
export declare function getOrderRevenueSummary(shopId: string): Promise<{
    subtotal: number;
    taxTotal: number;
    discountTotal: number;
    grandTotal: number;
}>;
export declare function getDailyOrdersSummary(shopId: string, days?: number): Promise<{
    days: number;
    series: {
        date: string;
        count: number;
    }[];
}>;
export declare function getPaymentSummary(shopId: string): Promise<{
    totalPayments: number;
    pending: number;
    paid: number;
    failed: number;
    refunded: number;
    byStatus: Record<string, number>;
}>;
export declare function getPaymentMethodStats(shopId: string): Promise<{
    provider: string;
    count: number;
    totalAmount: number;
}[]>;
export declare function getDailyPayments(shopId: string, days?: number): Promise<{
    days: number;
    series: {
        date: string;
        count: number;
        amount: number;
    }[];
}>;
export declare function getProductSummary(shopId: string): Promise<{
    totalProducts: number;
    byStatus: Record<string, number>;
    active: number;
    draft: number;
    archived: number;
    totalSearchLogs: number;
    totalViewCount: number;
}>;
export declare function getVariantSummary(shopId: string): Promise<{
    totalVariants: number;
    activeVariants: number;
    pricing: {
        minPrice: number;
        maxPrice: number;
        avgPrice: number;
        avgComparePrice: number;
        avgCostPrice: number;
        avgWeight: number;
    };
}>;
export declare function getInventorySummary(shopId: string): Promise<{
    totalStock: number;
    reserved: number;
    available: number;
}>;
export declare function getLowStockCount(shopId: string): Promise<{
    count: number;
}>;
export declare function getOutOfStock(shopId: string): Promise<{
    count: number;
}>;
export declare function getShopSummary(): Promise<{
    totalShops: number;
    activeShops: number;
    locationsCount: number;
}>;
export declare function getLocationSummary(): Promise<{
    city: string;
    country: string;
    count: number;
}[]>;
export declare function getCouponSummary(shopId: string): Promise<{
    totalCoupons: number;
    activeCoupons: number;
    expiredCoupons: number;
    usageCount: number;
}>;
export declare function getCouponUsageSummary(shopId: string): Promise<{
    totalUsage: number;
    byUser: {
        userId: string;
        count: number;
    }[];
}>;
export declare function getReviewSummary(shopId: string): Promise<{
    totalReviews: number;
    approved: number;
    pending: number;
    rejected: number;
    avgRating: number;
    byStatus: Record<string, number>;
}>;
export declare function getNotificationSummary(shopId: string): Promise<{
    totalNotifications: number;
    readCount: number;
    unreadCount: number;
}>;
export declare function getSearchSummary(shopId: string, days?: number): Promise<{
    days: number;
    totalSearches: number;
    uniqueQueries: number;
}>;
export declare function getSalesTrends(shopId: string, groupBy: "day" | "week" | "month", days?: number): Promise<{
    groupBy: "week" | "day" | "month";
    days: number;
    series: {
        period: string;
        revenue: number;
    }[];
}>;
export declare function getSalesByChannel(shopId: string, days?: number): Promise<{
    channel: string;
    count: number;
    revenue: number;
}[]>;
export declare function getSalesForecast(shopId: string, historyDays?: number, forecastDays?: number): Promise<{
    historyDays: number;
    forecastDays: number;
    historyTotal: number;
    avgPerDay: number;
    forecastTotal: number;
    series: {
        date: string;
        revenue: number;
    }[];
}>;
export declare function getRefundStats(shopId: string, days?: number): Promise<{
    days: number;
    refundedCount: number;
    refundedAmount: number;
}>;
export declare function getOrderStatusStats(shopId: string, days?: number): Promise<{
    days: number;
    byStatus: Record<string, number>;
}>;
export declare function getOrderFulfillmentStats(shopId: string, days?: number): Promise<{
    days: number;
    pending: number;
    shipped: number;
    delivered: number;
    byStatus: Record<string, number>;
}>;
export declare function getOrderValueStats(shopId: string, days?: number): Promise<{
    days: number;
    buckets: {
        low: {
            count: number;
            revenue: number;
        };
        medium: {
            count: number;
            revenue: number;
        };
        high: {
            count: number;
            revenue: number;
        };
    };
    thresholds?: undefined;
} | {
    days: number;
    thresholds: {
        lowMax: number;
        highMin: number;
    };
    buckets: {
        low: {
            count: number;
            revenue: number;
        };
        medium: {
            count: number;
            revenue: number;
        };
        high: {
            count: number;
            revenue: number;
        };
    };
}>;
export declare function getAbandonedOrders(shopId: string, minAgeDays?: number): Promise<{
    minAgeDays: number;
    abandonedCartCount: number;
    abandonedUsersCount: number;
    potentialRevenue: number;
}>;
export declare function getProductPerformance(shopId: string, days?: number, limit?: number): Promise<{
    productId: string;
    productName: string | null;
    revenue: number;
    salesCount: number;
}[]>;
export declare function getProductConversion(shopId: string, days?: number, limit?: number): Promise<{
    days: number;
    series: {
        productId: string;
        productName: string | null;
        views: number;
        purchases: number;
        conversionRate: number;
    }[];
}>;
export declare function getCategoryStats(shopId: string, days?: number): Promise<{
    categoryId: string | null;
    categoryName: string;
    revenue: number;
    orderCount: number;
}[]>;
export declare function getBrandStats(shopId: string, days?: number): Promise<{
    brandId: string | null;
    brandName: string;
    revenue: number;
    orderCount: number;
}[]>;
export declare function getCustomerGrowth(shopId: string, days?: number): Promise<{
    days: number;
    series: {
        date: string;
        count: number;
    }[];
}>;
export declare function getCustomerRetention(shopId: string, days?: number): Promise<{
    days: number;
    newUsers: number;
    returningUsers: number;
    retentionRate: number;
}>;
export declare function getCustomerLTV(shopId: string, days?: number): Promise<{
    days: number;
    customersCount: number;
    totalRevenue: number;
    avgLTV: number;
}>;
export declare function getCustomerSegments(shopId: string, days?: number): Promise<{
    days: number;
    segments: {
        low: {
            count: number;
            revenue: number;
        };
        medium: {
            count: number;
            revenue: number;
        };
        high: {
            count: number;
            revenue: number;
        };
    };
    thresholds: {
        lowMax: number;
        highMin: number;
    };
}>;
export declare function getInventoryValuation(shopId: string): Promise<{
    stockValuePrice: number;
    stockValueCost: number;
    reservedValuePrice: number;
}>;
export declare function getInventoryTurnover(shopId: string, days?: number): Promise<{
    days: number;
    soldQuantity: number;
    available: number;
    turnover: number;
}>;
export declare function getInventoryAlerts(shopId: string, limit?: number): Promise<{
    count: number;
    items: {
        inventoryId: string;
        variantId: string;
        productName: string;
        sku: string;
        location: {
            id: string;
            name: string;
            city: string;
            country: string;
        } | null;
        quantity: number;
        reservedQuantity: number;
        available: number;
        reorderLevel: number | null;
    }[];
}>;
export declare function getInventoryByLocation(shopId: string): Promise<{
    byLocation: {
        locationId: string;
        locationName: string | null;
        city: string | null;
        country: string | null;
        total: number;
        reserved: number;
        available: number;
    }[];
}>;
export declare function getCouponPerformance(shopId: string, limit?: number): Promise<{
    couponId: string;
    code: string;
    discountTotal: number;
    usageCount: number;
}[]>;
export declare function getActiveCoupons(shopId: string, limit?: number): Promise<{
    id: string;
    code: string;
    type: import("../generated/prisma/enums").CouponType;
    value: number;
    usageLimit: number | null;
    usedCount: number;
    expiresAt: Date | null;
}[]>;
export declare function getExpiredCoupons(shopId: string, limit?: number): Promise<{
    id: string;
    code: string;
    type: import("../generated/prisma/enums").CouponType;
    value: number;
    usageLimit: number | null;
    usedCount: number;
    expiresAt: Date | null;
}[]>;
export declare function getRatingDistribution(shopId: string): Promise<{
    totalReviews: number;
    distribution: Record<string, number>;
}>;
export declare function getRecentReviews(shopId: string, limit?: number): Promise<{
    id: string;
    productId: string;
    productName: string;
    userId: string;
    user: {
        id: string;
        email: string;
        name: string;
    } | null;
    rating: number;
    title: string | null;
    comment: string | null;
    status: import("../generated/prisma/enums").ReviewStatus;
    createdAt: Date;
}[]>;
export declare function getPendingReviews(shopId: string, limit?: number): Promise<{
    id: string;
    productId: string;
    productName: string;
    userId: string;
    user: {
        id: string;
        email: string;
        name: string;
    } | null;
    rating: number;
    title: string | null;
    comment: string | null;
    status: import("../generated/prisma/enums").ReviewStatus;
    createdAt: Date;
}[]>;
export declare function getOrderActivities(shopId: string, limit?: number): Promise<({
    type: string;
    createdAt: Date;
    data: {
        id: string;
        status: import("../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        orderNumber: string;
    };
} | {
    type: string;
    createdAt: Date;
    data: {
        id: string;
        status: import("../generated/prisma/enums").ShipmentStatus;
        createdAt: Date;
        orderId: string;
        trackingNumber: string | null;
        carrier: string | null;
    };
} | {
    type: string;
    createdAt: Date;
    data: {
        id: string;
        status: import("../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        orderId: string;
        provider: string;
        amount: number;
    };
})[]>;
export declare function getUserActivities(shopId: string, days?: number, limit?: number): Promise<{
    registrations: never[];
    recentOrders: never[];
    days?: undefined;
} | {
    days: number;
    registrations: {
        id: string;
        email: string;
        name: string;
        createdAt: Date;
    }[];
    recentOrders: {
        id: string;
        status: import("../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        userId: string;
        orderNumber: string;
    }[];
}>;
export declare function getInventoryActivities(shopId: string, limit?: number): Promise<{
    id: string;
    type: import("../generated/prisma/enums").InventoryMovementType;
    quantity: number;
    referenceId: string | null;
    createdAt: Date;
    variantId: string;
    sku: string;
    productName: string;
    location: {
        name: string;
        id: string;
        city: string;
        country: string;
    };
}[]>;
export declare function getTopSearchQueries(shopId: string, days?: number, limit?: number): Promise<{
    query: string;
    count: number;
}[]>;
export declare function getNoResultSearches(shopId: string, days?: number, limit?: number): Promise<{
    days: number;
    failedSearches: number;
    failedQueries: {
        query: string;
        count: number;
    }[];
}>;
export declare function getMostViewedProducts(shopId: string, limit?: number): Promise<{
    productId: string;
    productName: string | null;
    slug: string | null;
    views: number;
}[]>;
export declare function getSystemHealth(shopId?: string): Promise<{
    timestamp: string;
    shopId: string | null;
    ordersHealth: {
        days: number;
        byStatus: Record<string, number>;
    };
    paymentsHealth: {
        days: number;
        byStatus: Record<string, number>;
    };
    inventoryAlerts: {
        lowStockCount: number;
    };
}>;
export declare function getSyncStatus(shopId?: string, limit?: number): Promise<{
    total: number;
    byStatus: Record<string, number>;
    recent: {
        id: string;
        status: import("../generated/prisma/enums").SyncStatus;
        shopId: string;
        productsSynced: number;
        startedAt: Date;
        finishedAt: Date | null;
    }[];
}>;
export declare function getUnreadNotifications(userId?: string): Promise<{
    userId: string | null;
    unreadCount: number;
    byType: {
        type: string;
        count: number;
    }[];
}>;
//# sourceMappingURL=dashboard.service.d.ts.map