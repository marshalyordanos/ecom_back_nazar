"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = getMe;
exports.updateMe = updateMe;
exports.updatePassword = updatePassword;
exports.getById = getById;
exports.listUsers = listUsers;
exports.updateUser = updateUser;
exports.deactivateUser = deactivateUser;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const hash_1 = require("../utils/hash");
const apiFeature_1 = require("../utils/apiFeature");
const userSearchableFields = ["email", "firstName", "lastName", "phone"];
const userDateFields = ["createdAt", "updatedAt", "emailVerifiedAt", "phoneVerifiedAt"];
async function getMe(userId) {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            phone: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            status: true,
            emailVerifiedAt: true,
            phoneVerifiedAt: true,
            roles: { select: { id: true, name: true, description: true } },
            locationId: true,
            location: { select: { id: true, name: true, shopId: true } },
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user)
        throw new appError_1.default("User not found", 404);
    return user;
}
async function updateMe(userId, data) {
    const user = await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            ...(data.firstName !== undefined && { firstName: data.firstName }),
            ...(data.lastName !== undefined && { lastName: data.lastName }),
            ...(data.phone !== undefined && { phone: data.phone }),
            ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
        },
        select: {
            id: true,
            email: true,
            phone: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
            status: true,
            roles: { select: { name: true } },
            createdAt: true,
            updatedAt: true,
        },
    });
    return user;
}
async function updatePassword(userId, newPassword) {
    const passwordHash = await (0, hash_1.hashPassword)(newPassword);
    await prisma_1.prisma.user.update({
        where: { id: userId },
        data: { passwordHash },
    });
    return { message: "Password updated successfully" };
}
async function getById(id) {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
        include: { roles: { select: { id: true, name: true } } },
    });
    if (!user)
        throw new appError_1.default("User not found", 404);
    const { passwordHash, ...rest } = user;
    return rest;
}
async function listUsers(query, onlyUsers) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: userSearchableFields,
        dateFields: userDateFields,
    });
    const { skip, take, where: rawWhere, orderBy } = feature.getQuery();
    const w = { ...rawWhere };
    const roleIdFromFilter = w.roleId;
    delete w.roleId;
    const roleId = query.roleId || roleIdFromFilter;
    const parts = [];
    if (Object.keys(w).length > 0)
        parts.push(w);
    if (onlyUsers)
        parts.push({ roles: { some: { name: "user" } } });
    if (roleId)
        parts.push({ roles: { some: { id: roleId } } });
    const where = parts.length === 0 ? {} : parts.length === 1 ? parts[0] : { AND: parts };
    const [users, total] = await Promise.all([
        prisma_1.prisma.user.findMany({
            where,
            orderBy,
            skip,
            take,
            select: {
                id: true,
                email: true,
                phone: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                status: true,
                locationId: true,
                location: { select: { id: true, name: true, shopId: true } },
                roles: { select: { id: true, name: true } },
                createdAt: true,
                updatedAt: true,
            },
        }),
        prisma_1.prisma.user.count({ where }),
    ]);
    return {
        data: users,
        pagination: feature.getPagination(total),
    };
}
async function updateUser(id, data) {
    const existing = await prisma_1.prisma.user.findUnique({ where: { id } });
    if (!existing)
        throw new appError_1.default("User not found", 404);
    const updateData = {
        ...(data.firstName !== undefined && { firstName: data.firstName }),
        ...(data.lastName !== undefined && { lastName: data.lastName }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
    };
    if (data.roleIds !== undefined) {
        updateData.roles = { set: data.roleIds.map((rid) => ({ id: rid })) };
    }
    if (data.locationId !== undefined) {
        if (data.locationId === null) {
            updateData.locationId = null;
        }
        else {
            const loc = await prisma_1.prisma.shopLocation.findUnique({ where: { id: data.locationId } });
            if (!loc)
                throw new appError_1.default("Location not found", 404);
            updateData.locationId = data.locationId;
        }
    }
    const user = await prisma_1.prisma.user.update({
        where: { id },
        data: updateData,
        include: {
            roles: { select: { id: true, name: true } },
            location: { select: { id: true, name: true, shopId: true } },
        },
    });
    const { passwordHash, ...rest } = user;
    return rest;
}
async function deactivateUser(id) {
    const user = await prisma_1.prisma.user.findUnique({ where: { id } });
    if (!user)
        throw new appError_1.default("User not found", 404);
    await prisma_1.prisma.user.update({
        where: { id },
        data: { status: "INACTIVE" },
    });
    return { message: "User deactivated successfully" };
}
//# sourceMappingURL=user.service.js.map