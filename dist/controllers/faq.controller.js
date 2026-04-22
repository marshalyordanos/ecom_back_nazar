"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFaq = exports.updateFaq = exports.createFaq = exports.getFaqById = exports.listFaqsAdmin = exports.listPublishedFaqs = void 0;
const joi_1 = __importDefault(require("joi"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const faqService = __importStar(require("../services/faq.service"));
const queryParser_1 = require("../utils/queryParser");
const appError_1 = __importDefault(require("../utils/appError"));
const enums_1 = require("../generated/prisma/enums");
const createFaqSchema = joi_1.default.object({
    question: joi_1.default.string().trim().min(1).max(2000).required(),
    answer: joi_1.default.string().trim().min(1).required(),
    status: joi_1.default.string().valid(enums_1.FaqStatus.DRAFT, enums_1.FaqStatus.PUBLISHED),
    sortOrder: joi_1.default.number().integer().min(0),
});
const updateFaqSchema = joi_1.default.object({
    question: joi_1.default.string().trim().min(1).max(2000),
    answer: joi_1.default.string().trim().min(1),
    status: joi_1.default.string().valid(enums_1.FaqStatus.DRAFT, enums_1.FaqStatus.PUBLISHED),
    sortOrder: joi_1.default.number().integer().min(0),
}).min(1);
/** Public: published FAQs only. */
exports.listPublishedFaqs = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req, { maxPageSize: 100 });
    const result = await faqService.listPublishedFaqs(query);
    res.status(200).json(result);
});
/** Admin: paginated list, optional ?status=DRAFT|PUBLISHED */
exports.listFaqsAdmin = (0, catchAsync_1.default)(async (req, res, next) => {
    const query = (0, queryParser_1.parseListQuery)(req, { maxPageSize: 100 });
    const raw = typeof req.query.status === "string" ? req.query.status : undefined;
    let statusFilter;
    if (raw === enums_1.FaqStatus.DRAFT || raw === enums_1.FaqStatus.PUBLISHED) {
        statusFilter = raw;
    }
    else if (raw) {
        return next(new appError_1.default("Invalid status filter", 400));
    }
    const result = await faqService.listFaqsAdmin(query, statusFilter);
    res.status(200).json(result);
});
exports.getFaqById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const faq = await faqService.getFaqById(req.params.id);
    res.status(200).json(faq);
});
exports.createFaq = (0, catchAsync_1.default)(async (req, res, next) => {
    const { error, value } = createFaqSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (error) {
        return next(new appError_1.default(error.details.map((d) => d.message).join("; "), 400));
    }
    const faq = await faqService.createFaq(value);
    res.status(201).json(faq);
});
exports.updateFaq = (0, catchAsync_1.default)(async (req, res, next) => {
    const { error, value } = updateFaqSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (error) {
        return next(new appError_1.default(error.details.map((d) => d.message).join("; "), 400));
    }
    const faq = await faqService.updateFaq(req.params.id, value);
    res.status(200).json(faq);
});
exports.deleteFaq = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await faqService.deleteFaq(req.params.id);
    res.status(200).json(result);
});
//# sourceMappingURL=faq.controller.js.map