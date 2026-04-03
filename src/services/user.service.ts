import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { hashPassword } from "../utils/hash";
import { PrismaQueryFeature } from "../utils/apiFeature";
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
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) throw new AppError("User not found", 404);
  return user;
}

export async function updateMe(
  userId: string,
  data: { firstName?: string; lastName?: string; phone?: string; avatarUrl?: string }
) {
  const user = await prisma.user.update({
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

export async function listUsers(query: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}, onlyUsers?: boolean) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: userSearchableFields,
    dateFields: userDateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();

  console.log('query', onlyUsers)
  if (onlyUsers) {
    where.roles = { some: { name: "user" } };
  }
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
        roles: { select: { name: true } },
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

  const user = await prisma.user.update({
    where: { id },
    data: updateData as Parameters<typeof prisma.user.update>[0]["data"],
    include: { roles: { select: { id: true, name: true } } },
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
