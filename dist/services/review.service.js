"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listReviewsByProduct = listReviewsByProduct;
exports.getReviewById = getReviewById;
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeature_1 = require("../utils/apiFeature");
const searchableFields = ["title", "comment"];
const dateFields = ["createdAt"];
async function listReviewsByProduct(productId, query) {
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: [],
        dateFields,
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const whereProduct = { ...where, productId };
    const [data, total] = await Promise.all([
        prisma_1.prisma.review.findMany({
            where: whereProduct,
            orderBy,
            skip,
            take,
            include: { user: { select: { id: true, firstName: true, lastName: true } } },
        }),
        prisma_1.prisma.review.count({ where: whereProduct }),
    ]);
    return { data, pagination: feature.getPagination(total) };
}
async function getReviewById(id) {
    const review = await prisma_1.prisma.review.findUnique({
        where: { id },
        include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
            product: { select: { id: true, name: true, slug: true } },
        },
    });
    if (!review)
        throw new appError_1.default("Review not found", 404);
    return review;
}
async function createReview(userId, productId, data) {
    const product = await prisma_1.prisma.product.findUnique({ where: { id: productId } });
    if (!product)
        throw new appError_1.default("Product not found", 404);
    const review = await prisma_1.prisma.review.create({
        data: {
            productId,
            userId,
            rating: data.rating,
            title: data.title,
            comment: data.comment,
            status: "PENDING",
        },
    });
    return review;
}
async function updateReview(id, userId, data) {
    const review = await prisma_1.prisma.review.findUnique({ where: { id } });
    if (!review)
        throw new appError_1.default("Review not found", 404);
    if (review.userId !== userId)
        throw new appError_1.default("You can only edit your own review", 403);
    const updated = await prisma_1.prisma.review.update({
        where: { id },
        data: data,
    });
    return updated;
}
async function deleteReview(id, userId, isAdmin) {
    const review = await prisma_1.prisma.review.findUnique({ where: { id } });
    if (!review)
        throw new appError_1.default("Review not found", 404);
    if (!isAdmin && review.userId !== userId)
        throw new appError_1.default("Forbidden", 403);
    await prisma_1.prisma.review.delete({ where: { id } });
    return { message: "Review deleted successfully" };
}
//# sourceMappingURL=review.service.js.map