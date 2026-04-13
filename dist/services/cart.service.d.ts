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
                position: number | null;
                variantId: string;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
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
        quantity: number;
        price: number;
        variantId: string;
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
                position: number | null;
                variantId: string;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
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
        quantity: number;
        price: number;
        variantId: string;
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
                position: number | null;
                variantId: string;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
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
        quantity: number;
        price: number;
        variantId: string;
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
                position: number | null;
                variantId: string;
            }[];
        } & {
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
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
        quantity: number;
        price: number;
        variantId: string;
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
    items: {
        id: string;
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
    currency: string;
    shopId: string;
    orderNumber: string;
    subtotal: number;
    taxTotal: number;
    discountTotal: number;
    grandTotal: number;
}>;
//# sourceMappingURL=cart.service.d.ts.map