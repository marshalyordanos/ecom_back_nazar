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
        productId: string;
        sku: string;
        barcode: string | null;
        price: number;
        comparePrice: number | null;
        costPrice: number | null;
        weight: number | null;
    };
} & {
    id: string;
    updatedAt: Date;
    locationId: string;
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
        total: number;
        price: number;
        variantId: string;
        quantity: number;
        productName: string;
        variantName: string | null;
        orderId: string;
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
            productId: string;
            sku: string;
            barcode: string | null;
            price: number;
            comparePrice: number | null;
            costPrice: number | null;
            weight: number | null;
        };
    } & {
        type: import("../generated/prisma/enums").InventoryMovementType;
        id: string;
        createdAt: Date;
        locationId: string;
        variantId: string;
        quantity: number;
        inventoryId: string | null;
        referenceId: string | null;
    };
})[]>;
//# sourceMappingURL=dashboard.service.d.ts.map