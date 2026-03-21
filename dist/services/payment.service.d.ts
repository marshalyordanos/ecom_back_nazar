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
        id: string;
        status: import("../generated/prisma/enums").PaymentStatus;
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
    orderId: string;
    provider: string;
    providerTransactionId: string | null;
    amount: number;
    paidAt: Date | null;
}>;
export declare function capturePayment(id: string): Promise<{
    id: string;
    status: import("../generated/prisma/enums").PaymentStatus;
    createdAt: Date;
    currency: string;
    orderId: string;
    provider: string;
    providerTransactionId: string | null;
    amount: number;
    paidAt: Date | null;
}>;
export declare function refundPayment(id: string): Promise<{
    id: string;
    status: import("../generated/prisma/enums").PaymentStatus;
    createdAt: Date;
    currency: string;
    orderId: string;
    provider: string;
    providerTransactionId: string | null;
    amount: number;
    paidAt: Date | null;
}>;
//# sourceMappingURL=payment.service.d.ts.map