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
<<<<<<< HEAD
=======
        id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        status: import("../generated/prisma/enums").ReviewStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
<<<<<<< HEAD
        title: string | null;
        productId: string;
        comment: string | null;
        rating: number;
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
            email: string | null;
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
        status: import("../generated/prisma/enums").ReviewStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
=======
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
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
        email: string | null;
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
<<<<<<< HEAD
=======
    id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    status: import("../generated/prisma/enums").ReviewStatus;
    id: string;
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
<<<<<<< HEAD
=======
    id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    status: import("../generated/prisma/enums").ReviewStatus;
    id: string;
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
<<<<<<< HEAD
=======
    id: string;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
    status: import("../generated/prisma/enums").ReviewStatus;
    id: string;
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