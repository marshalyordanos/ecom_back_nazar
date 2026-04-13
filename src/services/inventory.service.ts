import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";

const movementDateFields = ["createdAt"];

export type InventoryScopeUser = {
  isSuperAdmin: boolean;
  locationId?: string | null;
};

/** Non–super-admins with no assigned location see no inventory rows. */
function mergeInventoryWhere(where: Record<string, unknown>, user: InventoryScopeUser): Record<string, unknown> {
  if (user.isSuperAdmin) return { ...where };
  if (user.locationId) {
    const w = { ...where };
    delete (w as { locationId?: unknown }).locationId;
    return { ...w, locationId: user.locationId };
  }
  return { AND: [where, { id: { in: [] as string[] } }] };
}

function assertLocationAccess(user: InventoryScopeUser, locationId: string) {
  if (user.isSuperAdmin) return;
  if (!user.locationId) {
    throw new AppError("No location assigned to your account", 403);
  }
  if (user.locationId !== locationId) {
    throw new AppError("You can only access inventory for your assigned location", 403);
  }
}

export async function listInventory(
  query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
  },
  user: InventoryScopeUser
) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: ["variant.product.name", "variant.sku"],
    dateFields: ["updatedAt"],
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereScoped = mergeInventoryWhere(where as Record<string, unknown>, user);

  const [data, total] = await Promise.all([
    prisma.inventory.findMany({
      where: whereScoped,
      orderBy,
      skip,
      take,
      include: {
        variant: { include: { product: true, variantOptionValues: { include: { optionValue: true } } } },
        location: true,
      },
    }),
    prisma.inventory.count({ where: whereScoped }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getInventoryByVariantId(variantId: string, user: InventoryScopeUser) {
  const where: Record<string, unknown> = { variantId };
  const whereScoped = mergeInventoryWhere(where, user);
  const inventories = await prisma.inventory.findMany({
    where: whereScoped,
    include: { location: true },
  });
  return inventories;
}

export async function updateInventoryQuantity(
  variantId: string,
  locationId: string,
  data: { quantity?: number; reservedQuantity?: number; reorderLevel?: number },
  user: InventoryScopeUser
) {
  assertLocationAccess(user, locationId);
  const inv = await prisma.inventory.findFirst({
    where: { variantId, locationId },
  });
  if (!inv) throw new AppError("Inventory record not found", 404);
  const inventory = await prisma.inventory.update({
    where: { id: inv.id },
    data: {
      ...(data.quantity !== undefined && { quantity: data.quantity }),
      ...(data.reservedQuantity !== undefined && { reservedQuantity: data.reservedQuantity }),
      ...(data.reorderLevel !== undefined && { reorderLevel: data.reorderLevel }),
    },
  });
  return inventory;
}

export async function getInventoryById(id: string, user: InventoryScopeUser) {
  const inventory = await prisma.inventory.findUnique({
    where: { id },
    include: {
      variant: true,
      location: true,
      movements: true,
    },
  });
  if (!inventory) throw new AppError("Inventory not found", 404);
  if (!user.isSuperAdmin) {
    if (!user.locationId || inventory.locationId !== user.locationId) {
      throw new AppError("Inventory not found", 404);
    }
  }
  return inventory;
}

export async function listMovements(
  query: {
    page?: number;
    pageSize?: number;
    filter?: string;
    sort?: string;
    search?: string;
  },
  user: InventoryScopeUser
) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: ["variant.product.name", "variant.sku"],
    dateFields: movementDateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereScoped = mergeInventoryWhere(where as Record<string, unknown>, user);

  const [data, total] = await Promise.all([
    prisma.inventoryMovement.findMany({
      where: whereScoped,
      orderBy,
      skip,
      take,
      include: {
        variant: { include: { product: { select: { name: true } } } },
        location: true,
      },
    }),
    prisma.inventoryMovement.count({ where: whereScoped }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function addMovement(
  data: {
    variantId: string;
    locationId: string;
    type: string;
    quantity: number;
    referenceId?: string;
  },
  user: InventoryScopeUser
) {
  assertLocationAccess(user, data.locationId);

  let inventory = await prisma.inventory.findFirst({
    where: { variantId: data.variantId, locationId: data.locationId },
  });
  if (!inventory) {
    inventory = await prisma.inventory.create({
      data: {
        variantId: data.variantId,
        locationId: data.locationId,
        quantity: 0,
        reservedQuantity: 0,
      },
    });
  }

  const newQty =
    data.type === "PURCHASE" || data.type === "RETURN" || data.type === "TRANSFER"
      ? inventory.quantity + data.quantity
      : data.type === "SALE" || data.type === "ADJUSTMENT"
        ? inventory.quantity - data.quantity
        : inventory.quantity;

  const [movement] = await prisma.$transaction([
    prisma.inventoryMovement.create({
      data: {
        variantId: data.variantId,
        locationId: data.locationId,
        inventoryId: inventory.id,
        type: data.type as any,
        quantity: data.quantity,
        referenceId: data.referenceId,
      },
    }),
    prisma.inventory.update({
      where: { id: inventory.id },
      data: { quantity: Math.max(0, newQty) },
    }),
  ]);
  return movement;
}
