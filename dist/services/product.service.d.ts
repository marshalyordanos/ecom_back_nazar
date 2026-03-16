export declare function listProducts(shopId: string | undefined, query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}): Promise<{
    data: ({
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
                type: string;
                id: string;
                position: number | null;
                variantId: string;
            }[];
        } & {
            id: string;
            status: import("../generated/prisma/enums").ProductStatus;
            createdAt: Date;
            updatedAt: Date;
            productId: string;
            sku: string;
            barcode: string | null;
            price: number;
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
        slug: string;
        shopId: string;
        isFeatured: boolean;
        shortDescription: string | null;
        brandId: string | null;
        categoryId: string | null;
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
        slug: string;
        parentId: string | null;
    } | null;
    variants: ({
        inventories: ({
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
            updatedAt: Date;
            locationId: string;
            variantId: string;
            quantity: number;
            reservedQuantity: number;
            reorderLevel: number | null;
        })[];
        media: {
            url: string;
            type: string;
            id: string;
            position: number | null;
            variantId: string;
        }[];
    } & {
        id: string;
        status: import("../generated/prisma/enums").ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        sku: string;
        barcode: string | null;
        price: number;
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
    slug: string;
    shopId: string;
    isFeatured: boolean;
    shortDescription: string | null;
    brandId: string | null;
    categoryId: string | null;
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
    id: string;
    status: import("../generated/prisma/enums").ProductStatus;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    slug: string;
    shopId: string;
    isFeatured: boolean;
    shortDescription: string | null;
    brandId: string | null;
    categoryId: string | null;
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
    id: string;
    status: import("../generated/prisma/enums").ProductStatus;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    slug: string;
    shopId: string;
    isFeatured: boolean;
    shortDescription: string | null;
    brandId: string | null;
    categoryId: string | null;
}>;
export declare function deleteProduct(id: string, _shopId?: string): Promise<{
    message: string;
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
            type: string;
            id: string;
            position: number | null;
            variantId: string;
        }[];
    } & {
        id: string;
        status: import("../generated/prisma/enums").ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        sku: string;
        barcode: string | null;
        price: number;
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
    slug: string;
    shopId: string;
    isFeatured: boolean;
    shortDescription: string | null;
    brandId: string | null;
    categoryId: string | null;
})[]>;
export declare function createVariant(productId: string, data: {
    sku: string;
    barcode?: string;
    price: number;
    comparePrice?: number;
    costPrice?: number;
    weight?: number;
    status: string;
}): Promise<{
    id: string;
    status: import("../generated/prisma/enums").ProductStatus;
    createdAt: Date;
    updatedAt: Date;
    productId: string;
    sku: string;
    barcode: string | null;
    price: number;
    comparePrice: number | null;
    costPrice: number | null;
    weight: number | null;
}>;
export declare function updateVariant(variantId: string, data: {
    sku?: string;
    barcode?: string;
    price?: number;
    comparePrice?: number;
    costPrice?: number;
    weight?: number;
    status?: string;
}): Promise<{
    id: string;
    status: import("../generated/prisma/enums").ProductStatus;
    createdAt: Date;
    updatedAt: Date;
    productId: string;
    sku: string;
    barcode: string | null;
    price: number;
    comparePrice: number | null;
    costPrice: number | null;
    weight: number | null;
}>;
export declare function deleteVariant(variantId: string): Promise<{
    message: string;
}>;
export declare function addVariantMedia(variantId: string, url: string, type: string, position?: number): Promise<{
    url: string;
    type: string;
    id: string;
    position: number | null;
    variantId: string;
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
//# sourceMappingURL=product.service.d.ts.map