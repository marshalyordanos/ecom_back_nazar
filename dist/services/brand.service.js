"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBrands = listBrands;
exports.getBrandById = getBrandById;
exports.createBrand = createBrand;
exports.updateBrand = updateBrand;
exports.deleteBrand = deleteBrand;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const searchableFields = ["name", "slug", "description"];
const dateFields = ["createdAt"];
async function listBrands(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields,
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const [data, total] = await Promise.all([
        prisma_1.prisma.brand.findMany({ where, orderBy, skip, take }),
        prisma_1.prisma.brand.count({ where }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getBrandById(id) {
    const brand = await prisma_1.prisma.brand.findUnique({
        where: { id },
        include: { products: { take: 10 } },
    });
    if (!brand)
        throw new appError_1.default("Brand not found", 404);
    return brand;
}
async function createBrand(data) {
    const brand = await prisma_1.prisma.brand.create({
        data: {
            name: data.name,
            slug: data.slug,
            logoUrl: data.logoUrl,
            description: data.description,
            isFeatured: data.isFeatured ?? false,
        },
    });
    return brand;
}
async function updateBrand(id, data) {
    const brand = await prisma_1.prisma.brand.update({
        where: { id },
        data: data,
    });
    return brand;
}
async function deleteBrand(id) {
    await prisma_1.prisma.brand.delete({ where: { id } });
    return { message: "Brand deleted successfully" };
}
//# sourceMappingURL=brand.service.js.map