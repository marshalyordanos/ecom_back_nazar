export declare function getMe(userId: string): Promise<{
    email: string;
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    status: import("../generated/prisma/enums").UserStatus;
    emailVerifiedAt: Date | null;
    phoneVerifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    roles: {
        name: string;
        id: string;
        description: string | null;
    }[];
}>;
export declare function updateMe(userId: string, data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatarUrl?: string;
}): Promise<{
    email: string;
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    status: import("../generated/prisma/enums").UserStatus;
    createdAt: Date;
    updatedAt: Date;
    roles: {
        name: string;
    }[];
}>;
export declare function updatePassword(userId: string, newPassword: string): Promise<{
    message: string;
}>;
export declare function getById(id: string): Promise<{
    roles: {
        name: string;
        id: string;
    }[];
    email: string;
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    isSuperAdmin: boolean;
    status: import("../generated/prisma/enums").UserStatus;
    emailVerifiedAt: Date | null;
    phoneVerifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function listUsers(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}, onlyUsers?: boolean): Promise<{
    data: {
        email: string;
        id: string;
        phone: string;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
        status: import("../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
        roles: {
            name: string;
        }[];
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
}): Promise<{
    roles: {
        name: string;
        id: string;
    }[];
    email: string;
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    isSuperAdmin: boolean;
    status: import("../generated/prisma/enums").UserStatus;
    emailVerifiedAt: Date | null;
    phoneVerifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deactivateUser(id: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=user.service.d.ts.map