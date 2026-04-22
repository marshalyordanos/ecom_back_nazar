"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticPageByType = getStaticPageByType;
exports.upsertStaticPage = upsertStaticPage;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
async function getStaticPageByType(type) {
    const page = await prisma_1.prisma.staticPage.findUnique({ where: { type } });
    if (!page) {
        throw new appError_1.default("Page not found", 404);
    }
    return page;
}
async function upsertStaticPage(type, content) {
    return prisma_1.prisma.staticPage.upsert({
        where: { type },
        create: { type, content },
        update: { content },
    });
}
//# sourceMappingURL=staticPage.service.js.map