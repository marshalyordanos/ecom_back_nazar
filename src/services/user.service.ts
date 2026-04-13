import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { hashPassword } from "../utils/hash";
import { PrismaQueryFeature } from "../utils/apiFeature";
import fs from "fs";
import { uploadToCloudinary } from "../config/cloudinary";
const userSearchableFields = ["email", "firstName", "lastName", "phone"];
const userDateFields = ["createdAt", "updatedAt", "emailVerifiedAt", "phoneVerifiedAt"];

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
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
  if (!user) throw new AppError("User not found", 404);
  return user;
}

export async function updateMe(
  userId: string,
  data: { firstName?: string; lastName?: string; phone?: string; avatarUrl?: string },
  file?: Express.Multer.File
) {
  let resolvedAvatarUrl = data.avatarUrl;

  if (file?.path) {
    const fileBuffer = fs.readFileSync(file.path);
    const uploadResult = await uploadToCloudinary(fileBuffer, "ecommerce/users", "image");
    fs.unlinkSync(file.path);
    resolvedAvatarUrl = uploadResult.secure_url || uploadResult.url;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.firstName !== undefined && { firstName: data.firstName }),
      ...(data.lastName !== undefined && { lastName: data.lastName }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(resolvedAvatarUrl !== undefined && { avatarUrl: resolvedAvatarUrl }),
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

export async function updatePassword(userId: string, newPassword: string) {
  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
  return { message: "Password updated successfully" };
}

export async function getById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { roles: { select: { id: true, name: true } } },
  });
  if (!user) throw new AppError("User not found", 404);
  const { passwordHash, ...rest } = user;
  return rest;
}

export async function listUsers(
  query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
    roleId?: string;
  },
  onlyUsers?: boolean
) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: userSearchableFields,
    dateFields: userDateFields,
  });
  const { skip, take, where: rawWhere, orderBy } = feature.getQuery();

  const w = { ...rawWhere } as Record<string, unknown>;
  const roleIdFromFilter = w.roleId as string | undefined;
  delete w.roleId;
  const roleId = query.roleId || roleIdFromFilter;

  const parts: Record<string, unknown>[] = [];
  if (Object.keys(w).length > 0) parts.push(w);
  if (onlyUsers) parts.push({ roles: { some: { name: "user" } } });
  if (roleId) parts.push({ roles: { some: { id: roleId } } });

  const where =
    parts.length === 0 ? {} : parts.length === 1 ? parts[0]! : { AND: parts };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
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
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    pagination: feature.getPagination(total),
  };
}

export async function updateUser(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    status?: string;
    avatarUrl?: string;
    roleIds?: string[];
    locationId?: string | null;
  }
) {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new AppError("User not found", 404);

  const updateData: Record<string, unknown> = {
    ...(data.firstName !== undefined && { firstName: data.firstName }),
    ...(data.lastName !== undefined && { lastName: data.lastName }),
    ...(data.phone !== undefined && { phone: data.phone }),
    ...(data.status !== undefined && { status: data.status as any }),
    ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
  };
  if (data.roleIds !== undefined) {
    updateData.roles = { set: data.roleIds.map((rid) => ({ id: rid })) };
  }
  if (data.locationId !== undefined) {
    if (data.locationId === null) {
      updateData.locationId = null;
    } else {
      const loc = await prisma.shopLocation.findUnique({ where: { id: data.locationId } });
      if (!loc) throw new AppError("Location not found", 404);
      updateData.locationId = data.locationId;
    }
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData as Parameters<typeof prisma.user.update>[0]["data"],
    include: {
      roles: { select: { id: true, name: true } },
      location: { select: { id: true, name: true, shopId: true } },
    },
  });
  const { passwordHash, ...rest } = user;
  return rest;
}

export async function deactivateUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError("User not found", 404);
  await prisma.user.update({
    where: { id },
    data: { status: "INACTIVE" },
  });
  return { message: "User deactivated successfully" };
}
