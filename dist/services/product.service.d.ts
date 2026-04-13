export declare function listProducts(shopId: string | undefined, track?: string, query?: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}, req?: any): Promise<{
    data: ({
        brand: {
            name: string;
            id: string;
            slug: string;
        } | null;
        category: {
            name: string;
            id: string;
            image: string | null;
            slug: string;
            track: string | null;
        } | null;
        variants: ({
            media: {
                url: string;
                id: string;
                type: string;
<<<<<<< HEAD
                position: number | null;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
                variantId: string;
                position: number | null;
            }[];
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
        })[];
    } & {
        name: string;
        status: import("../generated/prisma/enums").ProductStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        shopId: string;
<<<<<<< HEAD
        isFeatured: boolean;
        track: string | null;
=======
        slug: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        shortDescription: string | null;
        brandId: string | null;
        categoryId: string | null;
        track: string | null;
        isFeatured: boolean;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getProductById(id: string, shopId?: string): Promise<{
    shop: {
        name: string;
        id: string;
        slug: string;
    };
    brand: {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        logoUrl: string | null;
        isFeatured: boolean;
    } | null;
    category: {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        image: string | null;
        slug: string;
        track: string | null;
        parentId: string | null;
        track: string | null;
    } | null;
    variants: ({
        inventories: ({
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
        })[];
        media: {
            url: string;
            id: string;
            type: string;
<<<<<<< HEAD
            position: number | null;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
            variantId: string;
            position: number | null;
        }[];
        variantOptionValues: ({
            optionValue: {
                option: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
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
    })[];
} & {
    name: string;
    status: import("../generated/prisma/enums").ProductStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    shopId: string;
<<<<<<< HEAD
    isFeatured: boolean;
    track: string | null;
=======
    slug: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    shortDescription: string | null;
    brandId: string | null;
    categoryId: string | null;
    track: string | null;
    isFeatured: boolean;
}>;
export declare function getProductByIdMobile(id: string, shopId?: string, userId?: string, sessionId?: string): Promise<{
    shop: {
        name: string;
        id: string;
        slug: string;
    };
    brand: {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        logoUrl: string | null;
        isFeatured: boolean;
    } | null;
    category: {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        image: string | null;
        slug: string;
        track: string | null;
        parentId: string | null;
        track: string | null;
    } | null;
    variants: ({
        inventories: ({
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
        })[];
        media: {
            url: string;
            id: string;
            type: string;
<<<<<<< HEAD
            position: number | null;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
            variantId: string;
            position: number | null;
        }[];
        variantOptionValues: ({
            optionValue: {
                option: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
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
    })[];
} & {
    name: string;
    status: import("../generated/prisma/enums").ProductStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    shopId: string;
<<<<<<< HEAD
    isFeatured: boolean;
    track: string | null;
=======
    slug: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    shortDescription: string | null;
    brandId: string | null;
    categoryId: string | null;
    track: string | null;
    isFeatured: boolean;
}>;
export declare function createProduct(shopId: string, data: {
    name: string;
    slug: string;
    description?: string;
    shortDescription?: string;
    brandId?: string;
    categoryId?: string;
    isFeatured?: boolean;
    status: string;
}): Promise<{
    name: string;
    status: import("../generated/prisma/enums").ProductStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    shopId: string;
<<<<<<< HEAD
    isFeatured: boolean;
    track: string | null;
=======
    slug: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    shortDescription: string | null;
    brandId: string | null;
    categoryId: string | null;
    track: string | null;
    isFeatured: boolean;
}>;
export declare function updateProduct(id: string, shopId: string, data: {
    name?: string;
    slug?: string;
    description?: string;
    shortDescription?: string;
    brandId?: string;
    categoryId?: string;
    isFeatured?: boolean;
    status?: string;
}): Promise<{
    name: string;
    status: import("../generated/prisma/enums").ProductStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    shopId: string;
<<<<<<< HEAD
    isFeatured: boolean;
    track: string | null;
=======
    slug: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    shortDescription: string | null;
    brandId: string | null;
    categoryId: string | null;
    track: string | null;
    isFeatured: boolean;
}>;
export declare function deleteProduct(id: string, _shopId?: string): Promise<{
    message: string;
}>;
export declare function listVariants(shopId?: string, query?: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}): Promise<{
    data: ({
        inventories: {
            id: string;
            locationId: string;
            createdAt: Date;
            updatedAt: Date;
            variantId: string;
            quantity: number;
            reservedQuantity: number;
            reorderLevel: number | null;
        }[];
        product: {
            name: string;
            id: string;
            slug: string;
            brand: {
                name: string;
                id: string;
                slug: string;
            } | null;
            category: {
                name: string;
                id: string;
                slug: string;
            } | null;
        };
        media: {
            url: string;
            id: string;
            type: string;
            variantId: string;
            position: number | null;
        }[];
        variantOptionValues: ({
            optionValue: {
                option: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
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
        price: number;
        productId: string;
        sku: string;
        barcode: string | null;
        comparePrice: number | null;
        costPrice: number | null;
        weight: number | null;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getFeaturedProducts(shopId?: string, limit?: number): Promise<({
    brand: {
        name: string;
        id: string;
        slug: string;
    } | null;
    category: {
        name: string;
        id: string;
        slug: string;
    } | null;
    variants: ({
        media: {
            url: string;
            id: string;
            type: string;
<<<<<<< HEAD
            position: number | null;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
            variantId: string;
            position: number | null;
        }[];
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
    })[];
} & {
    name: string;
    status: import("../generated/prisma/enums").ProductStatus;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    shopId: string;
<<<<<<< HEAD
    isFeatured: boolean;
    track: string | null;
=======
    slug: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    shortDescription: string | null;
    brandId: string | null;
    categoryId: string | null;
    track: string | null;
    isFeatured: boolean;
})[]>;
<<<<<<< HEAD
export declare function getVariantById(id: string): Promise<({
    inventories: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        locationId: string;
        quantity: number;
        variantId: string;
=======
export declare function getNewProducts(shopId?: string, limit?: number): Promise<({
    brand: {
        name: string;
        id: string;
        slug: string;
    } | null;
    category: {
        name: string;
        id: string;
        slug: string;
    } | null;
    variants: ({
        media: {
            url: string;
            id: string;
            type: string;
            variantId: string;
            position: number | null;
        }[];
    } & {
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
    })[];
} & {
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
})[]>;
export declare function getPopularProducts(shopId?: string, limit?: number): Promise<(({
    brand: {
        name: string;
        id: string;
        slug: string;
    } | null;
    category: {
        name: string;
        id: string;
        slug: string;
    } | null;
    variants: ({
        media: {
            url: string;
            id: string;
            type: string;
            variantId: string;
            position: number | null;
        }[];
    } & {
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
    })[];
} & {
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
}) | undefined)[]>;
export declare function getMostViewedProducts(shopId?: string, limit?: number): Promise<(({
    brand: {
        name: string;
        id: string;
        slug: string;
    } | null;
    category: {
        name: string;
        id: string;
        slug: string;
    } | null;
    variants: ({
        media: {
            url: string;
            id: string;
            type: string;
            variantId: string;
            position: number | null;
        }[];
    } & {
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
    })[];
} & {
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
}) | undefined)[]>;
export declare function getVariantById(id: string): Promise<({
    inventories: {
        id: string;
        locationId: string;
        createdAt: Date;
        updatedAt: Date;
        variantId: string;
        quantity: number;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        reservedQuantity: number;
        reorderLevel: number | null;
    }[];
    media: {
        url: string;
        id: string;
        type: string;
<<<<<<< HEAD
        position: number | null;
        variantId: string;
=======
        variantId: string;
        position: number | null;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    }[];
    variantOptionValues: ({
        optionValue: {
            option: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
<<<<<<< HEAD
=======
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
}) | null>;
export declare function createVariant(productId: string, data: {
    sku: string;
    barcode?: string;
    price: number;
    comparePrice?: number;
    costPrice?: number;
    weight?: number;
    status: string;
    locationId: string;
    type: string;
    quantity: number;
}, file?: any): Promise<({
    inventories: {
        id: string;
        locationId: string;
        createdAt: Date;
        updatedAt: Date;
        variantId: string;
        quantity: number;
        reservedQuantity: number;
        reorderLevel: number | null;
    }[];
} & {
    id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
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
}) | null>;
<<<<<<< HEAD
export declare function createVariant(productId: string, data: {
    sku: string;
    barcode?: string;
    price: number;
    comparePrice?: number;
    costPrice?: number;
    weight?: number;
    status: string;
    locationId: string;
    type: string;
    quantity: number;
}, file?: any): Promise<({
    inventories: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        locationId: string;
        quantity: number;
        variantId: string;
        reservedQuantity: number;
        reorderLevel: number | null;
    }[];
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
}) | null>;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
export declare function updateVariant(variantId: string, data: {
    sku?: string;
    barcode?: string;
    price?: number;
    comparePrice?: number;
    costPrice?: number;
    weight?: number;
    status?: string;
    image?: string;
}, file?: any): Promise<{
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
}>;
export declare function deleteVariant(variantId: string): Promise<{
    message: string;
}>;
export declare function addVariantMedia(variantId: string, url: string, type: string, position?: number): Promise<{
    url: string;
    id: string;
    type: string;
<<<<<<< HEAD
    position: number | null;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    variantId: string;
    position: number | null;
}>;
export declare function removeVariantMedia(mediaId: string): Promise<{
    message: string;
}>;
export declare function listVariantOptions(): Promise<({
    values: {
        id: string;
        createdAt: Date;
        value: string;
        optionId: string;
    }[];
} & {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare function getVariantOptionById(optionId: string): Promise<{
    values: {
        id: string;
        createdAt: Date;
        value: string;
        optionId: string;
    }[];
} & {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function createVariantOption(data: {
    name: string;
}): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateVariantOption(optionId: string, data: {
    name?: string;
}): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteVariantOption(optionId: string): Promise<{
    message: string;
}>;
export declare function listOptionValues(optionId: string): Promise<{
    id: string;
    createdAt: Date;
    value: string;
    optionId: string;
}[]>;
export declare function getOptionValueById(valueId: string): Promise<{
    option: {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    id: string;
    createdAt: Date;
    value: string;
    optionId: string;
}>;
export declare function createOptionValue(optionId: string, data: {
    value: string;
}): Promise<{
    id: string;
    createdAt: Date;
    value: string;
    optionId: string;
}>;
export declare function updateOptionValue(valueId: string, data: {
    value?: string;
}): Promise<{
    id: string;
    createdAt: Date;
    value: string;
    optionId: string;
}>;
export declare function deleteOptionValue(valueId: string): Promise<{
    message: string;
}>;
/**
 * Assigns option values (array of optionValueIds) to the given variantId.
 * This will add any new values and remove any values not present in the array.
 */
export declare function setVariantOptionValues(variantId: string, optionValueIds: string[]): Promise<({
    variantOptionValues: ({
        optionValue: {
            option: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
}) | null>;
/**
 * Remove a particular optionValue from the variant.
 */
export declare function removeVariantOptionValue(variantId: string, optionValueId: string): Promise<{
    message: string;
}>;
/**
 * Add/Assign a particular optionValue to a variant (idempotent).
 */
export declare function assignVariantOptionValue(variantId: string, optionValueId: string): Promise<{
    id: string;
    variantId: string;
    optionValueId: string;
}>;
//# sourceMappingURL=product.service.d.ts.map