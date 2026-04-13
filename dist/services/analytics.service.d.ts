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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
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
<<<<<<< HEAD
            quantity: number;
            price: number;
            variantId: string;
=======
            variantId: string;
            quantity: number;
            price: number;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
            orderId: string;
            productName: string;
            variantName: string | null;
        }[];
    } & {
<<<<<<< HEAD
=======
        id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        status: import("../generated/prisma/enums").OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
<<<<<<< HEAD
        currency: string;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        shopId: string;
        currency: string;
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
            email: string | null;
            firstName: string;
            lastName: string;
        };
        items: {
            id: string;
            total: number;
<<<<<<< HEAD
            quantity: number;
            price: number;
            variantId: string;
=======
            variantId: string;
            quantity: number;
            price: number;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
            orderId: string;
            productName: string;
            variantName: string | null;
        }[];
    } & {
<<<<<<< HEAD
=======
        id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        status: import("../generated/prisma/enums").OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
<<<<<<< HEAD
        currency: string;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        shopId: string;
        currency: string;
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