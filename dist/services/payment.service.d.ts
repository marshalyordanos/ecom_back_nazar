export declare function listPayments(query: {
    page?: number;
    pageSize?: number;
    filter?: string;
    sort?: string;
    orderId?: string;
}): Promise<{
    data: ({
        order: {
            userId: string;
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
    paidAt: Date | null;
}>;
//# sourceMappingURL=payment.service.d.ts.map