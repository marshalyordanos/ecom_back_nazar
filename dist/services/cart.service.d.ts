export declare function getOrCreateCart(userId: string): Promise<{
    items: ({
        variant: {
            product: {
                name: string;
                slug: string;
            };
            media: {
                url: string;
                type: string;
                id: string;
                position: number | null;
                variantId: string;
            }[];
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
        createdAt: Date;
        price: number;
        variantId: string;
        quantity: number;
        cartId: string;
    })[];
} & {
    userId: string;
    id: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
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
                type: string;
                id: string;
                position: number | null;
                variantId: string;
            }[];
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
        createdAt: Date;
        price: number;
        variantId: string;
        quantity: number;
        cartId: string;
    })[];
} & {
    userId: string;
    id: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
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
                type: string;
                id: string;
                position: number | null;
                variantId: string;
            }[];
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
        createdAt: Date;
        price: number;
        variantId: string;
        quantity: number;
        cartId: string;
    })[];
} & {
    userId: string;
    id: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
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
                type: string;
                id: string;
                position: number | null;
                variantId: string;
            }[];
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
        createdAt: Date;
        price: number;
        variantId: string;
        quantity: number;
        cartId: string;
    })[];
} & {
    userId: string;
    id: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
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
//# sourceMappingURL=cart.service.d.ts.map