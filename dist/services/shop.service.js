"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listShops = listShops;
exports.getShopById = getShopById;
exports.updateShop = updateShop;
exports.listShopLocations = listShopLocations;
exports.addShopLocation = addShopLocation;
exports.updateLocation = updateLocation;
exports.deleteLocation = deleteLocation;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
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
async function updateShop(id, data) {
    const shop = await prisma_1.prisma.shop.update({
        where: { id },
        data: data,
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
//# sourceMappingURL=shop.service.js.map