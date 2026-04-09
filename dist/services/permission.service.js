"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPermissions = listPermissions;
exports.getPermissionById = getPermissionById;
exports.createPermission = createPermission;
exports.updatePermission = updatePermission;
exports.deletePermission = deletePermission;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const searchableFields = ["resource", "description"];
const dateFields = ["createdAt", "updatedAt"];
async function listPermissions(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields,
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const [data, total] = await Promise.all([
        prisma_1.prisma.permission.findMany({
            where,
            orderBy,
            skip,
            take,
            include: { rolePermissions: { include: { role: true } } },
        }),
        prisma_1.prisma.permission.count({ where }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getPermissionById(id) {
    const permission = await prisma_1.prisma.permission.findUnique({
        where: { id },
        include: { rolePermissions: { include: { role: true } } },
    });
    if (!permission)
        throw new appError_1.default("Permission not found", 404);
    return permission;
}
async function createPermission(data) {
    const permission = await prisma_1.prisma.permission.create({
        data: { resource: data.resource, description: data.description },
    });
    return permission;
}
async function updatePermission(id, data) {
    const permission = await prisma_1.prisma.permission.update({
        where: { id },
        data: {
            ...(data.resource && { resource: data.resource }),
            ...(data.description !== undefined && { description: data.description }),
        },
    });
    return permission;
}
async function deletePermission(id) {
    await prisma_1.prisma.permission.delete({ where: { id } });
    return { message: "Permission deleted successfully" };
}
//# sourceMappingURL=permission.service.js.map