"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategories = listCategories;
exports.listCategoriesTree = listCategoriesTree;
exports.getCategoryById = getCategoryById;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
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
async function listCategoriesTree() {
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
async function createCategory(data) {
    const category = await prisma_1.prisma.productCategory.create({
        data: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            parentId: data.parentId,
        },
    });
    return category;
}
async function updateCategory(id, data) {
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