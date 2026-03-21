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
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("../config/cloudinary");
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
async function createBrand(data, file) {
    // console.log("brand file", req.files,req.file)
    if (!file) {
        throw new appError_1.default('No file uploaded', 400);
    }
    const fileBuffer = fs_1.default.readFileSync(file.path);
    console.log("brand11111111");
    // Upload to Cloudinary
    const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, 'ecommerce/brands', 'image');
    fs_1.default.unlinkSync(file.path);
    console.log("brand111111122221");
    const brand = await prisma_1.prisma.brand.create({
        data: {
            name: data.name,
            slug: data.slug,
            logoUrl: uploadResult.secure_url,
            description: data.description,
            isFeatured: Boolean(data.isFeatured) ?? false,
        },
    });
    return brand;
}
async function updateBrand(id, data, file) {
    if (!file) {
        throw new appError_1.default('No file uploaded', 400);
    }
    const fileBuffer = fs_1.default.readFileSync(file.path);
    // Upload to Cloudinary
    const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, 'ecommerce/brands', 'image');
    fs_1.default.unlinkSync(file.path);
    if (uploadResult.secure_url) {
        data.logoUrl = uploadResult.secure_url;
    }
    data.isFeatured = Boolean(data.isFeatured) ?? false;
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