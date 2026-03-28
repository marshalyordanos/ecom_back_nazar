import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";

const movementDateFields = ["createdAt"];

export async function listInventory(query: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: ["variant.product.name", "variant.sku"],
    dateFields: ["updatedAt"],
  });
  const { skip, take, where, orderBy } = feature.getQuery();

  const [data, total] = await Promise.all([
    prisma.inventory.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        variant: { include: { product:true,variantOptionValues:{include: {optionValue:true}} } },
        location: true,
      },
    }),
    prisma.inventory.count({ where }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getInventoryByVariantId(variantId: string) {
  const inventories = await prisma.inventory.findMany({
    where: { variantId },
    include: { location: true },
  });
  return inventories;
}

export async function updateInventoryQuantity(
  variantId: string,
  locationId: string,
  data: { quantity?: number; reservedQuantity?: number; reorderLevel?: number }
) {
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

export async function getInventoryById(id: string) {
  const inventory = await prisma.inventory.findUnique({
    where: { id },
    include: {
      variant: true,
      location: true,
      movements: true,
    },
  });
  if (!inventory) throw new AppError("Inventory not found", 404);
  return inventory;
}
export async function listMovements(query: {
  page?: number;
  pageSize?: number;
  filter?: string;
  sort?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: ["variant.product.name",'variant.sku'],
    dateFields: movementDateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();

  const [data, total] = await Promise.all([
    prisma.inventoryMovement.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        variant: { include: { product: { select: { name: true } } } },
        location: true,
      },
    }),
    prisma.inventoryMovement.count({ where }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function addMovement(data: {
  variantId: string;
  locationId: string;
  type: string;
  quantity: number;
  referenceId?: string;
}) {
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
