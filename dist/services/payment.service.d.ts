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
                createdAt: Date;
                updatedAt: Date;
            };
            orderNumber: string;
        };
    } & {
        id: string;
        status: import("../generated/prisma/enums").PaymentStatus;
        createdAt: Date;
        currency: string;
        provider: string;
        providerTransactionId: string | null;
        amount: number;
        transactionId: string | null;
        paidAt: Date | null;
        orderId: string;
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
    };
} & {
    id: string;
    status: import("../generated/prisma/enums").PaymentStatus;
    createdAt: Date;
    currency: string;
    provider: string;
    providerTransactionId: string | null;
    amount: number;
    transactionId: string | null;
    paidAt: Date | null;
    orderId: string;
}>;
export declare function capturePayment(id: string): Promise<{
    id: string;
    status: import("../generated/prisma/enums").PaymentStatus;
    createdAt: Date;
    currency: string;
    provider: string;
    providerTransactionId: string | null;
    amount: number;
    transactionId: string | null;
    paidAt: Date | null;
    orderId: string;
}>;
export declare function refundPayment(id: string): Promise<{
    id: string;
    status: import("../generated/prisma/enums").PaymentStatus;
    createdAt: Date;
    currency: string;
    provider: string;
    providerTransactionId: string | null;
    amount: number;
    transactionId: string | null;
    paidAt: Date | null;
    orderId: string;
}>;
//# sourceMappingURL=payment.service.d.ts.map