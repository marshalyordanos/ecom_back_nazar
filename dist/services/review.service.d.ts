export declare function listReviewsByProduct(productId: string, query: {
    page?: number;
    pageSize?: number;
    sort?: string;
    search?: string;
    filter?: string;
}): Promise<{
    data: ({
        user: {
            id: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        status: import("../generated/prisma/enums").ReviewStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string | null;
        productId: string;
        rating: number;
        comment: string | null;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function listReviews(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
    productId?: string;
}): Promise<{
    data: ({
        user: {
            email: string;
            id: string;
            firstName: string;
            lastName: string;
        };
        product: {
            name: string;
            id: string;
            slug: string;
        };
    } & {
        id: string;
        status: import("../generated/prisma/enums").ReviewStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string | null;
        productId: string;
        rating: number;
        comment: string | null;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getReviewById(id: string): Promise<{
    user: {
        email: string;
        id: string;
        firstName: string;
        lastName: string;
    };
    product: {
        name: string;
        id: string;
        slug: string;
    };
} & {
    id: string;
    status: import("../generated/prisma/enums").ReviewStatus;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    title: string | null;
    productId: string;
    rating: number;
    comment: string | null;
}>;
export declare function createReview(userId: string, productId: string, data: {
    rating: number;
    title?: string;
    comment?: string;
}): Promise<{
    id: string;
    status: import("../generated/prisma/enums").ReviewStatus;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    title: string | null;
    productId: string;
    rating: number;
    comment: string | null;
}>;
export declare function updateReview(id: string, userId: string, data: {
    rating?: number;
    title?: string;
    comment?: string;
}, isAdmin?: boolean): Promise<{
    id: string;
    status: import("../generated/prisma/enums").ReviewStatus;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    title: string | null;
    productId: string;
    rating: number;
    comment: string | null;
}>;
export declare function deleteReview(id: string, userId: string, isAdmin: boolean): Promise<{
    message: string;
}>;
//# sourceMappingURL=review.service.d.ts.map