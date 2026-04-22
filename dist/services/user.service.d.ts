export declare function getMe(userId: string): Promise<{
    email: string | null;
    status: import("../generated/prisma/enums").UserStatus;
    roles: {
        name: string;
        id: string;
        description: string | null;
    }[];
    id: string;
    phone: string | null;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    emailVerifiedAt: Date | null;
    phoneVerifiedAt: Date | null;
    locationId: string | null;
    createdAt: Date;
    updatedAt: Date;
    location: {
        name: string;
        id: string;
        shopId: string;
    } | null;
}>;
export declare function updateMe(userId: string, data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatarUrl?: string;
}, file?: Express.Multer.File): Promise<{
    email: string | null;
    status: import("../generated/prisma/enums").UserStatus;
    roles: {
        name: string;
    }[];
    id: string;
    phone: string | null;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updatePassword(userId: string, newPassword: string): Promise<{
    message: string;
}>;
export declare function getById(id: string): Promise<{
    roles: {
        name: string;
        id: string;
    }[];
    email: string | null;
    status: import("../generated/prisma/enums").UserStatus;
    id: string;
    phone: string | null;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    isSuperAdmin: boolean;
    emailVerifiedAt: Date | null;
    phoneVerifiedAt: Date | null;
    locationId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function listUsers(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
    roleId?: string;
}, onlyUsers?: boolean): Promise<{
    data: {
        email: string | null;
        status: import("../generated/prisma/enums").UserStatus;
        roles: {
            name: string;
            id: string;
        }[];
        id: string;
        phone: string | null;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
        locationId: string | null;
        createdAt: Date;
        updatedAt: Date;
        location: {
            name: string;
            id: string;
            shopId: string;
        } | null;
    }[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function updateUser(id: string, data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    status?: string;
    avatarUrl?: string;
    roleIds?: string[];
    locationId?: string | null;
}): Promise<{
    roles: {
        name: string;
        id: string;
    }[];
    location: {
        name: string;
        id: string;
        shopId: string;
    } | null;
    email: string | null;
    status: import("../generated/prisma/enums").UserStatus;
    id: string;
    phone: string | null;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    isSuperAdmin: boolean;
    emailVerifiedAt: Date | null;
    phoneVerifiedAt: Date | null;
    locationId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deactivateUser(id: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=user.service.d.ts.map