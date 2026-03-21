"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegister = adminRegister;
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.refresh = refresh;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.changePassword = changePassword;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const tokens_1 = require("../config/tokens");
const prisma_1 = require("../lib/prisma");
const hash_1 = require("../utils/hash");
const appError_1 = __importDefault(require("../utils/appError"));
const email_1 = require("../utils/email");
const accessExpirationMinutes = parseInt(config_1.default.jwt.accessExpirationMinutes, 10) || 60;
const refreshExpirationDays = parseInt(config_1.default.jwt.refreshExpirationDays, 10) || 60;
function generateAccessToken(userId, email) {
    return jsonwebtoken_1.default.sign({ userId, email, type: tokens_1.tokenTypes.ACCESS }, config_1.default.jwt.secret, { expiresIn: `${accessExpirationMinutes}m` });
}
function generateRefreshToken() {
    return crypto_1.default.randomBytes(32).toString("hex");
}
function generateResetToken() {
    return crypto_1.default.randomBytes(32).toString("hex");
}
async function adminRegister(data) {
    if (!data.phone) {
        throw new appError_1.default("Phone is required", 400);
    }
    const passwordHash = await (0, hash_1.hashPassword)(data.password);
    const user = await prisma_1.prisma.user.create({
        data: {
            email: data.email,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            isSuperAdmin: true,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            status: true,
            createdAt: true,
        },
    });
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken();
    await prisma_1.prisma.token.create({
        data: {
            userId: user.id,
            token: refreshToken,
            type: tokens_1.tokenTypes.REFRESH,
            expiresAt: new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000),
        },
    });
    return {
        user,
        accessToken,
        refreshToken,
        expiresIn: accessExpirationMinutes * 60,
    };
}
async function register(data) {
    if (!data.phone) {
        throw new appError_1.default("Phone is required", 400);
    }
    const existing = await prisma_1.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
        throw new appError_1.default("Email already registered", 409);
    }
    const passwordHash = await (0, hash_1.hashPassword)(data.password);
    const defaultRole = await prisma_1.prisma.role.findFirst({ where: { name: "user" } });
    if (!defaultRole) {
        throw new appError_1.default("Default role 'user' not found. Run seed.", 500);
    }
    const user = await prisma_1.prisma.user.create({
        data: {
            email: data.email,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            isSuperAdmin: false,
            roles: { connect: [{ id: defaultRole.id }] },
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            status: true,
            createdAt: true,
        },
    });
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken();
    await prisma_1.prisma.token.create({
        data: {
            userId: user.id,
            token: refreshToken,
            type: tokens_1.tokenTypes.REFRESH,
            expiresAt: new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000),
        },
    });
    return {
        user,
        accessToken,
        refreshToken,
        expiresIn: accessExpirationMinutes * 60,
    };
}
async function login(emailPhone, password) {
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            OR: [{ email: emailPhone }, { phone: emailPhone }],
        },
        include: { roles: { select: { name: true } } },
    });
    if (!user || !(await (0, hash_1.comparePassword)(password, user.passwordHash))) {
        throw new appError_1.default("Invalid email/phone or password", 401);
    }
    if (user.status !== "ACTIVE") {
        throw new appError_1.default("Account is inactive or suspended", 401);
    }
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken();
    await prisma_1.prisma.token.create({
        data: {
            userId: user.id,
            token: refreshToken,
            type: tokens_1.tokenTypes.REFRESH,
            expiresAt: new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000),
        },
    });
    return {
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles.map((r) => r.name),
        },
        accessToken,
        refreshToken,
        expiresIn: accessExpirationMinutes * 60,
    };
}
async function logout(refreshToken) {
    if (refreshToken) {
        await prisma_1.prisma.token.deleteMany({
            where: { token: refreshToken, type: tokens_1.tokenTypes.REFRESH },
        });
    }
    return { message: "Logged out successfully" };
}
async function refresh(refreshToken) {
    const tokenRecord = await prisma_1.prisma.token.findFirst({
        where: { token: refreshToken, type: tokens_1.tokenTypes.REFRESH },
        include: { user: true },
    });
    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
        throw new appError_1.default("Invalid or expired refresh token", 401);
    }
    if (tokenRecord.user.status !== "ACTIVE") {
        throw new appError_1.default("Account is inactive", 401);
    }
    await prisma_1.prisma.token.delete({ where: { id: tokenRecord.id } });
    const newAccessToken = generateAccessToken(tokenRecord.user.id, tokenRecord.user.email);
    const newRefreshToken = generateRefreshToken();
    await prisma_1.prisma.token.create({
        data: {
            userId: tokenRecord.userId,
            token: newRefreshToken,
            type: tokens_1.tokenTypes.REFRESH,
            expiresAt: new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000),
        },
    });
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: accessExpirationMinutes * 60,
    };
}
async function forgotPassword(email) {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        return { message: "If the email exists, a reset link has been sent." };
    }
    const resetToken = generateResetToken();
    await prisma_1.prisma.token.create({
        data: {
            userId: user.id,
            token: resetToken,
            type: tokens_1.tokenTypes.RESET_PASSWORD,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        },
    });
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
    await (0, email_1.sendEmail)({
        to: user.email,
        subject: "Password reset",
        text: `Use this link to reset your password: ${resetUrl}. It expires in 1 hour.`,
    });
    return { message: "If the email exists, a reset link has been sent." };
}
async function resetPassword(token, newPassword) {
    const tokenRecord = await prisma_1.prisma.token.findFirst({
        where: { token, type: tokens_1.tokenTypes.RESET_PASSWORD },
        include: { user: true },
    });
    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
        throw new appError_1.default("Invalid or expired reset token", 400);
    }
    const passwordHash = await (0, hash_1.hashPassword)(newPassword);
    await prisma_1.prisma.$transaction([
        prisma_1.prisma.user.update({
            where: { id: tokenRecord.userId },
            data: { passwordHash },
        }),
        prisma_1.prisma.token.delete({ where: { id: tokenRecord.id } }),
    ]);
    return { message: "Password reset successfully" };
}
async function changePassword(userId, currentPassword, newPassword) {
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new appError_1.default("User not found", 404);
    const valid = await (0, hash_1.comparePassword)(currentPassword, user.passwordHash);
    if (!valid)
        throw new appError_1.default("Current password is incorrect", 401);
    const passwordHash = await (0, hash_1.hashPassword)(newPassword);
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { passwordHash },
    });
    return { message: "Password updated successfully" };
}
//# sourceMappingURL=auth.service.js.map