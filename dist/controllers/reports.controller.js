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
exports.getCouponsReport = exports.getProductViewsReport = exports.getTopProductsReport = exports.getSyncReportById = exports.getSyncReport = exports.getInventoryReport = exports.getOrdersByStatus = exports.getOrdersReport = exports.getSalesReport = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const analyticsService = __importStar(require("../services/analytics.service"));
const dashboardService = __importStar(require("../services/dashboard.service"));
const syncService = __importStar(require("../services/sync.service"));
const prisma_1 = require("../lib/prisma");
const queryParser_1 = require("../utils/queryParser");
const apiFeature_1 = require("../utils/apiFeature");
function parseDate(val) {
    if (!val)
        return undefined;
    const d = new Date(String(val));
    return isNaN(d.getTime()) ? undefined : d;
}
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
    const query = (0, queryParser_1.parseListQuery)(req);
    const result = await analyticsService.getOrdersReport({
        shopId,
        startDate,
        endDate,
        status,
        page: query.page,
        pageSize: query.pageSize,
    });
    res.status(200).json(result);
});
exports.getOrdersByStatus = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getOrdersSummary(shopId);
    res.status(200).json(data);
});
exports.getInventoryReport = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getLowInventory(shopId);
    res.status(200).json(data);
});
exports.getSyncReport = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const shopId = req.query.shopId;
    const result = await syncService.listSyncLogs(shopId, query);
    res.status(200).json(result);
});
exports.getSyncReportById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const log = await syncService.getSyncLogById(req.params.id);
    res.status(200).json(log);
});
exports.getTopProductsReport = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 100);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getTopProducts(shopId, limit);
    res.status(200).json(data);
});
exports.getProductViewsReport = (0, catchAsync_1.default)(async (req, res, _next) => {
    const productId = req.query.productId;
    const startDate = parseDate(req.query.startDate);
    const endDate = parseDate(req.query.endDate);
    const result = await analyticsService.getProductViews({
        productId,
        startDate,
        endDate,
        limit: 500,
    });
    res.status(200).json(result);
});
exports.getCouponsReport = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const feature = new apiFeature_1.PrismaQueryFeature({
        ...query,
        searchableFields: ["code"],
        dateFields: ["createdAt", "expiresAt"],
    });
    const { skip, take, where, orderBy } = feature.getQuery();
    const [data, total] = await Promise.all([
        prisma_1.prisma.coupon.findMany({
            where,
            orderBy,
            skip,
            take,
            include: { _count: { select: { usages: true } } },
        }),
        prisma_1.prisma.coupon.count({ where }),
    ]);
    res.status(200).json({
        data,
        pagination: feature.getPagination(total),
    });
});
//# sourceMappingURL=reports.controller.js.map