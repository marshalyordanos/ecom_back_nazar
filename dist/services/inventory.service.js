"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listInventory = listInventory;
exports.getInventoryByVariantId = getInventoryByVariantId;
exports.updateInventoryQuantity = updateInventoryQuantity;
exports.getInventoryById = getInventoryById;
exports.listMovements = listMovements;
exports.addMovement = addMovement;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const movementDateFields = ["createdAt"];
async function listInventory(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: ["variant.product.name", "variant.sku"],
        dateFields: ["updatedAt"],
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const [data, total] = await Promise.all([
        prisma_1.prisma.inventory.findMany({
            where,
            orderBy,
            skip,
            take,
            include: {
                variant: { include: { product: true, variantOptionValues: { include: { optionValue: true } } } },
                location: true,
            },
        }),
        prisma_1.prisma.inventory.count({ where }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getInventoryByVariantId(variantId) {
    const inventories = await prisma_1.prisma.inventory.findMany({
        where: { variantId },
        include: { location: true },
    });
    return inventories;
}
async function updateInventoryQuantity(variantId, locationId, data) {
    const inv = await prisma_1.prisma.inventory.findFirst({
        where: { variantId, locationId },
    });
    if (!inv)
        throw new appError_1.default("Inventory record not found", 404);
    const inventory = await prisma_1.prisma.inventory.update({
        where: { id: inv.id },
        data: {
            ...(data.quantity !== undefined && { quantity: data.quantity }),
            ...(data.reservedQuantity !== undefined && { reservedQuantity: data.reservedQuantity }),
            ...(data.reorderLevel !== undefined && { reorderLevel: data.reorderLevel }),
        },
    });
    return inventory;
}
async function getInventoryById(id) {
    const inventory = await prisma_1.prisma.inventory.findUnique({
        where: { id },
        include: {
            variant: true,
            location: true,
            movements: true,
        },
    });
    if (!inventory)
        throw new appError_1.default("Inventory not found", 404);
    return inventory;
}
async function listMovements(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: ["variant.product.name", 'variant.sku'],
        dateFields: movementDateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const [data, total] = await Promise.all([
        prisma_1.prisma.inventoryMovement.findMany({
            where,
            orderBy,
            skip,
            take,
            include: {
                variant: { include: { product: { select: { name: true } } } },
                location: true,
            },
        }),
        prisma_1.prisma.inventoryMovement.count({ where }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function addMovement(data) {
    let inventory = await prisma_1.prisma.inventory.findFirst({
        where: { variantId: data.variantId, locationId: data.locationId },
    });
    if (!inventory) {
        inventory = await prisma_1.prisma.inventory.create({
            data: {
                variantId: data.variantId,
                locationId: data.locationId,
                quantity: 0,
                reservedQuantity: 0,
            },
        });
    }
    const newQty = data.type === "PURCHASE" || data.type === "RETURN" || data.type === "TRANSFER"
        ? inventory.quantity + data.quantity
        : data.type === "SALE" || data.type === "ADJUSTMENT"
            ? inventory.quantity - data.quantity
            : inventory.quantity;
    const [movement] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.inventoryMovement.create({
            data: {
                variantId: data.variantId,
                locationId: data.locationId,
                inventoryId: inventory.id,
                type: data.type,
                quantity: data.quantity,
                referenceId: data.referenceId,
            },
        }),
        prisma_1.prisma.inventory.update({
            where: { id: inventory.id },
            data: { quantity: Math.max(0, newQty) },
        }),
    ]);
    return movement;
}
//# sourceMappingURL=inventory.service.js.map