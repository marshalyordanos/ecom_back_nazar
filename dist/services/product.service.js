"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
exports.getProductById = getProductById;
exports.getProductByIdMobile = getProductByIdMobile;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.listVariants = listVariants;
exports.getFeaturedProducts = getFeaturedProducts;
exports.getNewProducts = getNewProducts;
exports.getPopularProducts = getPopularProducts;
exports.getMostViewedProducts = getMostViewedProducts;
exports.getVariantById = getVariantById;
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
exports.setVariantOptionValues = setVariantOptionValues;
exports.removeVariantOptionValue = removeVariantOptionValue;
exports.assignVariantOptionValue = assignVariantOptionValue;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("../config/cloudinary");
const searchableFieldsforVariant = ["product.name", "sku", "product.brand.name", "product.category.name", "product.description", "product.shortDescription"];
const searchableFields = ["name", "slug", "brand.name", "category.name", "description", "shortDescription"];
const dateFields = ["createdAt", "updatedAt"];
async function listProducts(shopId, track, query, req) {
    // 🔥 Save search log
    if ((query && query?.search !== "" || query?.filter !== "") && req?.user?.roles.includes("user")) {
        await prisma_1.prisma.searchLog.create({
            data: {
                query: query?.search || query?.filter || "",
                userId: req.user?.id || null,
            },
        });
    }
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields,
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    let whereWithShop = shopId ? { ...where, shopId } : where;
    if (track) {
        whereWithShop = { ...whereWithShop, category: { track: { contains: track } } };
    }
    const [data, total] = await Promise.all([
        prisma_1.prisma.product.findMany({
            where: whereWithShop,
            orderBy,
            skip,
            take,
            include: {
                brand: { select: { id: true, name: true, slug: true } },
                category: { select: { id: true, name: true, slug: true, image: true, track: true } },
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
                    variantOptionValues: {
                        include: { optionValue: { include: { option: true } } },
                    },
                },
            },
        },
    });
    if (!product)
        throw new appError_1.default("Product not found", 404);
    return product;
}
async function getProductByIdMobile(id, shopId, userId, sessionId) {
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
                    variantOptionValues: {
                        include: { optionValue: { include: { option: true } } },
                    },
                },
            },
        },
    });
    if (!product)
        throw new appError_1.default("Product not found", 404);
    // 🔥 Track view
    await prisma_1.prisma.productView.create({
        data: {
            productId: product.id,
            userId: userId || null,
            sessionId: sessionId || null,
        },
    });
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
async function listVariants(shopId, query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: searchableFieldsforVariant,
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    let whereWithShop = shopId ? { ...where, shopId } : where;
    const variants = await prisma_1.prisma.productVariant.findMany({
        where: whereWithShop,
        orderBy,
        skip,
        take,
        include: {
            product: { select: { id: true, name: true, slug: true, brand: { select: { id: true, name: true, slug: true } }, category: { select: { id: true, name: true, slug: true } } } },
            inventories: true,
            variantOptionValues: {
                include: { optionValue: { include: { option: true } } },
            },
            media: { orderBy: { position: "asc" } },
        },
    });
    const total = await prisma_1.prisma.productVariant.count({ where: whereWithShop });
    return { data: variants, pagination: feature.getPagination(total) };
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
async function getNewProducts(shopId, limit = 10) {
    const where = { status: "ACTIVE" };
    if (shopId)
        where.shopId = shopId;
    return prisma_1.prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
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
}
async function getPopularProducts(shopId, limit = 10) {
    const grouped = await prisma_1.prisma.orderItem.groupBy({
        by: ["variantId"],
        _sum: { quantity: true },
        where: shopId ? { order: { shopId } } : undefined,
        orderBy: { _sum: { quantity: "desc" } },
        take: Math.max(limit * 4, 20),
    });
    if (!grouped.length)
        return [];
    const variantIds = grouped.map((g) => g.variantId);
    const variants = await prisma_1.prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
        select: { id: true, productId: true },
    });
    const productIdsByVariantId = new Map(variants.map((v) => [v.id, v.productId]));
    const seen = new Set();
    const rankedProductIds = [];
    for (const row of grouped) {
        const productId = productIdsByVariantId.get(row.variantId);
        if (!productId || seen.has(productId))
            continue;
        seen.add(productId);
        rankedProductIds.push(productId);
        if (rankedProductIds.length >= limit)
            break;
    }
    if (!rankedProductIds.length)
        return [];
    const products = await prisma_1.prisma.product.findMany({
        where: { id: { in: rankedProductIds }, status: "ACTIVE" },
        include: {
            brand: { select: { id: true, name: true, slug: true } },
            category: { select: { id: true, name: true, slug: true } },
            variants: {
                take: 3,
                include: { media: { take: 1 } },
            },
        },
    });
    const byId = new Map(products.map((p) => [p.id, p]));
    return rankedProductIds.map((id) => byId.get(id)).filter(Boolean);
}
async function getMostViewedProducts(shopId, limit = 10) {
    const grouped = await prisma_1.prisma.productView.groupBy({
        by: ["productId"],
        where: shopId ? { product: { shopId } } : undefined,
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: Math.max(limit * 2, 20),
    });
    if (!grouped.length)
        return [];
    const rankedIds = grouped.map((g) => g.productId);
    const products = await prisma_1.prisma.product.findMany({
        where: { id: { in: rankedIds }, status: "ACTIVE" },
        include: {
            brand: { select: { id: true, name: true, slug: true } },
            category: { select: { id: true, name: true, slug: true } },
            variants: {
                take: 3,
                include: { media: { take: 1 } },
            },
        },
    });
    const byId = new Map(products.map((p) => [p.id, p]));
    return rankedIds.map((id) => byId.get(id)).filter(Boolean).slice(0, limit);
}
async function getVariantById(id) {
    const variant = await prisma_1.prisma.productVariant.findUnique({
        where: { id },
        include: {
            inventories: true,
            variantOptionValues: {
                include: { optionValue: { include: { option: true } } },
            },
            media: { orderBy: { position: "asc" } },
        },
    });
    return variant;
}
// --------- Variants ---------
async function createVariant(productId, data, file) {
    if (!file) {
        throw new appError_1.default('No file uploaded', 400);
    }
    const fileBuffer = fs_1.default.readFileSync(file.path);
    const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, "ecommerce/variants", "image");
    fs_1.default.unlinkSync(file.path);
    if (!uploadResult.secure_url) {
        throw new appError_1.default('Failed to upload image', 500);
    }
    const product = await prisma_1.prisma.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new appError_1.default("Product not found", 404);
    // Start Transaction
    const result = await prisma_1.prisma.$transaction(async (prismaTx) => {
        // 1. Create the product variant
        const variant = await prismaTx.productVariant.create({
            data: {
                productId,
                sku: data.sku,
                barcode: data.barcode,
                price: Number(data.price),
                comparePrice: Number(data.comparePrice),
                costPrice: Number(data.costPrice),
                weight: Number(data.weight),
                image: uploadResult.secure_url,
                status: data.status,
            },
            include: {
                inventories: true,
            },
        });
        // 2. Inventory logic ported from inventory.service.ts
        let locations = await prismaTx.shopLocation.findMany({
            where: {
                shopId: product.shopId,
            },
        });
        // create inventory for each location
        await Promise.all(locations.map(async (location) => {
            await prismaTx.inventory.create({
                data: {
                    variantId: variant.id,
                    locationId: location.id,
                    quantity: 0,
                    reservedQuantity: 0,
                },
            });
        }));
        return await prismaTx.productVariant.findUnique({
            where: { id: variant.id },
            include: {
                inventories: true,
            },
        });
        ;
    });
    // End Transaction
    return result;
}
async function updateVariant(variantId, data, file) {
    // if (!file) {
    //   throw new AppError('No file uploaded', 400);
    // }
    if (file) {
        const fileBuffer = fs_1.default.readFileSync(file.path);
        const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, "ecommerce/variants", "image");
        fs_1.default.unlinkSync(file.path);
        // if (!uploadResult.secure_url) {
        //   throw new AppError('Failed to upload image', 500);
        // }
        if (uploadResult.secure_url) {
            data.image = uploadResult.secure_url;
        }
    }
    if (data.price)
        data.price = Number(data.price);
    if (data.comparePrice)
        data.comparePrice = Number(data.comparePrice);
    if (data.costPrice)
        data.costPrice = Number(data.costPrice);
    if (data.weight)
        data.weight = Number(data.weight);
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
    const isColorOption = option.name.trim().toLowerCase() === "color";
    const optionValue = await prisma_1.prisma.optionValue.create({
        data: {
            optionId,
            value: data.value,
            colorValue: isColorOption ? data.colorValue ?? null : null,
        },
    });
    return optionValue;
}
async function updateOptionValue(valueId, data) {
    const existing = await prisma_1.prisma.optionValue.findUnique({
        where: { id: valueId },
        include: { option: true },
    });
    if (!existing)
        throw new appError_1.default("Option value not found", 404);
    const isColorOption = existing.option.name.trim().toLowerCase() === "color";
    const optionValue = await prisma_1.prisma.optionValue.update({
        where: { id: valueId },
        data: {
            ...(typeof data.value === "string" ? { value: data.value } : {}),
            ...(isColorOption
                ? { colorValue: data.colorValue ?? existing.colorValue ?? null }
                : { colorValue: null }),
        },
    });
    return optionValue;
}
async function deleteOptionValue(valueId) {
    await prisma_1.prisma.optionValue.delete({ where: { id: valueId } });
    return { message: "Option value deleted successfully" };
}
// --------- Assign and Remove Option Values to Product Variant ---------
/**
 * Assigns option values (array of optionValueIds) to the given variantId.
 * This will add any new values and remove any values not present in the array.
 */
