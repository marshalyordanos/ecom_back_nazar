export declare function listBrands(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}): Promise<{
    data: {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        logoUrl: string | null;
        isFeatured: boolean;
    }[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getBrandById(id: string): Promise<{
    products: {
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
    }[];
} & {
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    slug: string;
    logoUrl: string | null;
    isFeatured: boolean;
}>;
export declare function createBrand(data: {
    name: string;
    slug: string;
    logoUrl?: string;
    description?: string;
    isFeatured?: boolean;
}, file: any): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    slug: string;
    logoUrl: string | null;
    isFeatured: boolean;
}>;
export declare function updateBrand(id: string, data: {
    name?: string;
    slug?: string;
    logoUrl?: string;
    description?: string;
    isFeatured?: boolean;
}, file: any): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    slug: string;
    logoUrl: string | null;
    isFeatured: boolean;
}>;
export declare function deleteBrand(id: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=brand.service.d.ts.map