export declare function getOrCreateCart(userId: string): Promise<{
    items: ({
        variant: {
            product: {
                name: string;
                slug: string;
            };
            media: {
                url: string;
                id: string;
                type: string;
                variantId: string;
                position: number | null;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
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
        createdAt: Date;
        price: number;
        variantId: string;
        quantity: number;
        cartId: string;
    })[];
} & {
    status: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}>;
export declare function addItem(userId: string, variantId: string, quantity: number, price: number): Promise<{
    items: ({
        variant: {
            product: {
                name: string;
                slug: string;
            };
            media: {
                url: string;
                id: string;
                type: string;
                variantId: string;
                position: number | null;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
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
        createdAt: Date;
        price: number;
        variantId: string;
        quantity: number;
        cartId: string;
    })[];
} & {
    status: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}>;
export declare function updateItemQuantity(userId: string, itemId: string, quantity: number): Promise<{
    items: ({
        variant: {
            product: {
                name: string;
                slug: string;
            };
            media: {
                url: string;
                id: string;
                type: string;
                variantId: string;
                position: number | null;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
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
        createdAt: Date;
        price: number;
        variantId: string;
        quantity: number;
        cartId: string;
    })[];
} & {
    status: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}>;
export declare function removeItem(userId: string, itemId: string): Promise<{
    items: ({
        variant: {
            product: {
                name: string;
                slug: string;
            };
            media: {
                url: string;
                id: string;
                type: string;
                variantId: string;
                position: number | null;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
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
        createdAt: Date;
        price: number;
        variantId: string;
        quantity: number;
        cartId: string;
    })[];
} & {
    status: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}>;
export declare function checkout(userId: string, data: {
    shopId: string;
    shippingAddress: {
        name: string;
        phone: string;
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state?: string;
        country: string;
        postalCode?: string;
    };
    couponCode?: string;
}): Promise<{
    order: any;
    checkout_url: any;
}>;
export declare function handleChapaCallback(data: any): Promise<{
    order: {
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
        status: import("../generated/prisma/enums").OrderStatus;
        id: string;
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
    };
} & {
    status: import("../generated/prisma/enums").PaymentStatus;
    id: string;
    createdAt: Date;
    currency: string;
    orderId: string;
    provider: string;
    providerTransactionId: string | null;
    amount: number;
    transactionId: string | null;
    paidAt: Date | null;
}>;
//# sourceMappingURL=cart.service.d.ts.map