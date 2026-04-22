export declare function listCoupons(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}): Promise<{
    data: ({
        usages: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            orderId: string | null;
            usedAt: Date;
            couponId: string;
        }[];
    } & {
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("../generated/prisma/enums").CouponType;
        expiresAt: Date | null;
        value: number;
        minOrderAmount: number | null;
        usageLimit: number | null;
        usedCount: number;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getCouponById(id: string): Promise<{
    usages: ({
        user: {
            email: string | null;
            id: string;
        };
        order: {
            orderNumber: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orderId: string | null;
        usedAt: Date;
        couponId: string;
    })[];
} & {
    code: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: import("../generated/prisma/enums").CouponType;
    expiresAt: Date | null;
    value: number;
    minOrderAmount: number | null;
    usageLimit: number | null;
    usedCount: number;
}>;
export declare function createCoupon(data: {
    code: string;
    type: string;
    value: number;
    minOrderAmount?: number;
    usageLimit?: number;
    expiresAt?: Date;
}): Promise<{
    code: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: import("../generated/prisma/enums").CouponType;
    expiresAt: Date | null;
    value: number;
    minOrderAmount: number | null;
    usageLimit: number | null;
    usedCount: number;
}>;
export declare function updateCoupon(id: string, data: {
    code?: string;
    type?: string;
    value?: number;
    minOrderAmount?: number;
    usageLimit?: number;
    expiresAt?: Date;
}): Promise<{
    code: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: import("../generated/prisma/enums").CouponType;
    expiresAt: Date | null;
    value: number;
    minOrderAmount: number | null;
    usageLimit: number | null;
    usedCount: number;
}>;
export declare function deleteCoupon(id: string): Promise<{
    message: string;
}>;
export declare function applyCouponToOrder(orderId: string, couponId: string, userId: string): Promise<({
    items: {
        id: string;
        total: number;
        variantId: string;
        quantity: number;
        price: number;
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
}) | null>;
//# sourceMappingURL=coupon.service.d.ts.map