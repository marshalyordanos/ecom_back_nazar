export declare function listInventory(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}): Promise<{
    data: ({
        location: {
            name: string;
            id: string;
            phone: string | null;
            createdAt: Date;
            shopId: string;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string | null;
            country: string;
            postalCode: string | null;
            latitude: number | null;
            longitude: number | null;
        };
        variant: {
            product: {
                name: string;
                slug: string;
            };
        } & {
            id: string;
            status: import("../generated/prisma/enums").ProductStatus;
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
        updatedAt: Date;
        locationId: string;
        variantId: string;
        quantity: number;
        reservedQuantity: number;
        reorderLevel: number | null;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getInventoryByVariantId(variantId: string): Promise<({
    location: {
        name: string;
        id: string;
        phone: string | null;
        createdAt: Date;
        shopId: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string | null;
        country: string;
        postalCode: string | null;
        latitude: number | null;
        longitude: number | null;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    locationId: string;
    variantId: string;
    quantity: number;
    reservedQuantity: number;
    reorderLevel: number | null;
})[]>;
export declare function updateInventoryQuantity(variantId: string, locationId: string, data: {
    quantity?: number;
    reservedQuantity?: number;
    reorderLevel?: number;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    locationId: string;
    variantId: string;
    quantity: number;
    reservedQuantity: number;
    reorderLevel: number | null;
}>;
export declare function listMovements(query: {
    page?: number;
    pageSize?: number;
    filter?: string;
    sort?: string;
}): Promise<{
    data: ({
        location: {
            name: string;
            id: string;
            phone: string | null;
            createdAt: Date;
            shopId: string;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string | null;
            country: string;
            postalCode: string | null;
            latitude: number | null;
            longitude: number | null;
        };
        variant: {
            product: {
                name: string;
            };
        } & {
            id: string;
            status: import("../generated/prisma/enums").ProductStatus;
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
        type: import("../generated/prisma/enums").InventoryMovementType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        locationId: string;
        variantId: string;
        quantity: number;
        inventoryId: string | null;
        referenceId: string | null;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function addMovement(data: {
    variantId: string;
    locationId: string;
    type: string;
    quantity: number;
    referenceId?: string;
}): Promise<{
    type: import("../generated/prisma/enums").InventoryMovementType;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    locationId: string;
    variantId: string;
    quantity: number;
    inventoryId: string | null;
    referenceId: string | null;
}>;
//# sourceMappingURL=inventory.service.d.ts.map