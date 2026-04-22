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
exports.upsertPageByType = exports.getPageByType = void 0;
const joi_1 = __importDefault(require("joi"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const staticPageService = __importStar(require("../services/staticPage.service"));
const appError_1 = __importDefault(require("../utils/appError"));
const enums_1 = require("../generated/prisma/enums");
const STATIC_TYPES = new Set([
    enums_1.StaticPageType.privacy,
    enums_1.StaticPageType.terms,
    enums_1.StaticPageType.about,
]);
function parsePageType(param) {
    const t = param.toLowerCase();
    if (!STATIC_TYPES.has(t)) {
        throw new appError_1.default("Invalid page type", 400);
    }
    return t;
}
const upsertBodySchema = joi_1.default.object({
    content: joi_1.default.string().required().min(1),
});
/** Public */
exports.getPageByType = (0, catchAsync_1.default)(async (req, res, _next) => {
    const type = parsePageType(req.params.type);
    const page = await staticPageService.getStaticPageByType(type);
    res.status(200).json(page);
});
/** Admin */
exports.upsertPageByType = (0, catchAsync_1.default)(async (req, res, next) => {
    const type = parsePageType(req.params.type);
    const { error, value } = upsertBodySchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (error) {
        return next(new appError_1.default(error.details.map((d) => d.message).join("; "), 400));
    }
    const page = await staticPageService.upsertStaticPage(type, value.content);
    res.status(200).json(page);
});
//# sourceMappingURL=staticPage.controller.js.map