"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategories = listCategories;
exports.listCategoriesTree2 = listCategoriesTree2;
exports.listCategoriesTree = listCategoriesTree;
exports.getCategoryById = getCategoryById;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = require("../config/cloudinary");
const searchableFields = ["name", "slug", "description"];
const dateFields = ["createdAt"];
async function listCategories(query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields,
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const [data, total] = await Promise.all([
        prisma_1.prisma.productCategory.findMany({
            where,
            orderBy,
            skip,
            take,
            include: {
                parent: { select: { id: true, name: true, slug: true } },
                children: { select: { id: true, name: true, slug: true } },
            },
        }),
        prisma_1.prisma.productCategory.count({ where }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
/** Get categories as a tree (root categories with nested children). */
async function listCategoriesTree2() {
    const roots = await prisma_1.prisma.productCategory.findMany({
        where: { parentId: null },
        include: {
            children: {
                include: {
                    children: true,
                },
            },
        },
        orderBy: { name: "asc" },
    });
    return roots;
}
async function listCategoriesTree() {
    // Step 1: Get all categories (ensure track is string, not null)
    const allCategoriesRaw = await prisma_1.prisma.productCategory.findMany({
        select: {
            id: true,
            parentId: true,
            name: true,
            slug: true,
            description: true,
            image: true,
            track: true,
        },
        orderBy: { name: "asc" },
    });
    // Preprocessing for easier descendant lookup
<<<<<<< HEAD
    const allCategories = allCategoriesRaw.map((cat) => ({
=======
    const allCategories = allCategoriesRaw.map(cat => ({
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        id: cat.id,
        parentId: cat.parentId,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        track: cat.track ?? "",
    }));
    // Step 2: For every category, find all its descendant ids using track
    const categoryDescendants = {};
<<<<<<< HEAD
    const separator = "/";
    for (const cat of allCategories) {
        const trackPrefix = cat.track ? cat.track + separator : "";
=======
    const separator = '/';
    for (const cat of allCategories) {
        const trackPrefix = cat.track ? cat.track + separator : '';
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        // A category's descendants are any category whose track starts with cat.track + '/'
        categoryDescendants[cat.id] = new Set([cat.id]);
        for (const otherCat of allCategories) {
            if (otherCat.id !== cat.id &&
                otherCat.track &&
                cat.track &&
                otherCat.track.startsWith(trackPrefix)) {
                categoryDescendants[cat.id].add(otherCat.id);
            }
        }
    }
    // Step 3: For each category, gather product IDs for it + all descendants
    // Also, compute sales and product count for each category tree
    const salesInfoByCategory = {};
    for (const [catId, allIds] of Object.entries(categoryDescendants)) {
        // 1. All descendant categories (including itself)
        const categoryIds = Array.from(allIds);
        // 2. Fetch all products in these categories
        const products = await prisma_1.prisma.product.findMany({
            where: { categoryId: { in: categoryIds } },
<<<<<<< HEAD
            select: { id: true },
=======
            select: { id: true }
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        });
        const productIds = products.map((p) => p.id);
        let categoryTotalAmount = 0;
        let categoryTotalSold = 0;
        let categoryTotalProducts = productIds.length;
        if (productIds.length > 0) {
            // Compute aggregate order stats for all these products
            const res = await prisma_1.prisma.orderItem.aggregate({
                _sum: { total: true, quantity: true },
                where: { variant: { productId: { in: productIds } } },
            });
            categoryTotalAmount = res._sum.total ?? 0;
            categoryTotalSold = res._sum.quantity ?? 0;
        }
        salesInfoByCategory[catId] = {
            totalSalesAmount: categoryTotalAmount,
            totalProductsSold: categoryTotalSold,
            totalProducts: categoryTotalProducts,
        };
    }
    function buildTree(nodes, parentId) {
        return nodes
            .filter((node) => node.parentId === parentId)
            .map((node) => ({
            ...node,
            totalSalesAmount: salesInfoByCategory[node.id]?.totalSalesAmount || 0,
            totalProductsSold: salesInfoByCategory[node.id]?.totalProductsSold || 0,
            totalProducts: salesInfoByCategory[node.id]?.totalProducts || 0,
<<<<<<< HEAD
            children: buildTree(nodes, node.id),
=======
            children: buildTree(nodes, node.id)
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        }));
    }
    const tree = buildTree(allCategories, null);
    return tree;
}
async function getCategoryById(id) {
    const category = await prisma_1.prisma.productCategory.findUnique({
        where: { id },
        include: {
            parent: true,
            children: true,
            products: { take: 20 },
        },
    });
    if (!category)
        throw new appError_1.default("Category not found", 404);
    return category;
}
async function createCategory(data, file) {
    if (!file) {
<<<<<<< HEAD
        throw new appError_1.default("No file uploaded", 400);
    }
    const fileBuffer = fs_1.default.readFileSync(file.path);
    const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, "ecommerce/categories", "image");
    fs_1.default.unlinkSync(file.path);
    if (data.parentId) {
        const parent = await prisma_1.prisma.productCategory.findUnique({
            where: { id: data.parentId },
        });
        if (parent) {
            data.track = parent.track ?? "";
=======
        throw new appError_1.default('No file uploaded', 400);
    }
    const fileBuffer = fs_1.default.readFileSync(file.path);
    const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, 'ecommerce/categories', 'image');
    fs_1.default.unlinkSync(file.path);
    if (data.parentId) {
        const parent = await prisma_1.prisma.productCategory.findUnique({ where: { id: data.parentId } });
        if (parent) {
            data.track = parent.track ?? '';
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        }
    }
    const category = await prisma_1.prisma.productCategory.create({
        data: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            parentId: data.parentId,
            image: uploadResult.secure_url,
        },
    });
    if (category) {
        if (data.parentId) {
<<<<<<< HEAD
            return await prisma_1.prisma.productCategory.update({
                where: { id: category.id },
                data: { track: String(data.track) + "/" + String(category.id) },
            });
        }
        else {
            return await prisma_1.prisma.productCategory.update({
                where: { id: category.id },
                data: { track: String(category.id) },
            });
=======
            return await prisma_1.prisma.productCategory.update({ where: { id: category.id }, data: { track: String(data.track) + '/' + String(category.id) } });
        }
        else {
            return await prisma_1.prisma.productCategory.update({ where: { id: category.id }, data: { track: String(category.id) } });
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        }
    }
    return category;
}
async function updateCategory(id, data, file) {
    // if (!file) {
    //   throw new AppError('No file uploaded', 400);
    // }
    if (file) {
        const fileBuffer = fs_1.default.readFileSync(file.path);
<<<<<<< HEAD
        const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, "ecommerce/categories", "image");
=======
        const uploadResult = await (0, cloudinary_1.uploadToCloudinary)(fileBuffer, 'ecommerce/categories', 'image');
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
        fs_1.default.unlinkSync(file.path);
        if (uploadResult.secure_url) {
            data.image = uploadResult.secure_url;
        }
    }
    if (data.parentId === "") {
        data.parentId = null;
    }
    const category = await prisma_1.prisma.productCategory.update({
        where: { id },
        data: data,
    });
    return category;
}
async function deleteCategory(id) {
    await prisma_1.prisma.productCategory.delete({ where: { id } });
    return { message: "Category deleted successfully" };
}
//# sourceMappingURL=category.service.js.map