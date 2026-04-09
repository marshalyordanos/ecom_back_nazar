export declare function adminRegister(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}): Promise<{
    user: {
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        status: import("../generated/prisma/enums").UserStatus;
        createdAt: Date;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}>;
export declare function register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}): Promise<{
    user: {
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        status: import("../generated/prisma/enums").UserStatus;
        createdAt: Date;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}>;
export declare function login(emailPhone: string, password: string): Promise<{
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        isSuperAdmin: boolean;
        roles: string[];
        permissions: import("./rbacPermission.service").MergedPermissionRow[];
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}>;
export declare function logout(refreshToken: string | undefined): Promise<{
    message: string;
}>;
export declare function refresh(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        isSuperAdmin: boolean;
        roles: string[];
        permissions: import("./rbacPermission.service").MergedPermissionRow[];
    };
}>;
export declare function forgotPassword(email: string): Promise<{
    message: string;
}>;
export declare function resetPassword(token: string, newPassword: string): Promise<{
    message: string;
}>;
export declare function changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map