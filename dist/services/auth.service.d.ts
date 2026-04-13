export declare function adminRegister(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}): Promise<{
    user: {
        email: string | null;
        status: import("../generated/prisma/enums").UserStatus;
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}>;
/**
 * Bulk-purge INACTIVE accounts older than `maxAgeMs`.
 * Called by the background cleanup job as a safety net.
 */
export declare function purgeStaleInactiveAccounts(maxAgeMs?: number): Promise<number>;
export declare function register(data: {
    email?: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}): Promise<{
    user: {
        email: string | null;
        status: import("../generated/prisma/enums").UserStatus;
        id: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
    };
    message: string;
    verificationRequired: boolean;
}>;
export declare function login(emailPhone: string, password: string): Promise<{
    user: {
        id: string;
        email: string | null;
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
export declare function sendVerificationOtp(input: {
    email?: string;
    phone?: string;
    otpType: string;
}): Promise<{
    message: string;
}>;
export declare function resendVerificationOtp(input: {
    email?: string;
    phone?: string;
    otpType: string;
}): Promise<{
    message: string;
}>;
export declare function verifyAccount(input: {
    email?: string;
    phone?: string;
    otpType: string;
    otpCode: string;
}): Promise<{
    message: string;
    user: {
        id: string;
        email: string | null;
        firstName: string;
        lastName: string;
        roles: string[];
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}>;
export declare function requestPasswordReset(input: {
    email?: string;
    phone?: string;
    otpType: string;
}): Promise<{
    message: string;
}>;
export declare function resendResetOtp(input: {
    email?: string;
    phone?: string;
    otpType: string;
}): Promise<{
    message: string;
}>;
export declare function verifyResetOtp(input: {
    email?: string;
    phone?: string;
    otpType: string;
    otpCode: string;
}): Promise<{
    message: string;
    resetToken: string;
    expiresIn: number;
}>;
export declare function changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map