async function setVariantOptionValues(variantId, optionValueIds) {
    // Ensure unique input, and check existence of the variant
    const uniqueOptionValueIds = Array.from(new Set(optionValueIds));
    const variant = await prisma_1.prisma.productVariant.findUnique({
        where: { id: variantId },
    });
    if (!variant)
        throw new appError_1.default("Variant not found", 404);
    // Get current values
    const current = await prisma_1.prisma.variantOptionValue.findMany({
        where: { variantId },
        select: { optionValueId: true },
    });
    const currentIds = new Set(current.map((v) => v.optionValueId));
    // Calculate adds and removes
    const toAdd = uniqueOptionValueIds.filter((id) => !currentIds.has(id));
    const toRemove = Array.from(currentIds).filter((id) => !uniqueOptionValueIds.includes(id));
    // Add missing values
    await Promise.all(toAdd.map((optionValueId) => prisma_1.prisma.variantOptionValue.create({
        data: { variantId, optionValueId },
    })));
    // Remove old values
    await Promise.all(toRemove.map((optionValueId) => prisma_1.prisma.variantOptionValue.deleteMany({
        where: { variantId, optionValueId },
    })));
    // Return updated variant with values
    const updated = await prisma_1.prisma.productVariant.findUnique({
        where: { id: variantId },
        include: {
            variantOptionValues: {
                include: { optionValue: { include: { option: true } } },
            }
        }
    });
    return updated;
}
/**
 * Remove a particular optionValue from the variant.
 */
async function removeVariantOptionValue(variantId, optionValueId) {
    await prisma_1.prisma.variantOptionValue.deleteMany({
        where: {
            variantId,
            optionValueId,
        },
    });
    return { message: "Variant option value removed successfully" };
}
/**
 * Add/Assign a particular optionValue to a variant (idempotent).
 */
async function assignVariantOptionValue(variantId, optionValueId) {
    // Checks for existing assignment
    const exists = await prisma_1.prisma.variantOptionValue.findUnique({
        where: { variantId_optionValueId: { variantId, optionValueId } },
    });
    if (exists)
        return exists;
    const result = await prisma_1.prisma.variantOptionValue.create({
        data: { variantId, optionValueId },
    });
    return result;
}
//# sourceMappingURL=product.service.js.map