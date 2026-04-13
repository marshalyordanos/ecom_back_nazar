export type InventoryScopeUser = {
    isSuperAdmin: boolean;
    locationId?: string | null;
};
export declare function listInventory(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}, user: InventoryScopeUser): Promise<{
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
                id: string;
                status: import("../generated/prisma/enums").ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                shopId: string;
                slug: string;
                shortDescription: string | null;
                brandId: string | null;
                categoryId: string | null;
                track: string | null;
                isFeatured: boolean;
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
            status: import("../generated/prisma/enums").ProductStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            price: number;
            productId: string;
            sku: string;
            barcode: string | null;
            comparePrice: number | null;
            costPrice: number | null;
            weight: number | null;
        };
    } & {
        id: string;
        locationId: string;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        locationId: string;
=======
        variantId: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
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
export declare function getInventoryByVariantId(variantId: string, user: InventoryScopeUser): Promise<({
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
    locationId: string;
    createdAt: Date;
    updatedAt: Date;
<<<<<<< HEAD
    locationId: string;
=======
    variantId: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    quantity: number;
    variantId: string;
    reservedQuantity: number;
    reorderLevel: number | null;
})[]>;
export declare function updateInventoryQuantity(variantId: string, locationId: string, data: {
    quantity?: number;
    reservedQuantity?: number;
    reorderLevel?: number;
}, user: InventoryScopeUser): Promise<{
    id: string;
    locationId: string;
    createdAt: Date;
    updatedAt: Date;
    variantId: string;
    quantity: number;
    reservedQuantity: number;
    reorderLevel: number | null;
}>;
export declare function getInventoryById(id: string, user: InventoryScopeUser): Promise<{
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
    movements: {
        id: string;
        locationId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("../generated/prisma/enums").InventoryMovementType;
        variantId: string;
        quantity: number;
        inventoryId: string | null;
        referenceId: string | null;
    }[];
    variant: {
        id: string;
        status: import("../generated/prisma/enums").ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        price: number;
        productId: string;
        sku: string;
        barcode: string | null;
        comparePrice: number | null;
        costPrice: number | null;
        weight: number | null;
    };
} & {
    id: string;
    locationId: string;
<<<<<<< HEAD
=======
    createdAt: Date;
    updatedAt: Date;
    variantId: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
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
    search?: string;
}, user: InventoryScopeUser): Promise<{
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
            price: number;
            productId: string;
            sku: string;
            barcode: string | null;
            comparePrice: number | null;
            costPrice: number | null;
            weight: number | null;
        };
    } & {
        id: string;
        locationId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("../generated/prisma/enums").InventoryMovementType;
<<<<<<< HEAD
        locationId: string;
=======
        variantId: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
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
<<<<<<< HEAD
}): Promise<{
=======
}, user: InventoryScopeUser): Promise<{
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    id: string;
    locationId: string;
    createdAt: Date;
    updatedAt: Date;
    type: import("../generated/prisma/enums").InventoryMovementType;
<<<<<<< HEAD
    locationId: string;
=======
    variantId: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    quantity: number;
    variantId: string;
    referenceId: string | null;
    inventoryId: string | null;
}>;
//# sourceMappingURL=inventory.service.d.ts.map