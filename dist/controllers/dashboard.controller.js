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
exports.getInventoryAlerts = exports.getInventoryTurnover = exports.getInventoryValuation = exports.getCustomerSegments = exports.getCustomerLTV = exports.getCustomerRetention = exports.getCustomerGrowth = exports.getBrandStats = exports.getCategoryStats = exports.getProductConversion = exports.getProductPerformance = exports.getAbandonedOrders = exports.getOrderValueStats = exports.getOrderFulfillmentStats = exports.getOrderStatusStats = exports.getRefundStats = exports.getSalesForecast = exports.getSalesByChannel = exports.getSalesTrends = exports.getSearchSummary = exports.getNotificationSummary = exports.getReviewSummary = exports.getCouponUsageSummary = exports.getCouponSummary = exports.getLocationSummary = exports.getShopSummary = exports.getOutOfStock = exports.getLowStockCount = exports.getInventorySummary = exports.getVariantSummary = exports.getProductSummary = exports.getDailyPayments = exports.getPaymentMethodStats = exports.getPaymentSummary = exports.getDailyOrdersSummary = exports.getOrderRevenueSummary = exports.getOrderSummaryExtended = exports.getUserVerificationStats = exports.getUserSummary = exports.getSummaryWithDetails = exports.getShopDashboardSummary = exports.getRecentActivities = exports.getRecentOrders = exports.getNewCustomers = exports.getLowInventory = exports.getTopProducts = exports.getOrdersSummary = exports.getSalesSummary = exports.getOverview = exports.getSummary = void 0;
exports.getUnreadNotifications = exports.getSyncStatus = exports.getSystemHealth = exports.getMostViewedProducts = exports.getNoResultSearches = exports.getTopSearchQueries = exports.getInventoryActivities = exports.getUserActivities = exports.getOrderActivities = exports.getPendingReviews = exports.getRecentReviews = exports.getRatingDistribution = exports.getExpiredCoupons = exports.getActiveCoupons = exports.getCouponPerformance = exports.getInventoryByLocation = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const dashboardService = __importStar(require("../services/dashboard.service"));
exports.getSummary = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const data = await dashboardService.getGlobalDashboardSummary();
    res.status(200).json({ data });
});
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
// ===============================
// 📊 SHOP KPI (requires shopId)
// ===============================
exports.getShopDashboardSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getShopDashboardSummary(shopId);
    res.status(200).json(data);
});
exports.getSummaryWithDetails = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getSummaryWithDetails(shopId);
    res.status(200).json(data);
});
// ===============================
// 👤 USER SUMMARY
// ===============================
exports.getUserSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getUserSummary(shopId, days);
    res.status(200).json(data);
});
exports.getUserVerificationStats = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getUserVerificationStats(shopId);
    res.status(200).json(data);
});
// ===============================
// 📦 ORDER SUMMARY
// ===============================
exports.getOrderSummaryExtended = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getOrderSummaryExtended(shopId);
    res.status(200).json(data);
});
exports.getOrderRevenueSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getOrderRevenueSummary(shopId);
    res.status(200).json(data);
});
exports.getDailyOrdersSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getDailyOrdersSummary(shopId, days);
    res.status(200).json(data);
});
// ===============================
// 💳 PAYMENT SUMMARY
// ===============================
exports.getPaymentSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getPaymentSummary(shopId);
    res.status(200).json(data);
});
exports.getPaymentMethodStats = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getPaymentMethodStats(shopId);
    res.status(200).json(data);
});
exports.getDailyPayments = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getDailyPayments(shopId, days);
    res.status(200).json(data);
});
// ===============================
// 🛍 PRODUCT SUMMARY
// ===============================
exports.getProductSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getProductSummary(shopId);
    res.status(200).json(data);
});
exports.getVariantSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getVariantSummary(shopId);
    res.status(200).json(data);
});
// ===============================
// 📦 INVENTORY SUMMARY
// ===============================
exports.getInventorySummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getInventorySummary(shopId);
    res.status(200).json(data);
});
exports.getLowStockCount = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getLowStockCount(shopId);
    res.status(200).json(data);
});
exports.getOutOfStock = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getOutOfStock(shopId);
    res.status(200).json(data);
});
// ===============================
// 🏪 SHOP SUMMARY
// ===============================
exports.getShopSummary = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const data = await dashboardService.getShopSummary();
    res.status(200).json(data);
});
exports.getLocationSummary = (0, catchAsync_1.default)(async (_req, res, _next) => {
    const data = await dashboardService.getLocationSummary();
    res.status(200).json(data);
});
// ===============================
// 🎟 COUPON SUMMARY
// ===============================
exports.getCouponSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getCouponSummary(shopId);
    res.status(200).json(data);
});
exports.getCouponUsageSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getCouponUsageSummary(shopId);
    res.status(200).json(data);
});
// ===============================
// ⭐ REVIEW SUMMARY
// ===============================
exports.getReviewSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getReviewSummary(shopId);
    res.status(200).json(data);
});
// ===============================
// 🔔 NOTIFICATION SUMMARY
// ===============================
exports.getNotificationSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getNotificationSummary(shopId);
    res.status(200).json(data);
});
// ===============================
// 🔍 SEARCH SUMMARY
// ===============================
exports.getSearchSummary = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getSearchSummary(shopId, days);
    res.status(200).json(data);
});
// ===============================
// 💰 SALES ANALYTICS
// ===============================
exports.getSalesTrends = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const groupBy = req.query.groupBy || "day";
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getSalesTrends(shopId, groupBy, days);
    res.status(200).json(data);
});
exports.getSalesByChannel = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getSalesByChannel(shopId, days);
    res.status(200).json(data);
});
exports.getSalesForecast = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const historyDays = parseInt(String(req.query.historyDays), 10) || 30;
    const forecastDays = parseInt(String(req.query.forecastDays), 10) || 7;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getSalesForecast(shopId, historyDays, forecastDays);
    res.status(200).json(data);
});
exports.getRefundStats = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 90;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getRefundStats(shopId, days);
    res.status(200).json(data);
});
// ===============================
// 📦 ORDER ANALYTICS
// ===============================
exports.getOrderStatusStats = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getOrderStatusStats(shopId, days);
    res.status(200).json(data);
});
exports.getOrderFulfillmentStats = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getOrderFulfillmentStats(shopId, days);
    res.status(200).json(data);
});
exports.getOrderValueStats = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 90;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getOrderValueStats(shopId, days);
    res.status(200).json(data);
});
exports.getAbandonedOrders = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const minAgeDays = parseInt(String(req.query.minAgeDays), 10) || 1;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getAbandonedOrders(shopId, minAgeDays);
    res.status(200).json(data);
});
// ===============================
// 🛍 PRODUCT ANALYTICS
// ===============================
exports.getProductPerformance = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 90;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getProductPerformance(shopId, days, limit);
    res.status(200).json(data);
});
exports.getProductConversion = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getProductConversion(shopId, days, limit);
    res.status(200).json(data);
});
exports.getCategoryStats = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 90;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getCategoryStats(shopId, days);
    res.status(200).json(data);
});
exports.getBrandStats = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 90;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getBrandStats(shopId, days);
    res.status(200).json(data);
});
// ===============================
// 👥 CUSTOMER ANALYTICS
// ===============================
exports.getCustomerGrowth = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getCustomerGrowth(shopId, days);
    res.status(200).json(data);
});
exports.getCustomerRetention = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getCustomerRetention(shopId, days);
    res.status(200).json(data);
});
exports.getCustomerLTV = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 90;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getCustomerLTV(shopId, days);
    res.status(200).json(data);
});
exports.getCustomerSegments = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 90;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getCustomerSegments(shopId, days);
    res.status(200).json(data);
});
// ===============================
// 📦 INVENTORY ANALYTICS
// ===============================
exports.getInventoryValuation = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getInventoryValuation(shopId);
    res.status(200).json(data);
});
exports.getInventoryTurnover = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getInventoryTurnover(shopId, days);
    res.status(200).json(data);
});
exports.getInventoryAlerts = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 50, 200);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getInventoryAlerts(shopId, limit);
    res.status(200).json(data);
});
exports.getInventoryByLocation = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getInventoryByLocation(shopId);
    res.status(200).json(data);
});
// ===============================
// 🎟 COUPONS / PROMOTIONS
// ===============================
exports.getCouponPerformance = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getCouponPerformance(shopId, limit);
    res.status(200).json(data);
});
exports.getActiveCoupons = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 50, 200);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getActiveCoupons(shopId, limit);
    res.status(200).json(data);
});
exports.getExpiredCoupons = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 50, 200);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getExpiredCoupons(shopId, limit);
    res.status(200).json(data);
});
// ===============================
// ⭐ REVIEWS & RATINGS
// ===============================
exports.getRatingDistribution = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getRatingDistribution(shopId);
    res.status(200).json(data);
});
exports.getRecentReviews = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getRecentReviews(shopId, limit);
    res.status(200).json(data);
});
exports.getPendingReviews = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getPendingReviews(shopId, limit);
    res.status(200).json(data);
});
// ===============================
// 🔔 ACTIVITY / SYSTEM LOGS
// ===============================
exports.getOrderActivities = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 30, 200);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getOrderActivities(shopId, limit);
    res.status(200).json(data);
});
exports.getUserActivities = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getUserActivities(shopId, days, limit);
    res.status(200).json(data);
});
exports.getInventoryActivities = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 50, 300);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getInventoryActivities(shopId, limit);
    res.status(200).json(data);
});
// ===============================
// 🔍 SEARCH & BEHAVIOR
// ===============================
exports.getTopSearchQueries = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getTopSearchQueries(shopId, days, limit);
    res.status(200).json(data);
});
exports.getNoResultSearches = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const days = parseInt(String(req.query.days), 10) || 30;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getNoResultSearches(shopId, days, limit);
    res.status(200).json(data);
});
exports.getMostViewedProducts = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const data = await dashboardService.getMostViewedProducts(shopId, limit);
    res.status(200).json(data);
});
// ===============================
// ⚙️ SYSTEM / SHOP HEALTH
// ===============================
exports.getSystemHealth = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const data = await dashboardService.getSystemHealth(shopId);
    res.status(200).json(data);
});
exports.getSyncStatus = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
    const data = await dashboardService.getSyncStatus(shopId, limit);
    res.status(200).json(data);
});
exports.getUnreadNotifications = (0, catchAsync_1.default)(async (req, res, _next) => {
    const userId = req.query.userId;
    const data = await dashboardService.getUnreadNotifications(userId);
    res.status(200).json(data);
});
//# sourceMappingURL=dashboard.controller.js.map