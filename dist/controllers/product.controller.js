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
exports.assignVariantOptionValue = exports.removeVariantOptionValue = exports.setVariantOptionValues = exports.deleteOptionValue = exports.updateOptionValue = exports.createOptionValue = exports.getOptionValueById = exports.listOptionValues = exports.deleteVariantOption = exports.updateVariantOption = exports.createVariantOption = exports.getVariantOptionById = exports.listVariantOptions = exports.removeVariantMedia = exports.addVariantMedia = exports.deleteVariant = exports.updateVariant = exports.createVariant = exports.getVariantById = exports.getFeatured = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductByIdMobile = exports.getProductById = exports.listProducts = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const productService = __importStar(require("../services/product.service"));
const queryParser_1 = require("../utils/queryParser");
exports.listProducts = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const shopId = req.query.shopId;
    const track = req.query.track;
    const result = await productService.listProducts(shopId, track, query, req);
    res.status(200).json(result);
});
exports.getProductById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const product = await productService.getProductById(req.params.id, shopId);
    res.status(200).json(product);
});
exports.getProductByIdMobile = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const userId = req.body?.userId;
    const sessionId = req.body?.sessionId;
    const product = await productService.getProductByIdMobile(req.params.id, shopId, userId, sessionId);
    res.status(200).json(product);
});
exports.createProduct = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.shopId || req.body.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const product = await productService.createProduct(shopId, req.body);
    res.status(201).json(product);
});
exports.updateProduct = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.shopId || req.body.shopId;
    const product = await productService.updateProduct(req.params.id, shopId || "", req.body);
    res.status(200).json(product);
});
exports.deleteProduct = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.shopId;
    await productService.deleteProduct(req.params.id, shopId);
    res.status(200).json({ message: "Product deleted successfully" });
});
exports.getFeatured = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
    const products = await productService.getFeaturedProducts(shopId, limit);
    res.status(200).json(products);
});
exports.getVariantById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const variant = await productService.getVariantById(req.params.id);
    res.status(200).json(variant);
});
exports.createVariant = (0, catchAsync_1.default)(async (req, res, _next) => {
    const variant = await productService.createVariant(req.params.id, req.body, req.file);
    res.status(201).json(variant);
});
exports.updateVariant = (0, catchAsync_1.default)(async (req, res, _next) => {
    const variantId = req.params.variantId || req.params.id;
    const variant = await productService.updateVariant(variantId, req.body, req.file);
    res.status(200).json(variant);
});
exports.deleteVariant = (0, catchAsync_1.default)(async (req, res, _next) => {
    const variantId = req.params.variantId || req.params.id;
    await productService.deleteVariant(variantId);
    res.status(200).json({ message: "Variant deleted successfully" });
});
exports.addVariantMedia = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { url, type, position } = req.body;
    const variantId = req.params.variantId || req.params.id;
    if (!url || !type)
        return res.status(400).json({ status: "fail", message: "url and type required" });
    const media = await productService.addVariantMedia(variantId, url, type, position);
    res.status(201).json(media);
});
exports.removeVariantMedia = (0, catchAsync_1.default)(async (req, res, _next) => {
    const mediaId = req.params.mediaId || req.params.id;
    await productService.removeVariantMedia(mediaId);
    res.status(200).json({ message: "Media removed successfully" });
});
// --------- VariantOption ---------
exports.listVariantOptions = (0, catchAsync_1.default)(async (req, res, _next) => {
    const options = await productService.listVariantOptions();
    res.status(200).json(options);
});
exports.getVariantOptionById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const option = await productService.getVariantOptionById(req.params.optionId);
    res.status(200).json(option);
});
exports.createVariantOption = (0, catchAsync_1.default)(async (req, res, _next) => {
    const option = await productService.createVariantOption(req.body);
    res.status(201).json(option);
});
exports.updateVariantOption = (0, catchAsync_1.default)(async (req, res, _next) => {
    const option = await productService.updateVariantOption(req.params.optionId, req.body);
    res.status(200).json(option);
});
exports.deleteVariantOption = (0, catchAsync_1.default)(async (req, res, _next) => {
    await productService.deleteVariantOption(req.params.optionId);
    res.status(200).json({ message: "Variant option deleted successfully" });
});
// --------- OptionValue ---------
exports.listOptionValues = (0, catchAsync_1.default)(async (req, res, _next) => {
    const values = await productService.listOptionValues(req.params.optionId);
    res.status(200).json(values);
});
exports.getOptionValueById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const valueId = req.params.valueId || req.params.id;
    const value = await productService.getOptionValueById(valueId);
    res.status(200).json(value);
});
exports.createOptionValue = (0, catchAsync_1.default)(async (req, res, _next) => {
    const value = await productService.createOptionValue(req.params.optionId, req.body);
    res.status(201).json(value);
});
exports.updateOptionValue = (0, catchAsync_1.default)(async (req, res, _next) => {
    const valueId = req.params.valueId || req.params.id;
    const value = await productService.updateOptionValue(valueId, req.body);
    res.status(200).json(value);
});
exports.deleteOptionValue = (0, catchAsync_1.default)(async (req, res, _next) => {
    const valueId = req.params.valueId || req.params.id;
    await productService.deleteOptionValue(valueId);
    res.status(200).json({ message: "Option value deleted successfully" });
});
// --------- Variant Option Value Assignment Controllers ---------
exports.setVariantOptionValues = (0, catchAsync_1.default)(async (req, res, _next) => {
    // expects: req.params.variantId and req.body.optionValueIds (array)
    const variantId = req.params.variantId || req.params.id;
    const optionValueIds = req.body.optionValueIds;
    if (!Array.isArray(optionValueIds)) {
        return res.status(400).json({ status: "fail", message: "optionValueIds (array) is required" });
    }
    const updated = await productService.setVariantOptionValues(variantId, optionValueIds);
    res.status(200).json(updated);
});
exports.removeVariantOptionValue = (0, catchAsync_1.default)(async (req, res, _next) => {
    // expects: req.params.variantId, req.params.optionValueId (or req.body.optionValueId)
    const variantId = req.params.variantId || req.params.id;
    const optionValueId = req.params.optionValueId || req.body.optionValueId;
    if (!variantId || !optionValueId) {
        return res.status(400).json({ status: "fail", message: "variantId and optionValueId required" });
    }
    const result = await productService.removeVariantOptionValue(variantId, optionValueId);
    res.status(200).json(result);
});
exports.assignVariantOptionValue = (0, catchAsync_1.default)(async (req, res, _next) => {
    // expects: req.params.variantId, req.params.optionValueId (or both in req.body)
    const variantId = req.params.variantId || req.body.variantId || req.params.id;
    const optionValueId = req.params.optionValueId || req.body.optionValueId;
    if (!variantId || !optionValueId) {
        return res.status(400).json({ status: "fail", message: "variantId and optionValueId required" });
    }
    const result = await productService.assignVariantOptionValue(variantId, optionValueId);
    res.status(201).json(result);
});
//# sourceMappingURL=product.controller.js.map