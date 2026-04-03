"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRoles = listRoles;
exports.getRoleById = getRoleById;
exports.createRole = createRole;
exports.updateRole = updateRole;
exports.deleteRole = deleteRole;
exports.assignPermissionsToRole = assignPermissionsToRole;
exports.removePermissionsFromRole = removePermissionsFromRole;
exports.assignRoleToUser = assignRoleToUser;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const searchableFields = ["name", "description"];
const dateFields = ["createdAt", "updatedAt"];
async function listRoles(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields,
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const [data, total] = await Promise.all([
        prisma_1.prisma.role.findMany({
            where,
            orderBy,
            skip,
            take,
            include: { rolePermissions: { include: { permission: true } } },
        }),
        prisma_1.prisma.role.count({ where }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getRoleById(id) {
    const role = await prisma_1.prisma.role.findUnique({
        where: { id },
        include: { rolePermissions: { include: { permission: true } } },
    });
    if (!role)
        throw new appError_1.default("Role not found", 404);
    return role;
}
async function createRole(data) {
    const role = await prisma_1.prisma.role.create({
        data: { name: data.name, description: data.description },
    });
    return role;
}
async function updateRole(id, data) {
    const role = await prisma_1.prisma.role.update({
        where: { id },
        data: { ...(data.name && { name: data.name }), ...(data.description !== undefined && { description: data.description }) },
    });
    return role;
}
async function deleteRole(id) {
    await prisma_1.prisma.role.delete({ where: { id } });
    return { message: "Role deleted successfully" };
}
async function assignPermissionsToRole(roleId, permissions) {
    await prisma_1.prisma.rolePermission.deleteMany({ where: { roleId } });
    if (permissions.length === 0) {
        return await getRoleById(roleId);
    }
    await prisma_1.prisma.rolePermission.createMany({
        data: permissions.map((p) => ({
            roleId,
            permissionId: p.permissionId,
            createAction: p.createAction ?? false,
            readAction: p.readAction ?? false,
            updateAction: p.updateAction ?? false,
            deleteAction: p.deleteAction ?? false,
        })),
    });
    return await getRoleById(roleId);
}
async function removePermissionsFromRole(roleId, permissionIds) {
    await prisma_1.prisma.rolePermission.deleteMany({
        where: { roleId, permissionId: { in: permissionIds } },
    });
    return await getRoleById(roleId);
}
/**
 * Assign a specific role to a user (replaces all current roles with this one).
 * @param userId The user's ID
 * @param roleId The role's ID
 */
async function assignRoleToUser(roleId, userId) {
    // Validate user exists
    console.log('userId', userId);
    console.log('roleId', roleId);
    const user = await prisma_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new appError_1.default("User not found", 404);
    // Validate role exists
    const role = await prisma_1.prisma.role.findUnique({ where: { id: roleId } });
    if (!role)
        throw new appError_1.default("Role not found", 404);
    // Update user roles (replace all with the provided role)
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            roles: {
                set: [{ id: roleId }]
            }
        }
    });
    return { message: "Role assigned to user" };
}
//# sourceMappingURL=role.service.js.map