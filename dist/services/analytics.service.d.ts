export declare function getProductViews(filters: {
    productId?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
}): Promise<{
    views: ({
        product: {
            name: string;
            slug: string;
        };
    } & {
        userId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        sessionId: string | null;
    })[];
    byProduct: {
        count: number;
        product: any;
    }[];
}>;
export declare function getSearchLogs(filters: {
    startDate?: Date;
    endDate?: Date;
    limit?: number;
}): Promise<{
    logs: {
        query: string;
        userId: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    byQuery: Record<string, number>;
}>;
export declare function getSalesReport(filters: {
    shopId?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string;
}): Promise<{
    orders: ({
        items: {
            id: string;
            total: number;
            price: number;
            quantity: number;
            variantId: string;
            orderId: string;
            productName: string;
            variantName: string | null;
        }[];
    } & {
        userId: string;
        id: string;
        status: import("../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        shopId: string;
        orderNumber: string;
        subtotal: number;
        taxTotal: number;
        discountTotal: number;
        grandTotal: number;
    })[];
    totalRevenue: number;
    totalOrders: number;
}>;
export declare function getOrdersReport(filters: {
    shopId?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string;
    page?: number;
    pageSize?: number;
}): Promise<{
    data: ({
        user: {
            email: string;
            firstName: string;
            lastName: string;
        };
        items: {
            id: string;
            total: number;
            price: number;
            quantity: number;
            variantId: string;
            orderId: string;
            productName: string;
            variantName: string | null;
        }[];
    } & {
        userId: string;
        id: string;
        status: import("../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        shopId: string;
        orderNumber: string;
        subtotal: number;
        taxTotal: number;
        discountTotal: number;
        grandTotal: number;
    })[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}>;
//# sourceMappingURL=analytics.service.d.ts.map