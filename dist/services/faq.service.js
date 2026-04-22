"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPublishedFaqs = listPublishedFaqs;
exports.listFaqsAdmin = listFaqsAdmin;
exports.getFaqById = getFaqById;
exports.createFaq = createFaq;
exports.updateFaq = updateFaq;
exports.deleteFaq = deleteFaq;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
const enums_1 = require("../generated/prisma/enums");
async function listPublishedFaqs(query) {
    const { page, pageSize } = query;
    const skip = (page - 1) * pageSize;
    const where = { status: enums_1.FaqStatus.PUBLISHED };
    const [data, total] = await Promise.all([
        prisma_1.prisma.faq.findMany({
            where,
            orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
            skip,
            take: pageSize,
            select: {
                id: true,
                question: true,
                answer: true,
                sortOrder: true,
                createdAt: true,
                updatedAt: true,
            },
        }),
        prisma_1.prisma.faq.count({ where }),
    ]);
    return {
        data,
        pagination: {
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize) || 1,
        },
    };
}
async function listFaqsAdmin(query, statusFilter) {
    const { page, pageSize } = query;
    const skip = (page - 1) * pageSize;
    const where = statusFilter ? { status: statusFilter } : {};
    const [data, total] = await Promise.all([
        prisma_1.prisma.faq.findMany({
            where,
            orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
            skip,
            take: pageSize,
        }),
        prisma_1.prisma.faq.count({ where }),
    ]);
    return {
        data,
        pagination: {
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize) || 1,
        },
    };
}
async function getFaqById(id) {
    const faq = await prisma_1.prisma.faq.findUnique({ where: { id } });
    if (!faq) {
        throw new appError_1.default("FAQ not found", 404);
    }
    return faq;
}
async function createFaq(input) {
    return prisma_1.prisma.faq.create({
        data: {
            question: input.question,
            answer: input.answer,
            status: input.status ?? enums_1.FaqStatus.DRAFT,
            sortOrder: input.sortOrder ?? 0,
        },
    });
}
async function updateFaq(id, input) {
    await getFaqById(id);
    return prisma_1.prisma.faq.update({
        where: { id },
        data: input,
    });
}
async function deleteFaq(id) {
    await getFaqById(id);
    await prisma_1.prisma.faq.delete({ where: { id } });
    return { success: true };
}
//# sourceMappingURL=faq.service.js.map