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
            price: number;
            total: number;
            variantId: string;
            quantity: number;
            orderId: string;
            productName: string;
            variantName: string | null;
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
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getOrderById(orderId: string, userId?: string): Promise<{
    payments: {
        id: string;
        status: import("../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        currency: string;
        orderId: string;
        provider: string;
        providerTransactionId: string | null;
        amount: number;
        transactionId: string | null;
        paidAt: Date | null;
    }[];
    shipments: {
        id: string;
        status: import("../generated/prisma/enums").ShipmentStatus;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        trackingNumber: string | null;
        carrier: string | null;
        shippedAt: Date | null;
        deliveredAt: Date | null;
    }[];
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
}>;
export declare function trackOrderByReference(reference: string): Promise<{
    id: string;
    orderNumber: string;
    status: import("../generated/prisma/enums").OrderStatus;
    grandTotal: number;
    currency: string;
    createdAt: Date;
    address: {
        name: string;
        phone: string;
        city: string;
        state: string | null;
        country: string;
    } | null;
    items: {
        id: string;
        price: number;
        total: number;
        quantity: number;
        productName: string;
        variantName: string | null;
    }[];
    shipments: {
        id: string;
        status: import("../generated/prisma/enums").ShipmentStatus;
        trackingNumber: string | null;
        carrier: string | null;
        shippedAt: Date | null;
        deliveredAt: Date | null;
    }[];
    payments: {
        id: string;
        status: import("../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        currency: string;
        provider: string;
        amount: number;
        paidAt: Date | null;
    }[];
}>;
export declare function cancelOrder(orderId: string, userId: string): Promise<{
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
}>;
export declare function completeOrder(orderId: string): Promise<{
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
    price: number;
    total: number;
    variantId: string;
    quantity: number;
    orderId: string;
    productName: string;
    variantName: string | null;
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
        items: ({
            variant: {
                variantOptionValues: ({
                    optionValue: {
                        option: {
                            name: string;
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                    } & {
                        value: string;
                        id: string;
                        createdAt: Date;
                        colorValue: string | null;
                        optionId: string;
                    };
                } & {
                    id: string;
                    variantId: string;
                    optionValueId: string;
                })[];
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
            price: number;
            total: number;
            variantId: string;
            quantity: number;
            orderId: string;
            productName: string;
            variantName: string | null;
        })[];
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
        latitude?: number;
        longitude?: number;
    };
}): Promise<({
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
}) | null>;
export declare function checkoutAsGuest(data: {
    shopId: string;
    items: Array<{
        variantId: string;
        quantity: number;
        price: number;
    }>;
    shippingAddress: {
        name: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state?: string;
        country: string;
        postalCode?: string;
        email?: string;
    };
    couponCode?: string;
    paymentMethod?: "chapa" | "pickup";
}): Promise<{
    order: ({
        payments: {
            id: string;
            status: import("../generated/prisma/enums").PaymentStatus;
            createdAt: Date;
            currency: string;
            orderId: string;
            provider: string;
            providerTransactionId: string | null;
            amount: number;
            transactionId: string | null;
            paidAt: Date | null;
        }[];
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
    }) | null;
    checkout_url: string | null;
}>;
//# sourceMappingURL=order.service.d.ts.map