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
async function addSalesFromShop(data) {
    const variant = await prisma_1.prisma.productVariant.findUnique({ where: { id: data.variantId } });
    if (!variant)
        throw new appError_1.default("Variant not found", 404);
    const location = await prisma_1.prisma.shopLocation.findUnique({ where: { id: data.locationId } });
    if (!location)
        throw new appError_1.default("Location not found", 404);
    // Use the compound unique constraint variantId + locationId as described in the schema
    const sales = await prisma_1.prisma.$transaction(async (tx) => {
        const sales = await tx.saleFromShop.create({
            data: {
                locationId: data.locationId,
                variantId: data.variantId,
                quantity: data.quantity,
                price: variant.price,
                total: variant.price * data.quantity
            },
        });
        await tx.inventory.update({
            where: {
                variantId_locationId: {
                    variantId: variant.id,
                    locationId: location.id,
                }
            },
            data: { quantity: { decrement: data.quantity } },
        });
        return sales;
    });
    return sales;
}
//# sourceMappingURL=shop.service.js.map