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
        image: string | null;
        slug: string;
        track: string | null;
        parentId: string | null;
        track: string | null;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
/** Get categories as a tree (root categories with nested children). */
/**
 * Returns product categories as a tree, each category includes:
 * - totalSalesAmount: Total money sales for the category and all its descendants.
 * - totalProductsSold: Total quantity of products sold for the category and all its descendants.
 */
type CategoryNode = {
    id: string;
    parentId: string | null;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    track: string;
    children?: CategoryNode[];
    totalSalesAmount: number;
    totalProductsSold: number;
};
/** Get categories as a tree (root categories with nested children). */
export declare function listCategoriesTree2(): Promise<({
    children: ({
        children: {
            name: string;
            id: string;
            createdAt: Date;
            description: string | null;
            image: string | null;
            slug: string;
            track: string | null;
            parentId: string | null;
            track: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        image: string | null;
        slug: string;
        track: string | null;
        parentId: string | null;
        track: string | null;
    })[];
} & {
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    image: string | null;
    slug: string;
    track: string | null;
    parentId: string | null;
    track: string | null;
})[]>;
export declare function listCategoriesTree(): Promise<(CategoryNode & {
    totalProducts: number;
    children?: (CategoryNode & /*elided*/ any)[];
})[]>;
export declare function listCategoriesTree(): Promise<(CategoryNode & {
    totalProducts: number;
    children?: (CategoryNode & /*elided*/ any)[];
})[]>;
export declare function getCategoryById(id: string): Promise<{
    products: {
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
    }[];
    parent: {
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
    children: {
        name: string;
        id: string;
        createdAt: Date;
        description: string | null;
        image: string | null;
        slug: string;
        track: string | null;
        parentId: string | null;
        track: string | null;
    }[];
} & {
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    image: string | null;
    slug: string;
    track: string | null;
    parentId: string | null;
    track: string | null;
}>;
export declare function createCategory(data: {
    name: string;
    slug: string;
    description?: string;
    parentId?: string;
    track?: string;
}, file: any): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    image: string | null;
    slug: string;
    track: string | null;
    parentId: string | null;
    track: string | null;
}>;
export declare function updateCategory(id: string, data: {
    name?: string;
    slug?: string;
    description?: string;
    parentId?: string;
    image?: string;
    track?: string;
}, file: any): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    description: string | null;
    image: string | null;
    slug: string;
    track: string | null;
    parentId: string | null;
    track: string | null;
}>;
export declare function deleteCategory(id: string): Promise<{
    message: string;
}>;
export {};
//# sourceMappingURL=category.service.d.ts.map