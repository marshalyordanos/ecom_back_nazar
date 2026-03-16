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
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewById = exports.listByProduct = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const reviewService = __importStar(require("../services/review.service"));
const queryParser_1 = require("../utils/queryParser");
exports.listByProduct = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const result = await reviewService.listReviewsByProduct(req.params.id, query);
    res.status(200).json(result);
});
exports.getReviewById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const review = await reviewService.getReviewById(req.params.id);
    res.status(200).json(review);
});
exports.createReview = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { productId, rating, title, comment } = req.body;
    if (!productId || rating == null) {
        return res.status(400).json({ status: "fail", message: "productId and rating required" });
    }
    const review = await reviewService.createReview(req.user.id, productId, { rating, title, comment });
    res.status(201).json(review);
});
exports.updateReview = (0, catchAsync_1.default)(async (req, res, _next) => {
    const review = await reviewService.updateReview(req.params.id, req.user.id, req.body);
    res.status(200).json(review);
});
exports.deleteReview = (0, catchAsync_1.default)(async (req, res, _next) => {
    const isAdmin = req.user.roles.includes("admin");
    const result = await reviewService.deleteReview(req.params.id, req.user.id, isAdmin);
    res.status(200).json(result);
});
//# sourceMappingURL=review.controller.js.map