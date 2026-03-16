export declare function listUserOrders(userId: string, query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}): Promise<{
    data: ({
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
        address: {
            name: string;
            id: string;
            phone: string;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string | null;
            country: string;
            postalCode: string | null;
            latitude: number | null;
            longitude: number | null;
            orderId: string;
        } | null;
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
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getOrderById(orderId: string, userId?: string): Promise<{
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
    payments: {
        id: string;
        status: import("../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        currency: string;
        orderId: string;
        paidAt: Date | null;
        provider: string;
        providerTransactionId: string | null;
        amount: number;
    }[];
    shipments: {
        id: string;
        status: import("../generated/prisma/enums").ShipmentStatus;
        orderId: string;
        shippedAt: Date | null;
        deliveredAt: Date | null;
        trackingNumber: string | null;
        carrier: string | null;
    }[];
    address: {
        name: string;
        id: string;
        phone: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string | null;
        country: string;
        postalCode: string | null;
        latitude: number | null;
        longitude: number | null;
        orderId: string;
    } | null;
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
}>;
export declare function cancelOrder(orderId: string, userId: string): Promise<{
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
}>;
export declare function completeOrder(orderId: string): Promise<{
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
}>;
export declare function listOrderItems(orderId: string): Promise<({
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
    total: number;
    price: number;
    variantId: string;
    quantity: number;
    productName: string;
    variantName: string | null;
    orderId: string;
})[]>;
export declare function listOrdersAdmin(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
    shopId?: string;
}): Promise<{
    data: ({
        user: {
            email: string;
            id: string;
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
        address: {
            name: string;
            id: string;
            phone: string;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string | null;
            country: string;
            postalCode: string | null;
            latitude: number | null;
            longitude: number | null;
            orderId: string;
        } | null;
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
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function createOrderAdmin(data: {
    shopId: string;
    userId: string;
    orderNumber?: string;
    status?: string;
    subtotal: number;
    taxTotal?: number;
    discountTotal?: number;
    grandTotal: number;
    currency: string;
    items: Array<{
        variantId: string;
        productName: string;
        variantName?: string;
        price: number;
        quantity: number;
        total: number;
    }>;
    address: {
        name: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state?: string;
        country: string;
        postalCode?: string;
    };
}): Promise<({
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
    address: {
        name: string;
        id: string;
        phone: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string | null;
        country: string;
        postalCode: string | null;
        latitude: number | null;
        longitude: number | null;
        orderId: string;
    } | null;
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
}) | null>;
//# sourceMappingURL=order.service.d.ts.map