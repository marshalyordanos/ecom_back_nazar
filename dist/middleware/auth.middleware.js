"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.optionalAuth = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../utils/appError"));
const prisma_1 = require("../lib/prisma");
const config_1 = __importDefault(require("../config/config"));
const tokens_1 = require("../config/tokens");
/**
 * Protect routes: require valid JWT access token.
 */
const protect = async (req, _res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new appError_1.default("You are not logged in. Please log in.", 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        if (decoded.type !== tokens_1.tokenTypes.ACCESS) {
            return next(new appError_1.default("Invalid token type", 401));
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { roles: { select: { name: true } } },
        });
        if (!user) {
            return next(new appError_1.default("User no longer exists", 401));
        }
        if (user.status !== "ACTIVE") {
            return next(new appError_1.default("Account is inactive or suspended", 401));
        }
        req.user = {
            id: user.id,
            email: user.email,
            isSuperAdmin: user.isSuperAdmin,
            roles: user.roles.map((r) => r.name),
            locationId: user.locationId ?? null,
        };
        console.log("req.user222222: ", req.user);
        next();
    }
    catch (err) {
        // If token is expired, jwt.verify throws with err.name === 'TokenExpiredError'
        if (err && err.name === 'TokenExpiredError') {
            return next(new appError_1.default("Token is expired", 401));
        }
        return next(new appError_1.default("Invalid or expired token", 401));
    }
};
exports.protect = protect;
/**
 * Optional auth: attach user if token present, do not require it.
 */
const optionalAuth = async (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return next();
    }
    const token = authHeader.split(" ")[1];
    if (!token)
        return next();
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        if (decoded.type !== tokens_1.tokenTypes.ACCESS)
            return next();
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: decoded.userId },
            include: { roles: { select: { name: true } } },
        });
        if (!user || user.status !== "ACTIVE")
            return next();
        req.user = {
            id: user.id,
            email: user.email,
            isSuperAdmin: user.isSuperAdmin,
            roles: user.roles.map((r) => r.name),
            locationId: user.locationId ?? null,
        };
    }
    catch {
        // ignore invalid token
    }
    next();
};
exports.optionalAuth = optionalAuth;
/**
 * Require at least one of the given roles.
 */
const restrictTo = (...roleNames) => {
    return (req, _res, next) => {
        console.log("00000000000000: ", req.user);
        if (!req.user) {
            return next(new appError_1.default("Not authenticated", 401));
        }
        if (req.user.isSuperAdmin) {
            return next();
        }
        const hasRole = roleNames.some((r) => req.user.roles.includes(r));
        if (!hasRole) {
            return next(new appError_1.default("You do not have permission to perform this action", 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=auth.middleware.js.map