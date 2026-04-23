"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegister = adminRegister;
exports.purgeStaleInactiveAccounts = purgeStaleInactiveAccounts;
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.refresh = refresh;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.sendVerificationOtp = sendVerificationOtp;
exports.resendVerificationOtp = resendVerificationOtp;
exports.verifyAccount = verifyAccount;
exports.requestPasswordReset = requestPasswordReset;
exports.resendResetOtp = resendResetOtp;
exports.verifyResetOtp = verifyResetOtp;
exports.changePassword = changePassword;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const tokens_1 = require("../config/tokens");
const prisma_1 = require("../lib/prisma");
const hash_1 = require("../utils/hash");
const appError_1 = __importDefault(require("../utils/appError"));
const sms_service_1 = require("./sms.service");
const email_service_1 = require("./email.service");
const otp_service_1 = require("./otp.service");
const rbacPermission_service_1 = require("./rbacPermission.service");
const accessExpirationMinutes = parseInt(config_1.default.jwt.accessExpirationMinutes, 10) || 60;
const refreshExpirationDays = parseInt(config_1.default.jwt.refreshExpirationDays, 10) || 60;
const resetTokenExpirationMinutes = 15;
const INACTIVE_ACCOUNT_GRACE_MS = parseInt(process.env.INACTIVE_GRACE_MINUTES ?? "60", 10) * 60 * 1000;
const OTP_TYPE_EMAIL = "email";
const OTP_TYPE_PHONE = "phone";
const OTP_PURPOSE_ACCOUNT_VERIFICATION = "account_verification";
const OTP_PURPOSE_PASSWORD_RESET = "password_reset";
function normalizeOtpType(otpType) {
    const normalized = `${otpType || ""}`.trim().toLowerCase();
    if (normalized !== OTP_TYPE_EMAIL && normalized !== OTP_TYPE_PHONE) {
        throw new appError_1.default("otpType must be either 'email' or 'phone'", 400);
    }
    return normalized;
}
function requireOtpCode(otpCode) {
    const code = `${otpCode || ""}`.trim();
    if (!code)
        throw new appError_1.default("OTP code is required", 400);
    return code;
}
function resolveChannelValue(input) {
    if (input.otpType === OTP_TYPE_EMAIL) {
        const email = `${input.email || ""}`.trim().toLowerCase();
        if (!email)
            throw new appError_1.default("Email is required for otpType=email", 400);
        return email;
    }
    const phone = `${input.phone || ""}`.trim();
    if (!phone)
        throw new appError_1.default("Phone is required for otpType=phone", 400);
    return phone;
}
async function findUserByChannel(otpType, channelValue) {
    if (otpType === OTP_TYPE_EMAIL) {
        return prisma_1.prisma.user.findUnique({ where: { email: channelValue } });
    }
    return prisma_1.prisma.user.findUnique({ where: { phone: channelValue } });
}
function ensureCooldownAllowed(otpCooldownUntil) {
    if (otpCooldownUntil && otpCooldownUntil > new Date()) {
        throw new appError_1.default("Please wait before requesting another OTP", 429);
    }
}
async function issueAndPersistOtp(input) {
    const existing = await prisma_1.prisma.otpRecord.findFirst({
        where: {
            userId: input.userId,
            otpType: input.otpType,
            otpPurpose: input.otpPurpose,
            channelValue: input.channelValue,
        },
    });
    ensureCooldownAllowed(existing?.otpCooldownUntil ?? null);
    const cooldownUntil = new Date(Date.now() + otp_service_1.OTP_COOLDOWN_SECONDS * 1000);
    const expiresAt = new Date(Date.now() + otp_service_1.OTP_EXPIRY_SECONDS * 1000);
    // Switching channels or requesting a fresh OTP invalidates any previous OTP for same purpose.
    await prisma_1.prisma.otpRecord.deleteMany({
        where: { userId: input.userId, otpPurpose: input.otpPurpose },
    });
    if (input.otpType === OTP_TYPE_PHONE) {
        const afro = await (0, sms_service_1.sendOTPViaAfroMessage)(input.channelValue);
        await prisma_1.prisma.otpRecord.create({
            data: {
                userId: input.userId,
                otpType: input.otpType,
                otpPurpose: input.otpPurpose,
                channelValue: input.channelValue,
                verificationId: afro.verificationId,
                otpCooldownUntil: cooldownUntil,
                otpExpiresAt: expiresAt,
            },
        });
        return;
    }
    const otp = (0, otp_service_1.generateOTP)(6);
    const otpHash = (0, otp_service_1.hashOTP)(otp);
    await prisma_1.prisma.otpRecord.create({
        data: {
            userId: input.userId,
            otpType: input.otpType,
            otpPurpose: input.otpPurpose,
            channelValue: input.channelValue,
            otpHash,
            otpExpiresAt: expiresAt,
            otpAttempts: 0,
            otpCooldownUntil: cooldownUntil,
        },
    });
    await (0, email_service_1.sendOTPEmail)({
        to: input.channelValue,
        otp,
        firstName: input.firstName,
        purpose: input.otpPurpose,
    });
}
async function validateOtpAndConsume(input) {
    const record = await prisma_1.prisma.otpRecord.findFirst({
        where: {
            userId: input.userId,
            otpType: input.otpType,
            otpPurpose: input.otpPurpose,
            channelValue: input.channelValue,
        },
    });
    if (!record) {
        throw new appError_1.default("No OTP request found. Please request a new OTP.", 400);
    }
    if (!record.otpExpiresAt || record.otpExpiresAt < new Date()) {
        await prisma_1.prisma.otpRecord.delete({ where: { id: record.id } });
        throw new appError_1.default("OTP has expired. Please request a new one.", 400);
    }
    if (input.otpType === OTP_TYPE_PHONE) {
        if (!record.verificationId) {
            throw new appError_1.default("OTP verification session is invalid. Please resend OTP.", 400);
        }
        const verified = await (0, sms_service_1.verifyOTPViaAfroMessage)(input.channelValue, record.verificationId, input.otpCode);
        if (!verified)
            throw new appError_1.default("Invalid OTP", 400);
        await prisma_1.prisma.otpRecord.delete({ where: { id: record.id } });
        return;
    }
    if (!record.otpHash) {
        throw new appError_1.default("OTP verification session is invalid. Please resend OTP.", 400);
    }
    if (record.otpAttempts >= otp_service_1.OTP_MAX_ATTEMPTS) {
        throw new appError_1.default("Too many OTP attempts. Please request a new OTP.", 429);
    }
    const isValid = (0, otp_service_1.verifyOTP)(input.otpCode, record.otpHash);
    if (!isValid) {
        const nextAttempts = record.otpAttempts + 1;
        await prisma_1.prisma.otpRecord.update({
            where: { id: record.id },
            data: { otpAttempts: nextAttempts },
        });
        if (nextAttempts >= otp_service_1.OTP_MAX_ATTEMPTS) {
            throw new appError_1.default("Too many OTP attempts. Please request a new OTP.", 429);
        }
        throw new appError_1.default("Invalid OTP", 400);
    }
    await prisma_1.prisma.otpRecord.delete({ where: { id: record.id } });
}
function generateAccessToken(userId, identifier) {
    return jsonwebtoken_1.default.sign({ userId, email: identifier, type: tokens_1.tokenTypes.ACCESS }, config_1.default.jwt.secret, { expiresIn: `${accessExpirationMinutes}m` });
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
/**
 * If the conflicting account is ACTIVE/SUSPENDED, reject outright.
 * If INACTIVE but within the grace window, give a helpful retry message.
 * If INACTIVE and past the grace window, delete the stale record so the
 * caller can proceed with a fresh registration.
 */
async function reclaimOrReject(existing, label) {
    if (existing.status !== "INACTIVE") {
        throw new appError_1.default(`${label} already registered`, 409);
    }
    const ageMs = Date.now() - new Date(existing.createdAt).getTime();
    if (ageMs < INACTIVE_ACCOUNT_GRACE_MS) {
        const minutesLeft = Math.ceil((INACTIVE_ACCOUNT_GRACE_MS - ageMs) / 60000);
        throw new appError_1.default(`${label} was recently registered but not yet verified. ` +
            `You can retry in ~${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}, ` +
            `or use a different ${label.toLowerCase()}.`, 409);
    }
    await prisma_1.prisma.user.delete({ where: { id: existing.id } });
}
/**
 * Bulk-purge INACTIVE accounts older than `maxAgeMs`.
 * Called by the background cleanup job as a safety net.
 */
async function purgeStaleInactiveAccounts(maxAgeMs = 24 * 60 * 60 * 1000) {
    const cutoff = new Date(Date.now() - maxAgeMs);
    const { count } = await prisma_1.prisma.user.deleteMany({
        where: { status: "INACTIVE", createdAt: { lt: cutoff } },
    });
    return count;
}
async function register(data) {
    const email = data.email?.trim().toLowerCase() || undefined;
    const phone = data.phone?.trim() || undefined;
    if (!email && !phone) {
        throw new appError_1.default("Provide at least an email or phone number", 400);
    }
    if (email) {
        const byEmail = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (byEmail) {
            await reclaimOrReject(byEmail, "Email");
        }
    }
    if (phone) {
        const byPhone = await prisma_1.prisma.user.findUnique({ where: { phone } });
        if (byPhone) {
            await reclaimOrReject(byPhone, "Phone");
        }
    }
    const passwordHash = await (0, hash_1.hashPassword)(data.password);
    const defaultRole = await prisma_1.prisma.role.findFirst({ where: { name: "user" } });
    if (!defaultRole) {
        throw new appError_1.default("Default role 'user' not found. Run seed.", 500);
    }
    const user = await prisma_1.prisma.user.create({
        data: {
            email: email ?? null,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: phone ?? null,
            isSuperAdmin: false,
            status: "INACTIVE",
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
    return {
        user,
        message: "Registration successful. Please verify your account using OTP.",
        verificationRequired: true,
    };
}
//
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
        throw new appError_1.default("Account not verified", 401);
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
    const permMap = await (0, rbacPermission_service_1.getMergedPermissionsForUser)(user.id);
    return {
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            isSuperAdmin: user.isSuperAdmin,
            roles: user.roles.map((r) => r.name),
            permissions: (0, rbacPermission_service_1.mergedMapToList)(permMap),
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
    if (!tokenRecord) {
        throw new appError_1.default("Session expired. Please log in again", 401);
    }
    if (tokenRecord.expiresAt < new Date()) {
        await prisma_1.prisma.token.deleteMany({
            where: { token: refreshToken, type: tokens_1.tokenTypes.REFRESH },
        });
        throw new appError_1.default("Session expired. Please log in again", 401);
    }
    if (tokenRecord.user.status !== "ACTIVE") {
        await prisma_1.prisma.token.deleteMany({
            where: { token: refreshToken, type: tokens_1.tokenTypes.REFRESH },
        });
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
    const fullUser = await prisma_1.prisma.user.findUnique({
        where: { id: tokenRecord.userId },
        include: { roles: { select: { name: true } } },
    });
    if (!fullUser) {
        throw new appError_1.default("User no longer exists", 401);
    }
    const permMap = await (0, rbacPermission_service_1.getMergedPermissionsForUser)(fullUser.id);
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresIn: accessExpirationMinutes * 60,
        user: {
            id: fullUser.id,
            email: fullUser.email,
            firstName: fullUser.firstName,
            lastName: fullUser.lastName,
            phone: fullUser.phone,
            isSuperAdmin: fullUser.isSuperAdmin,
            roles: fullUser.roles.map((r) => r.name),
            permissions: (0, rbacPermission_service_1.mergedMapToList)(permMap),
        },
    };
}
async function forgotPassword(email) {
    // Legacy endpoint compatibility: route to OTP reset initiation with email.
    const normalizedEmail = `${email || ""}`.trim().toLowerCase();
    if (!normalizedEmail)
        return { message: "If the email exists, a reset OTP has been sent." };
    const user = await prisma_1.prisma.user.findUnique({
        where: { email: normalizedEmail },
    });
    if (!user)
        return { message: "If the email exists, a reset OTP has been sent." };
    await issueAndPersistOtp({
        userId: user.id,
        otpType: OTP_TYPE_EMAIL,
        otpPurpose: OTP_PURPOSE_PASSWORD_RESET,
        channelValue: normalizedEmail,
        firstName: user.firstName,
    });
    return { message: "If the email exists, a reset OTP has been sent." };
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
async function sendVerificationOtp(input) {
    const otpType = normalizeOtpType(input.otpType);
    const channelValue = resolveChannelValue({
        otpType,
        email: input.email,
        phone: input.phone,
    });
    const user = await findUserByChannel(otpType, channelValue);
    if (!user)
        throw new appError_1.default("User not found", 404);
    if (user.status === "ACTIVE") {
        return { message: "Account is already verified." };
    }
    await issueAndPersistOtp({
        userId: user.id,
        otpType,
        otpPurpose: OTP_PURPOSE_ACCOUNT_VERIFICATION,
        channelValue,
        firstName: user.firstName,
    });
    return { message: "Verification OTP sent successfully." };
}
async function resendVerificationOtp(input) {
    return sendVerificationOtp(input);
}
async function verifyAccount(input) {
    const otpType = normalizeOtpType(input.otpType);
    const otpCode = requireOtpCode(input.otpCode);
    const channelValue = resolveChannelValue({
        otpType,
        email: input.email,
        phone: input.phone,
    });
    const user = await findUserByChannel(otpType, channelValue);
    if (!user)
        throw new appError_1.default("User not found", 404);
    await validateOtpAndConsume({
        userId: user.id,
        otpType,
        otpPurpose: OTP_PURPOSE_ACCOUNT_VERIFICATION,
        channelValue,
        otpCode,
    });
    await prisma_1.prisma.user.update({
        where: { id: user.id },
        data: otpType === OTP_TYPE_EMAIL
            ? { status: "ACTIVE", emailVerifiedAt: new Date() }
            : { status: "ACTIVE", phoneVerifiedAt: new Date() },
    });
    const activatedUser = await prisma_1.prisma.user.findUnique({
        where: { id: user.id },
        include: { roles: { select: { name: true } } },
    });
    if (!activatedUser)
        throw new appError_1.default("User not found", 404);
    const accessToken = generateAccessToken(activatedUser.id, activatedUser.email);
    const refreshToken = generateRefreshToken();
    await prisma_1.prisma.token.create({
        data: {
            userId: activatedUser.id,
            token: refreshToken,
            type: tokens_1.tokenTypes.REFRESH,
            expiresAt: new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000),
        },
    });
    return {
        message: "Account verified successfully.",
        user: {
            id: activatedUser.id,
            email: activatedUser.email,
            firstName: activatedUser.firstName,
            lastName: activatedUser.lastName,
            roles: activatedUser.roles.map((r) => r.name),
        },
        accessToken,
        refreshToken,
        expiresIn: accessExpirationMinutes * 60,
    };
}
async function requestPasswordReset(input) {
    const otpType = normalizeOtpType(input.otpType);
    const channelValue = resolveChannelValue({
        otpType,
        email: input.email,
        phone: input.phone,
    });
    const user = await findUserByChannel(otpType, channelValue);
    if (!user)
        throw new appError_1.default("User not found", 404);
    await issueAndPersistOtp({
        userId: user.id,
        otpType,
        otpPurpose: OTP_PURPOSE_PASSWORD_RESET,
        channelValue,
        firstName: user.firstName,
    });
    return { message: "Password reset OTP sent successfully." };
}
async function resendResetOtp(input) {
    return requestPasswordReset(input);
}
async function verifyResetOtp(input) {
    const otpType = normalizeOtpType(input.otpType);
    const otpCode = requireOtpCode(input.otpCode);
    const channelValue = resolveChannelValue({
        otpType,
        email: input.email,
        phone: input.phone,
    });
    const user = await findUserByChannel(otpType, channelValue);
    if (!user)
        throw new appError_1.default("User not found", 404);
    await validateOtpAndConsume({
        userId: user.id,
        otpType,
        otpPurpose: OTP_PURPOSE_PASSWORD_RESET,
        channelValue,
        otpCode,
    });
    await prisma_1.prisma.token.deleteMany({
        where: { userId: user.id, type: tokens_1.tokenTypes.RESET_PASSWORD },
    });
    const resetToken = generateResetToken();
    await prisma_1.prisma.token.create({
        data: {
            userId: user.id,
            token: resetToken,
            type: tokens_1.tokenTypes.RESET_PASSWORD,
            expiresAt: new Date(Date.now() + resetTokenExpirationMinutes * 60 * 1000),
        },
    });
    return {
        message: "OTP verified. Use the reset token to set a new password.",
        resetToken,
        expiresIn: resetTokenExpirationMinutes * 60,
    };
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