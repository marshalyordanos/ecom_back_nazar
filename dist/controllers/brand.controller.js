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
exports.deleteBrand = exports.updateBrand = exports.createBrand = exports.getBrandById = exports.listBrands = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const brandService = __importStar(require("../services/brand.service"));
const queryParser_1 = require("../utils/queryParser");
exports.listBrands = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const result = await brandService.listBrands(query);
    res.status(200).json(result);
});
exports.getBrandById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const brand = await brandService.getBrandById(req.params.id);
    res.status(200).json(brand);
});
exports.createBrand = (0, catchAsync_1.default)(async (req, res, _next) => {
    const brand = await brandService.createBrand(req.body);
    res.status(201).json(brand);
});
exports.updateBrand = (0, catchAsync_1.default)(async (req, res, _next) => {
    const brand = await brandService.updateBrand(req.params.id, req.body);
    res.status(200).json(brand);
});
exports.deleteBrand = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await brandService.deleteBrand(req.params.id);
    res.status(200).json(result);
});
//# sourceMappingURL=brand.controller.js.map