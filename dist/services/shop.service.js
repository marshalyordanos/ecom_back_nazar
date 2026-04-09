"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listShops = listShops;
exports.getShopById = getShopById;
exports.createOrUpdateShop = createOrUpdateShop;
exports.updateShop = updateShop;
exports.listShopLocations = listShopLocations;
exports.addShopLocation = addShopLocation;
exports.updateLocation = updateLocation;
exports.deleteLocation = deleteLocation;
exports.addSalesFromShop = addSalesFromShop;
exports.listSalesFromShop = listSalesFromShop;
exports.getSaleFromShopById = getSaleFromShopById;
exports.updateSaleFromShop = updateSaleFromShop;
exports.deleteSaleFromShop = deleteSaleFromShop;
exports.getSalesFromShopStats = getSalesFromShopStats;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("../config/cloudinary");
const searchableFields = ["name", "slug", "email", "description"];
const dateFields = ["createdAt", "updatedAt"];
async function listShops(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields,
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const [data, total] = await Promise.all([
        prisma_1.prisma.shop.findMany({
            where,
            orderBy,
            skip,
            take,
            select: {
                id: true,
                name: true,
                slug: true,
                email: true,
                phone: true,
                logoUrl: true,
                description: true,
                currency: true,
                timezone: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                locations: true
            },
        }),
        prisma_1.prisma.shop.count({ where }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getShopById(id) {
    const shop = await prisma_1.prisma.shop.findUnique({
        where: { id },
        include: { locations: true },
    });
    if (!shop)
        throw new appError_1.default("Shop not found", 404);
    return shop;
}
// Create or update the single shop (since only one shop row is allowed).
// If any shop exists, update it, otherwise create a new one.
// For logo, support uploading via Cloudinary if a file is provided.
async function createOrUpdateShop(data, file) {
    let logoUrl = data.logoUrl;
    if (file) {
        const fileBuffer = fs_1.default.readFileSync(file.path);
        const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, "ecommerce/shops", "image");
        fs_1.default.unlinkSync(file.path);
        if (uploadResult.secure_url) {
            logoUrl = uploadResult.secure_url;
        }
    }
    const existingShop = await prisma_1.prisma.shop.findFirst();
    if (existingShop) {
        // Update the only shop row
        const shop = await prisma_1.prisma.shop.update({
            where: { id: existingShop.id },
            data: {
                ...data,
                logoUrl,
            },
        });
        return shop;
    }
    else {
        // Create the shop row
        const shop = await prisma_1.prisma.shop.create({
            data: {
                ...data,
                logoUrl,
            },
        });
        return shop;
    }
}
async function updateShop(id, data, file) {
    let newData = { ...data };
    if (file) {
        const fileBuffer = fs_1.default.readFileSync(file.path);
        const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, "ecommerce/shops", "image");
        fs_1.default.unlinkSync(file.path);
        if (uploadResult.secure_url) {
            newData.logoUrl = uploadResult.secure_url;
        }
    }
    const shop = await prisma_1.prisma.shop.update({
        where: { id },
        data: newData,
    });
    return shop;
}
async function listShopLocations(shopId) {
    const locations = await prisma_1.prisma.shopLocation.findMany({
        where: { shopId },
        orderBy: { createdAt: "desc" },
    });
    return locations;
}
async function addShopLocation(shopId, data) {
    const location = await prisma_1.prisma.shopLocation.create({
        data: { shopId, ...data },
    });
    return location;
}
async function updateLocation(locationId, data) {
    const location = await prisma_1.prisma.shopLocation.update({
        where: { id: locationId },
        data: data,
    });
    return location;
}
async function deleteLocation(locationId) {
    await prisma_1.prisma.shopLocation.delete({ where: { id: locationId } });
    return { message: "Location deleted successfully" };
}
function normalizeSaleLines(body) {
    if (Array.isArray(body.items) && body.items.length > 0) {
        return body.items.map((row) => ({
            variantId: String(row.variantId ?? ""),
            quantity: Number(row.quantity),
        }));
    }
    if (body.variantId != null && body.quantity != null) {
        return [{ variantId: String(body.variantId), quantity: Number(body.quantity) }];
    }
    return [];
}
function mergeDuplicateVariantLines(lines) {
    const merged = new Map();
    for (const { variantId, quantity } of lines) {
        merged.set(variantId, (merged.get(variantId) ?? 0) + quantity);
    }
    return Array.from(merged.entries()).map(([variantId, quantity]) => ({ variantId, quantity }));
}
async function addSalesFromShop(body) {
    const { locationId } = body;
    if (!locationId || typeof locationId !== "string") {
        throw new appError_1.default("locationId is required", 400);
    }
    const rawItems = normalizeSaleLines(body);
    if (rawItems.length === 0) {
        throw new appError_1.default("items[] or variantId and quantity are required", 400);
    }
    for (const row of rawItems) {
        if (!row.variantId) {
            throw new appError_1.default("Each item must have a variantId", 400);
        }
        if (!Number.isFinite(row.quantity) || row.quantity < 1 || !Number.isInteger(row.quantity)) {
            throw new appError_1.default("Each quantity must be a positive integer", 400);
        }
    }
    const lines = mergeDuplicateVariantLines(rawItems);
    const location = await prisma_1.prisma.shopLocation.findUnique({ where: { id: locationId } });
    if (!location)
        throw new appError_1.default("Location not found", 404);
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const validated = [];
        for (const line of lines) {
            const variant = await tx.productVariant.findUnique({
                where: { id: line.variantId },
                include: { product: { select: { name: true } } },
            });
            if (!variant) {
                throw new appError_1.default("Variant not found", 404);
            }
            const inventory = await tx.inventory.findUnique({
                where: {
                    variantId_locationId: {
                        variantId: line.variantId,
                        locationId,
                    },
                },
            });
            if (!inventory) {
                const label = variant.product?.name ? `${variant.product.name} (${variant.sku})` : variant.sku;
                throw new appError_1.default(`No inventory for this variant at this location: ${label}`, 400);
            }
            if (inventory.quantity < line.quantity) {
                const label = variant.product?.name ? `${variant.product.name} (${variant.sku})` : variant.sku;
                throw new appError_1.default(`Insufficient stock for ${label}. Available: ${inventory.quantity}, requested: ${line.quantity}`, 400);
            }
            validated.push({ variantId: line.variantId, quantity: line.quantity, variant });
        }
        const sales = [];
        for (const row of validated) {
            const sale = await tx.saleFromShop.create({
                data: {
                    locationId,
                    variantId: row.variantId,
                    quantity: row.quantity,
                    price: row.variant.price,
                    total: row.variant.price * row.quantity,
                },
            });
            await tx.inventory.update({
                where: {
                    variantId_locationId: {
                        variantId: row.variantId,
                        locationId,
                    },
                },
                data: { quantity: { decrement: row.quantity } },
            });
            sales.push(sale);
        }
        return sales;
    });
    return { sales: result };
}
const saleFromShopInclude = {
    variant: {
        include: {
            product: { select: { id: true, name: true } },
        },
    },
    location: {
        include: {
            shop: { select: { id: true, name: true } },
        },
    },
};
const saleFromShopSearchableFields = [
    "variant.sku",
    "variant.product.name",
    "location.name",
    "location.shop.name",
];
const saleFromShopDateFields = ["createdAt", "updatedAt"];
async function listSalesFromShop(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: saleFromShopSearchableFields,
        dateFields: saleFromShopDateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const parts = [];
    if (Object.keys(where).length > 0)
        parts.push(where);
    if (query.shopId)
        parts.push({ location: { shopId: query.shopId } });
    if (query.locationId)
        parts.push({ locationId: query.locationId });
    const whereFinal = parts.length === 0 ? {} : parts.length === 1 ? parts[0] : { AND: parts };
    const [data, total] = await Promise.all([
        prisma_1.prisma.saleFromShop.findMany({
            where: whereFinal,
            orderBy,
            skip,
            take,
            include: saleFromShopInclude,
        }),
        prisma_1.prisma.saleFromShop.count({ where: whereFinal }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getSaleFromShopById(id) {
    const sale = await prisma_1.prisma.saleFromShop.findUnique({
        where: { id },
        include: saleFromShopInclude,
    });
    if (!sale)
        throw new appError_1.default("Sale not found", 404);
    return sale;
}
async function updateSaleFromShop(id, body) {
    if (body.variantId !== undefined || body.locationId !== undefined) {
        throw new appError_1.default("Cannot change variant or location on an existing sale", 400);
    }
    const hasQty = body.quantity !== undefined;
    const hasPrice = body.price !== undefined;
    if (!hasQty && !hasPrice) {
        throw new appError_1.default("quantity or price is required", 400);
    }
    return prisma_1.prisma.$transaction(async (tx) => {
        const sale = await tx.saleFromShop.findUnique({ where: { id } });
        if (!sale)
            throw new appError_1.default("Sale not found", 404);
        const newQty = hasQty ? Math.floor(Number(body.quantity)) : sale.quantity;
        const newPrice = hasPrice ? Number(body.price) : sale.price;
        if (!Number.isInteger(newQty) || newQty < 1) {
            throw new appError_1.default("quantity must be a positive integer", 400);
        }
        if (!Number.isFinite(newPrice) || newPrice < 0) {
            throw new appError_1.default("price must be a non-negative number", 400);
        }
        const delta = newQty - sale.quantity;
        if (delta !== 0) {
            const inv = await tx.inventory.findUnique({
                where: {
                    variantId_locationId: {
                        variantId: sale.variantId,
                        locationId: sale.locationId,
                    },
                },
            });
            if (!inv) {
                throw new appError_1.default("No inventory row for this variant at this location", 400);
            }
            if (delta > 0 && inv.quantity < delta) {
                throw new appError_1.default(`Insufficient stock. Available: ${inv.quantity}, additional units needed: ${delta}`, 400);
            }
            await tx.inventory.update({
                where: {
                    variantId_locationId: {
                        variantId: sale.variantId,
                        locationId: sale.locationId,
                    },
                },
                data: {
                    quantity: delta > 0 ? { decrement: delta } : { increment: -delta },
                },
            });
        }
        return tx.saleFromShop.update({
            where: { id },
            data: {
                quantity: newQty,
                price: newPrice,
                total: newQty * newPrice,
            },
            include: saleFromShopInclude,
        });
    });
}
async function deleteSaleFromShop(id) {
    await prisma_1.prisma.$transaction(async (tx) => {
        const sale = await tx.saleFromShop.findUnique({ where: { id } });
        if (!sale)
            throw new appError_1.default("Sale not found", 404);
        const inv = await tx.inventory.findUnique({
            where: {
                variantId_locationId: {
                    variantId: sale.variantId,
                    locationId: sale.locationId,
                },
            },
        });
        if (!inv) {
            throw new appError_1.default("Cannot restore stock: no inventory row for this variant at this location", 400);
        }
        await tx.inventory.update({
            where: {
                variantId_locationId: {
                    variantId: sale.variantId,
                    locationId: sale.locationId,
                },
            },
            data: { quantity: { increment: sale.quantity } },
        });
        await tx.saleFromShop.delete({ where: { id } });
    });
    return { message: "Sale deleted successfully" };
}
/** Stats use UTC calendar month boundaries for revenueThisMonth. */
async function getSalesFromShopStats() {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = now.getUTCMonth();
    const startOfMonth = new Date(Date.UTC(y, m, 1, 0, 0, 0, 0));
    const startOfNextMonth = new Date(Date.UTC(y, m + 1, 1, 0, 0, 0, 0));
    const [totals, monthTotals, totalRecords] = await Promise.all([
        prisma_1.prisma.saleFromShop.aggregate({
            _sum: { total: true, quantity: true },
        }),
        prisma_1.prisma.saleFromShop.aggregate({
            where: {
                createdAt: {
                    gte: startOfMonth,
                    lt: startOfNextMonth,
                },
            },
            _sum: { total: true },
        }),
        prisma_1.prisma.saleFromShop.count(),
    ]);
    return {
        totalRecords,
        totalRevenue: totals._sum.total ?? 0,
        totalQuantity: totals._sum.quantity ?? 0,
        revenueThisMonth: monthTotals._sum.total ?? 0,
    };
}
//# sourceMappingURL=shop.service.js.map