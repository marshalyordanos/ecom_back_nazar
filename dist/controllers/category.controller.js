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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.listCategories = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const categoryService = __importStar(require("../services/category.service"));
const queryParser_1 = require("../utils/queryParser");
exports.listCategories = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const tree = req.query.tree === "true";
    if (tree) {
        const data = await categoryService.listCategoriesTree();
        return res.status(200).json(data);
    }
    const result = await categoryService.listCategories(query);
    res.status(200).json(result);
});
exports.getCategoryById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json(category);
});
exports.createCategory = (0, catchAsync_1.default)(async (req, res, _next) => {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
});
exports.updateCategory = (0, catchAsync_1.default)(async (req, res, _next) => {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    res.status(200).json(category);
});
exports.deleteCategory = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await categoryService.deleteCategory(req.params.id);
    res.status(200).json(result);
});
//# sourceMappingURL=category.controller.js.map