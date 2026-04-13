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
            phone: string | null;
            id: string;
            createdAt: Date;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string | null;
            country: string;
            postalCode: string | null;
            latitude: number | null;
            longitude: number | null;
            shopId: string;
        };
        variant: {
            product: {
                name: string;
                slug: string;
            };
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
        updatedAt: Date;
        locationId: string;
        quantity: number;
        variantId: string;
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
        phone: string | null;
        id: string;
        createdAt: Date;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string | null;
        country: string;
        postalCode: string | null;
        latitude: number | null;
        longitude: number | null;
        shopId: string;
    };
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    locationId: string;
    quantity: number;
    variantId: string;
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
    quantity: number;
    variantId: string;
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
            phone: string | null;
            id: string;
            createdAt: Date;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string | null;
            country: string;
            postalCode: string | null;
            latitude: number | null;
            longitude: number | null;
            shopId: string;
        };
        variant: {
            product: {
                name: string;
            };
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
        updatedAt: Date;
        type: import("../generated/prisma/enums").InventoryMovementType;
        locationId: string;
        quantity: number;
        variantId: string;
        referenceId: string | null;
        inventoryId: string | null;
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
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: import("../generated/prisma/enums").InventoryMovementType;
    locationId: string;
    quantity: number;
    variantId: string;
    referenceId: string | null;
    inventoryId: string | null;
}>;
//# sourceMappingURL=inventory.service.d.ts.map