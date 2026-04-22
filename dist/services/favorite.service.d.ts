export declare function listFavoriteIds(userId: string, shopId?: string): Promise<{
    productIds: string[];
}>;
export declare function listFavorites(userId: string, shopId: string | undefined, page: number, pageSize: number): Promise<{
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
                id: string;
                type: string;
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
        slug: string;
        shortDescription: string | null;
        brandId: string | null;
        categoryId: string | null;
        track: string | null;
        isFeatured: boolean;
    })[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}>;
export declare function addFavorite(userId: string, productId: string): Promise<{
    ok: boolean;
    productId: string;
}>;
export declare function removeFavorite(userId: string, productId: string): Promise<{
    ok: boolean;
    productId: string;
}>;
//# sourceMappingURL=favorite.service.d.ts.map