import { prisma } from "../lib/prisma";

/** Resource keys used in Permission.resource and RolePermission; keep in sync with seed + admin UI. */
export const PERMISSION_RESOURCES = [
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
] as const;

export type PermissionResource = (typeof PERMISSION_RESOURCES)[number];

/** Human-readable labels stored on Permission.description when bootstrapping missing rows. */
const RESOURCE_DESCRIPTIONS: Record<PermissionResource, string> = {
  users: "Manage user accounts",
  products: "Manage products and variants",
  orders: "Manage customer orders",
  shops: "Manage shops and locations",
  shop_sales: "Manage sales recorded from shops",
  inventory: "Manage stock and inventory movements",
  payments: "View and process payments",
  shipments: "Manage shipments and tracking",
  categories: "Manage product categories",
  brands: "Manage brands",
  coupons: "Manage coupons",
  reviews: "Manage product reviews",
  roles: "Manage roles",
  permissions: "Manage permission definitions",
  analytics: "View analytics",
  sync: "Data sync operations",
  settings: "Manage application settings",
  reports: "View reports",
  statistics: "View dashboard statistics",
};

/**
 * Ensures every resource in PERMISSION_RESOURCES exists as a Permission row.
 * Safe to run on every server start (idempotent via skipDuplicates).
 */
export async function ensureDefaultPermissions(): Promise<{ count: number }> {
  return prisma.permission.createMany({
    data: PERMISSION_RESOURCES.map((resource) => ({
      resource,
      description: RESOURCE_DESCRIPTIONS[resource],
    })),
    skipDuplicates: true,
  });
}

export type MergedPermissionRow = {
  resource: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

export type MergedPermissionMap = Record<
  string,
  { create: boolean; read: boolean; update: boolean; delete: boolean }
>;

export async function getMergedPermissionsForUser(userId: string): Promise<MergedPermissionMap> {
  const basic = await prisma.user.findUnique({
    where: { id: userId },
    select: { isSuperAdmin: true },
  });
  const merged: MergedPermissionMap = {};
  if (!basic) return merged;

  if (basic.isSuperAdmin) {
    for (const r of PERMISSION_RESOURCES) {
      merged[r] = { create: true, read: true, update: true, delete: true };
    }
    return merged;
  }

  const user = await prisma.user.findUnique({
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
  if (!user) return merged;

  for (const role of user.roles) {
    for (const rp of role.rolePermissions) {
      const res = rp.permission.resource;
      if (!merged[res]) {
        merged[res] = { create: false, read: false, update: false, delete: false };
      }
      merged[res].create ||= rp.createAction;
      merged[res].read ||= rp.readAction;
      merged[res].update ||= rp.updateAction;
      merged[res].delete ||= rp.deleteAction;
    }
  }

  return merged;
}

export function mergedMapToList(map: MergedPermissionMap): MergedPermissionRow[] {
  return Object.entries(map).map(([resource, v]) => ({
    resource,
    create: v.create,
    read: v.read,
    update: v.update,
    delete: v.delete,
  }));
}

export function hasPermission(
  map: MergedPermissionMap,
  resource: string,
  action: "create" | "read" | "update" | "delete"
): boolean {
  const row = map[resource];
  if (!row) return false;
  return Boolean(row[action]);
}
