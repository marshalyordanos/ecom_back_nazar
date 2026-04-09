"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSION_RESOURCES = void 0;
exports.getMergedPermissionsForUser = getMergedPermissionsForUser;
exports.mergedMapToList = mergedMapToList;
exports.hasPermission = hasPermission;
const prisma_1 = require("../lib/prisma");
/** Resource keys used in Permission.resource and RolePermission; keep in sync with seed + admin UI. */
exports.PERMISSION_RESOURCES = [
    "users",
    "products",
    "orders",
    "shops",
    "shop_sales",
    "inventory",
    "payments",
    "shipments",
    "categories",
    "brands",
    "coupons",
    "reviews",
    "roles",
    "permissions",
    "analytics",
    "sync",
    "settings",
    "reports",
    "statistics",
];
async function getMergedPermissionsForUser(userId) {
    var _a, _b, _c, _d;
    const basic = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: { isSuperAdmin: true },
    });
    const merged = {};
    if (!basic)
        return merged;
    if (basic.isSuperAdmin) {
        for (const r of exports.PERMISSION_RESOURCES) {
            merged[r] = { create: true, read: true, update: true, delete: true };
        }
        return merged;
    }
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: {
            roles: {
                select: {
                    rolePermissions: {
                        select: {
                            createAction: true,
                            readAction: true,
                            updateAction: true,
                            deleteAction: true,
                            permission: { select: { resource: true } },
                        },
                    },
                },
            },
        },
    });
    if (!user)
        return merged;
    for (const role of user.roles) {
        for (const rp of role.rolePermissions) {
            const res = rp.permission.resource;
            if (!merged[res]) {
                merged[res] = { create: false, read: false, update: false, delete: false };
            }
            (_a = merged[res]).create || (_a.create = rp.createAction);
            (_b = merged[res]).read || (_b.read = rp.readAction);
            (_c = merged[res]).update || (_c.update = rp.updateAction);
            (_d = merged[res]).delete || (_d.delete = rp.deleteAction);
        }
    }
    return merged;
}
function mergedMapToList(map) {
    return Object.entries(map).map(([resource, v]) => ({
        resource,
        create: v.create,
        read: v.read,
        update: v.update,
        delete: v.delete,
    }));
}
function hasPermission(map, resource, action) {
    const row = map[resource];
    if (!row)
        return false;
    return Boolean(row[action]);
}
//# sourceMappingURL=rbacPermission.service.js.map