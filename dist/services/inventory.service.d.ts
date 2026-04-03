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
                id: string;
                status: import("../generated/prisma/enums").ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                slug: string;
                shopId: string;
                isFeatured: boolean;
                track: string | null;
                shortDescription: string | null;
                brandId: string | null;
                categoryId: string | null;
            };
            variantOptionValues: ({
                optionValue: {
                    id: string;
                    createdAt: Date;
                    value: string;
                    optionId: string;
                };
            } & {
                id: string;
                variantId: string;
                optionValueId: string;
            })[];
        } & {
            id: string;
            status: import("../generated/prisma/enums").ProductStatus;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            sku: string;
            productId: string;
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
        quantity: number;
        locationId: string;
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
        id: string;
        phone: string | null;
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
    quantity: number;
    locationId: string;
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
    quantity: number;
    locationId: string;
    variantId: string;
    reservedQuantity: number;
    reorderLevel: number | null;
}>;
export declare function getInventoryById(id: string): Promise<{
    movements: {
        type: import("../generated/prisma/enums").InventoryMovementType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        locationId: string;
        variantId: string;
        referenceId: string | null;
        inventoryId: string | null;
    }[];
    location: {
        name: string;
        id: string;
        phone: string | null;
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
        id: string;
        status: import("../generated/prisma/enums").ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        sku: string;
        productId: string;
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
    quantity: number;
    locationId: string;
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
            id: string;
            phone: string | null;
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
            id: string;
            status: import("../generated/prisma/enums").ProductStatus;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            sku: string;
            productId: string;
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
        quantity: number;
        locationId: string;
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
    type: import("../generated/prisma/enums").InventoryMovementType;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    quantity: number;
    locationId: string;
    variantId: string;
    referenceId: string | null;
    inventoryId: string | null;
}>;
//# sourceMappingURL=inventory.service.d.ts.map