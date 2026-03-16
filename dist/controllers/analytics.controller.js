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
exports.getOrdersReport = exports.getSalesReport = exports.getSearches = exports.getProductViews = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const analyticsService = __importStar(require("../services/analytics.service"));
function parseDate(val) {
    if (!val)
        return undefined;
    const d = new Date(String(val));
    return isNaN(d.getTime()) ? undefined : d;
}
exports.getProductViews = (0, catchAsync_1.default)(async (req, res, _next) => {
    const productId = req.query.productId;
    const startDate = parseDate(req.query.startDate);
    const endDate = parseDate(req.query.endDate);
    const limit = parseInt(String(req.query.limit), 10) || 100;
    const result = await analyticsService.getProductViews({
        productId,
        startDate,
        endDate,
        limit,
    });
    res.status(200).json(result);
});
exports.getSearches = (0, catchAsync_1.default)(async (req, res, _next) => {
    const startDate = parseDate(req.query.startDate);
    const endDate = parseDate(req.query.endDate);
    const limit = parseInt(String(req.query.limit), 10) || 100;
    const result = await analyticsService.getSearchLogs({ startDate, endDate, limit });
    res.status(200).json(result);
});
exports.getSalesReport = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const startDate = parseDate(req.query.startDate);
    const endDate = parseDate(req.query.endDate);
    const status = req.query.status;
    const result = await analyticsService.getSalesReport({ shopId, startDate, endDate, status });
    res.status(200).json(result);
});
exports.getOrdersReport = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const startDate = parseDate(req.query.startDate);
    const endDate = parseDate(req.query.endDate);
    const status = req.query.status;
    const page = parseInt(String(req.query.page), 10) || 1;
    const pageSize = parseInt(String(req.query.pageSize), 10) || 20;
    const result = await analyticsService.getOrdersReport({
        shopId,
        startDate,
        endDate,
        status,
        page,
        pageSize,
    });
    res.status(200).json(result);
});
//# sourceMappingURL=analytics.controller.js.map