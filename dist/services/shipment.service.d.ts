export declare function listShipments(query: {
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
        status: import("../generated/prisma/enums").ShipmentStatus;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        trackingNumber: string | null;
        carrier: string | null;
        shippedAt: Date | null;
        deliveredAt: Date | null;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getShipmentById(id: string): Promise<{
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
    status: import("../generated/prisma/enums").ShipmentStatus;
    createdAt: Date;
    updatedAt: Date;
    orderId: string;
    trackingNumber: string | null;
    carrier: string | null;
    shippedAt: Date | null;
    deliveredAt: Date | null;
}>;
export declare function getTrackingInfo(id: string): Promise<{
    trackingNumber: string | null;
    carrier: string | null;
    status: import("../generated/prisma/enums").ShipmentStatus;
    shippedAt: Date | null;
    deliveredAt: Date | null;
    orderNumber: string;
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
}>;
export declare function updateShipmentStatus(id: string, data: {
    status?: string;
    trackingNumber?: string;
    carrier?: string;
    shippedAt?: Date;
    deliveredAt?: Date;
}): Promise<{
    id: string;
    status: import("../generated/prisma/enums").ShipmentStatus;
    createdAt: Date;
    updatedAt: Date;
    orderId: string;
    trackingNumber: string | null;
    carrier: string | null;
    shippedAt: Date | null;
    deliveredAt: Date | null;
}>;
//# sourceMappingURL=shipment.service.d.ts.map