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
<<<<<<< HEAD
                position: number | null;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
                variantId: string;
                position: number | null;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            price: number;
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
<<<<<<< HEAD
        quantity: number;
        price: number;
        variantId: string;
        cartId: string;
    })[];
} & {
=======
        variantId: string;
        quantity: number;
        price: number;
        cartId: string;
    })[];
} & {
    id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
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
<<<<<<< HEAD
                position: number | null;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
                variantId: string;
                position: number | null;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            price: number;
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
<<<<<<< HEAD
        quantity: number;
        price: number;
        variantId: string;
        cartId: string;
    })[];
} & {
=======
        variantId: string;
        quantity: number;
        price: number;
        cartId: string;
    })[];
} & {
    id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
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
<<<<<<< HEAD
                position: number | null;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
                variantId: string;
                position: number | null;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            price: number;
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
<<<<<<< HEAD
        quantity: number;
        price: number;
        variantId: string;
        cartId: string;
    })[];
} & {
=======
        variantId: string;
        quantity: number;
        price: number;
        cartId: string;
    })[];
} & {
    id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
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
<<<<<<< HEAD
                position: number | null;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
                variantId: string;
                position: number | null;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            price: number;
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
<<<<<<< HEAD
        quantity: number;
        price: number;
        variantId: string;
        cartId: string;
    })[];
} & {
=======
        variantId: string;
        quantity: number;
        price: number;
        cartId: string;
    })[];
} & {
    id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
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
        id: string;
<<<<<<< HEAD
        total: number;
        quantity: number;
        price: number;
        variantId: string;
        orderId: string;
        productName: string;
        variantName: string | null;
    }[];
    address: {
        name: string;
        phone: string;
        id: string;
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
=======
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
    };
} & {
    id: string;
    status: import("../generated/prisma/enums").PaymentStatus;
    createdAt: Date;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    currency: string;
    orderId: string;
    provider: string;
    providerTransactionId: string | null;
    amount: number;
    transactionId: string | null;
    paidAt: Date | null;
}>;
//# sourceMappingURL=cart.service.d.ts.map