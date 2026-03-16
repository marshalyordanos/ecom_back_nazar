"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getFeaturedProducts = getFeaturedProducts;
exports.createVariant = createVariant;
exports.updateVariant = updateVariant;
exports.deleteVariant = deleteVariant;
exports.addVariantMedia = addVariantMedia;
exports.removeVariantMedia = removeVariantMedia;
exports.listVariantOptions = listVariantOptions;
exports.getVariantOptionById = getVariantOptionById;
exports.createVariantOption = createVariantOption;
exports.updateVariantOption = updateVariantOption;
exports.deleteVariantOption = deleteVariantOption;
exports.listOptionValues = listOptionValues;
exports.getOptionValueById = getOptionValueById;
exports.createOptionValue = createOptionValue;
exports.updateOptionValue = updateOptionValue;
exports.deleteOptionValue = deleteOptionValue;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const searchableFields = ["name", "slug", "description", "shortDescription"];
const dateFields = ["createdAt", "updatedAt"];
async function listProducts(shopId, query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields,
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const whereWithShop = shopId ? { ...where, shopId } : where;
    const [data, total] = await Promise.all([
        prisma_1.prisma.product.findMany({
            where: whereWithShop,
            orderBy,
            skip,
            take,
            include: {
                brand: { select: { id: true, name: true, slug: true } },
                category: { select: { id: true, name: true, slug: true } },
                variants: {
                    take: 5,
                    include: { media: { take: 1 } },
                },
            },
        }),
        prisma_1.prisma.product.count({ where: whereWithShop }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getProductById(id, shopId) {
    const where = { id };
    if (shopId)
        where.shopId = shopId;
    const product = await prisma_1.prisma.product.findFirst({
        where,
        include: {
            shop: { select: { id: true, name: true, slug: true } },
            brand: true,
            category: true,
            variants: {
                include: {
                    media: { orderBy: { position: "asc" } },
                    inventories: { include: { location: true } },
                },
            },
        },
    });
    if (!product)
        throw new appError_1.default("Product not found", 404);
    return product;
}
async function createProduct(shopId, data) {
    const product = await prisma_1.prisma.product.create({
        data: {
            shopId,
            name: data.name,
            slug: data.slug,
            description: data.description,
            shortDescription: data.shortDescription,
            brandId: data.brandId,
            categoryId: data.categoryId,
            isFeatured: data.isFeatured ?? false,
            status: data.status,
        },
    });
    return product;
}
async function updateProduct(id, shopId, data) {
    const product = await prisma_1.prisma.product.update({
        where: { id },
        data: data,
    });
    return product;
}
async function deleteProduct(id, _shopId) {
    await prisma_1.prisma.product.delete({ where: { id } });
    return { message: "Product deleted successfully" };
}
async function getFeaturedProducts(shopId, limit = 10) {
    const where = { isFeatured: true, status: "ACTIVE" };
    if (shopId)
        where.shopId = shopId;
    const products = await prisma_1.prisma.product.findMany({
        where,
        take: limit,
        include: {
            brand: { select: { id: true, name: true, slug: true } },
            category: { select: { id: true, name: true, slug: true } },
            variants: {
                take: 3,
                include: { media: { take: 1 } },
            },
        },
    });
    return products;
}
// --------- Variants ---------
async function createVariant(productId, data) {
    const product = await prisma_1.prisma.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new appError_1.default("Product not found", 404);
    const variant = await prisma_1.prisma.productVariant.create({
        data: {
            productId,
            sku: data.sku,
            barcode: data.barcode,
            price: data.price,
            comparePrice: data.comparePrice,
            costPrice: data.costPrice,
            weight: data.weight,
            status: data.status,
        },
    });
    return variant;
}
async function updateVariant(variantId, data) {
    const variant = await prisma_1.prisma.productVariant.update({
        where: { id: variantId },
        data: data,
    });
    return variant;
}
async function deleteVariant(variantId) {
    await prisma_1.prisma.productVariant.delete({ where: { id: variantId } });
    return { message: "Variant deleted successfully" };
}
async function addVariantMedia(variantId, url, type, position) {
    const media = await prisma_1.prisma.variantMedia.create({
        data: { variantId, url, type, position: position ?? null },
    });
    return media;
}
async function removeVariantMedia(mediaId) {
    await prisma_1.prisma.variantMedia.delete({ where: { id: mediaId } });
    return { message: "Media removed successfully" };
}
// --------- VariantOption (e.g. Size, Color) ---------
async function listVariantOptions() {
    const options = await prisma_1.prisma.variantOption.findMany({
        orderBy: { name: "asc" },
        include: { values: true },
    });
    return options;
}
async function getVariantOptionById(optionId) {
    const option = await prisma_1.prisma.variantOption.findUnique({
        where: { id: optionId },
        include: { values: true },
    });
    if (!option)
        throw new appError_1.default("Variant option not found", 404);
    return option;
}
async function createVariantOption(data) {
    const option = await prisma_1.prisma.variantOption.create({
        data: { name: data.name },
    });
    return option;
}
async function updateVariantOption(optionId, data) {
    const option = await prisma_1.prisma.variantOption.update({
        where: { id: optionId },
        data: data,
    });
    return option;
}
async function deleteVariantOption(optionId) {
    await prisma_1.prisma.variantOption.delete({ where: { id: optionId } });
    return { message: "Variant option deleted successfully" };
}
// --------- OptionValue (e.g. S, M, L under Size) ---------
async function listOptionValues(optionId) {
    const option = await prisma_1.prisma.variantOption.findUnique({ where: { id: optionId } });
    if (!option)
        throw new appError_1.default("Variant option not found", 404);
    const values = await prisma_1.prisma.optionValue.findMany({
        where: { optionId },
        orderBy: { value: "asc" },
    });
    return values;
}
async function getOptionValueById(valueId) {
    const value = await prisma_1.prisma.optionValue.findUnique({
        where: { id: valueId },
        include: { option: true },
    });
    if (!value)
        throw new appError_1.default("Option value not found", 404);
    return value;
}
async function createOptionValue(optionId, data) {
    const option = await prisma_1.prisma.variantOption.findUnique({ where: { id: optionId } });
    if (!option)
        throw new appError_1.default("Variant option not found", 404);
    const optionValue = await prisma_1.prisma.optionValue.create({
        data: { optionId, value: data.value },
    });
    return optionValue;
}
async function updateOptionValue(valueId, data) {
    const optionValue = await prisma_1.prisma.optionValue.update({
        where: { id: valueId },
        data: data,
    });
    return optionValue;
}
async function deleteOptionValue(valueId) {
    await prisma_1.prisma.optionValue.delete({ where: { id: valueId } });
    return { message: "Option value deleted successfully" };
}
//# sourceMappingURL=product.service.js.map