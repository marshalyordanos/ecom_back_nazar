export declare function listCategories(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}): Promise<{
    data: ({
        parent: {
            name: string;
            id: string;
            slug: string;
        } | null;
        children: {
            name: string;
            id: string;
            slug: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        parentId: string | null;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
/** Get categories as a tree (root categories with nested children). */
export declare function listCategoriesTree(): Promise<({
    children: ({
        children: {
            name: string;
            id: string;
            createdAt: Date;
            description: string | null;
            slug: string;
            parentId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        parentId: string | null;
    })[];
} & {
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    slug: string;
    parentId: string | null;
})[]>;
export declare function getCategoryById(id: string): Promise<{
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
        shortDescription: string | null;
        brandId: string | null;
        categoryId: string | null;
    }[];
    parent: {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        parentId: string | null;
    } | null;
    children: {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        slug: string;
        parentId: string | null;
    }[];
} & {
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    slug: string;
    parentId: string | null;
}>;
export declare function createCategory(data: {
    name: string;
    slug: string;
    description?: string;
    parentId?: string;
}): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    slug: string;
    parentId: string | null;
}>;
export declare function updateCategory(id: string, data: {
    name?: string;
    slug?: string;
    description?: string;
    parentId?: string;
}): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    slug: string;
    parentId: string | null;
}>;
export declare function deleteCategory(id: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=category.service.d.ts.map