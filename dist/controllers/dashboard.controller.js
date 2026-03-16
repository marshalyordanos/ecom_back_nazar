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
exports.getRecentActivities = exports.getRecentOrders = exports.getNewCustomers = exports.getLowInventory = exports.getTopProducts = exports.getOrdersSummary = exports.getSalesSummary = exports.getOverview = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const dashboardService = __importStar(require("../services/dashboard.service"));
exports.getOverview = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId || req.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getOverview(shopId);
    res.status(200).json(data);
});
exports.getSalesSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const groupBy = req.query.groupBy || "day";
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getSalesSummary(shopId, groupBy);
    res.status(200).json(data);
});
exports.getOrdersSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getOrdersSummary(shopId);
    res.status(200).json(data);
});
exports.getTopProducts = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getTopProducts(shopId, limit);
    res.status(200).json(data);
});
exports.getLowInventory = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getLowInventory(shopId);
    res.status(200).json(data);
});
exports.getNewCustomers = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const count = await dashboardService.getNewCustomers(shopId, days);
    res.status(200).json({ count });
});
exports.getRecentOrders = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getRecentOrders(shopId, limit);
    res.status(200).json(data);
});
exports.getRecentActivities = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId || req.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
    const data = await dashboardService.getRecentActivities(shopId || "", limit);
    res.status(200).json(data);
});
//# sourceMappingURL=dashboard.controller.js.map