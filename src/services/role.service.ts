import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";

const searchableFields = ["name", "description"];
const dateFields = ["createdAt", "updatedAt"];

export async function listRoles(query: {
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
    prisma.role.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { rolePermissions: { include: { permission: true } } },
    }),
    prisma.role.count({ where }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getRoleById(id: string) {
  const role = await prisma.role.findUnique({
    where: { id },
    include: { rolePermissions: { include: { permission: true } } },
  });
  if (!role) throw new AppError("Role not found", 404);
  return role;
}

export async function createRole(data: { name: string; description?: string }) {
  const role = await prisma.role.create({
    data: { name: data.name, description: data.description },
  });
  return role;
}

export async function updateRole(id: string, data: { name?: string; description?: string }) {
  const role = await prisma.role.update({
    where: { id },
    data: { ...(data.name && { name: data.name }), ...(data.description !== undefined && { description: data.description }) },
  });
  return role;
}

export async function deleteRole(id: string) {
  await prisma.role.delete({ where: { id } });
  return { message: "Role deleted successfully" };
}

export async function assignPermissionsToRole(
  roleId: string,
  permissions: Array<{ permissionId: string; createAction?: boolean; readAction?: boolean; updateAction?: boolean; deleteAction?: boolean }>
) {
  await prisma.rolePermission.deleteMany({ where: { roleId } });
  if (permissions.length === 0) {
    return await getRoleById(roleId);
  }
  await prisma.rolePermission.createMany({
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

export async function removePermissionsFromRole(roleId: string, permissionIds: string[]) {
  await prisma.rolePermission.deleteMany({
    where: { roleId, permissionId: { in: permissionIds } },
  });
  return await getRoleById(roleId);
}

/**
 * Assign a specific role to a user (replaces all current roles with this one).
 * @param userId The user's ID
 * @param roleId The role's ID
 */
export async function assignRoleToUser(roleId: string, userId: string) {
  // Validate user exists
  console.log('userId', userId)
  console.log('roleId', roleId)
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError("User not found", 404);

  // Validate role exists
  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (!role) throw new AppError("Role not found", 404);

  // Update user roles (replace all with the provided role)
  await prisma.user.update({
    where: { id: userId },
    data: {
      roles: {
        set: [{ id: roleId }]
      }
    }
  });
  return { message: "Role assigned to user" };
}