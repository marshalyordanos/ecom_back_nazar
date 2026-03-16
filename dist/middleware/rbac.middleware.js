"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAnyPermission = exports.requirePermission = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const prisma_1 = require("../lib/prisma");
/**
 * Require the user to have a role that has the given permission with the given action.
 * Expects req.user.roles to be set (use after protect middleware).
 */
const requirePermission = (resource, action) => {
    return async (req, _res, next) => {
        if (!req.user) {
            return next(new appError_1.default("Not authenticated", 401));
        }
        const actionKey = `${action}Action`;
        const roleNames = req.user.roles;
        const rolePermissions = await prisma_1.prisma.rolePermission.findMany({
            where: {
                role: { name: { in: roleNames } },
                permission: { resource },
                [actionKey]: true,
            },
            select: { id: true },
        });
        if (rolePermissions.length === 0) {
            return next(new appError_1.default(`You do not have permission to ${action} ${resource}`, 403));
        }
        next();
    };
};
exports.requirePermission = requirePermission;
/**
 * Require any of the given permissions (resource + action pairs).
 */
const requireAnyPermission = (...checks) => {
    return async (req, _res, next) => {
        if (!req.user) {
            return next(new appError_1.default("Not authenticated", 401));
        }
        const roleNames = req.user.roles;
        for (const { resource, action } of checks) {
            const actionKey = `${action}Action`;
            const count = await prisma_1.prisma.rolePermission.count({
                where: {
                    role: { name: { in: roleNames } },
                    permission: { resource },
                    [actionKey]: true,
                },
            });
            if (count > 0)
                return next();
        }
        return next(new appError_1.default("You do not have permission to perform this action", 403));
    };
};
exports.requireAnyPermission = requireAnyPermission;
//# sourceMappingURL=rbac.middleware.js.map