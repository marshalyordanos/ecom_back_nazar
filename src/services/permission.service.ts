import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";

const searchableFields = ["resource", "description"];
const dateFields = ["createdAt", "updatedAt"];

export async function listPermissions(query: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields,
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();

  const [data, total] = await Promise.all([
    prisma.permission.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { rolePermissions: { include: { role: true } } },
    }),
    prisma.permission.count({ where }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getPermissionById(id: string) {
  const permission = await prisma.permission.findUnique({
    where: { id },
    include: { rolePermissions: { include: { role: true } } },
  });
  if (!permission) throw new AppError("Permission not found", 404);
  return permission;
}

export async function createPermission(data: { resource: string; description?: string }) {
  const permission = await prisma.permission.create({
    data: { resource: data.resource, description: data.description },
  });
  return permission;
}

export async function updatePermission(id: string, data: { resource?: string; description?: string }) {
  const permission = await prisma.permission.update({
    where: { id },
    data: { ...(data.resource && { resource: data.resource }), ...(data.description !== undefined && { description: data.description }) },
  });
  return permission;
}

export async function deletePermission(id: string) {
  await prisma.permission.delete({ where: { id } });
  return { message: "Permission deleted successfully" };
}
