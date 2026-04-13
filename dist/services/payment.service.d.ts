export declare function listPayments(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
    orderId?: string;
}): Promise<{
    data: ({
        order: {
            user: {
                email: string;
                id: string;
                phone: string;
                passwordHash: string;
                firstName: string;
                lastName: string;
                avatarUrl: string | null;
                isSuperAdmin: boolean;
                status: import("../generated/prisma/enums").UserStatus;
                emailVerifiedAt: Date | null;
                phoneVerifiedAt: Date | null;
                locationId: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
            orderNumber: string;
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
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getPaymentById(id: string): Promise<{
    order: {
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
export declare function capturePayment(id: string): Promise<{
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
export declare function refundPayment(id: string): Promise<{
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
//# sourceMappingURL=payment.service.d.ts.map