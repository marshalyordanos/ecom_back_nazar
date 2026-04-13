import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as dashboardService from "../services/dashboard.service";
import type { AuthRequest } from "../middleware/auth.middleware";
import { calculateTrend, DashboardResponse, formatCard, getDateRanges } from "../utils/helper";
import { prisma } from "../lib/prisma";

export const getSummary = catchAsync(async (_req: AuthRequest, res: Response, _next: NextFunction) => {
  const data = await dashboardService.getGlobalDashboardSummary();
  res.status(200).json({ data });
});

export const getGlobalRevenueSeries = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const days = parseInt(String(req.query.days), 10) || 30;
  const data = await dashboardService.getGlobalRevenueSeries(days);
  res.status(200).json({ data });
});

export const getGlobalOrdersCountSeries = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const days = parseInt(String(req.query.days), 10) || 30;
  const data = await dashboardService.getGlobalOrdersCountSeries(days);
  res.status(200).json({ data });
});

export const getGlobalOrderStatusDistribution = catchAsync(async (_req: AuthRequest, res: Response, _next: NextFunction) => {
  const data = await dashboardService.getGlobalOrderStatusDistribution();
  res.status(200).json({ data });
});

export const getGlobalPaymentsSeries = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const days = parseInt(String(req.query.days), 10) || 30;
  const data = await dashboardService.getGlobalPaymentsSeries(days);
  res.status(200).json({ data });
});

export const getOverview = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string || (req as any).shopId;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOverview(shopId);
  res.status(200).json(data);
});

export const getSalesSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const groupBy = (req.query.groupBy as "day" | "week" | "month") || "day";
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getSalesSummary(shopId, groupBy);
  res.status(200).json(data);
});

export const getOrdersSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOrdersSummary(shopId);
  res.status(200).json(data);
});

export const getTopProducts = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getTopProducts(shopId, limit);
  res.status(200).json(data);
});

export const getLowInventory = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getLowInventory(shopId);
  res.status(200).json(data);
});

export const getNewCustomers = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const count = await dashboardService.getNewCustomers(shopId, days);
  res.status(200).json({ count });
});

export const getRecentOrders = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getRecentOrders(shopId, limit);
  res.status(200).json(data);
});

export const getRecentActivities = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string || (req as any).shopId;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
  const data = await dashboardService.getRecentActivities(shopId || "", limit);
  res.status(200).json(data);
});

// ===============================
// 📊 SHOP KPI (requires shopId)
// ===============================
export const getShopDashboardSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getShopDashboardSummary(shopId);
  res.status(200).json(data);
});
export const getSummaryWithDetails = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getSummaryWithDetails(shopId);
  res.status(200).json(data);
});
// ===============================
// 👤 USER SUMMARY
// ===============================
export const getUserSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getUserSummary(shopId, days);
  res.status(200).json(data);
});

export const getUserVerificationStats = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getUserVerificationStats(shopId);
  res.status(200).json(data);
});

// ===============================
// 📦 ORDER SUMMARY
// ===============================
export const getOrderSummaryExtended = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOrderSummaryExtended(shopId);
  res.status(200).json(data);
});

export const getOrderRevenueSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOrderRevenueSummary(shopId);
  res.status(200).json(data);
});

export const getDailyOrdersSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getDailyOrdersSummary(shopId, days);
  res.status(200).json(data);
});

// ===============================
// 💳 PAYMENT SUMMARY
// ===============================
export const getPaymentSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getPaymentSummary(shopId);
  res.status(200).json(data);
});

export const getPaymentMethodStats = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getPaymentMethodStats(shopId);
  res.status(200).json(data);
});

export const getDailyPayments = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getDailyPayments(shopId, days);
  res.status(200).json(data);
});

// ===============================
// 🛍 PRODUCT SUMMARY
// ===============================
export const getProductSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getProductSummary(shopId);
  res.status(200).json(data);
});

export const getVariantSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getVariantSummary(shopId);
  res.status(200).json(data);
});

// ===============================
// 📦 INVENTORY SUMMARY
// ===============================
export const getInventorySummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getInventorySummary(shopId);
  res.status(200).json(data);
});

export const getLowStockCount = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getLowStockCount(shopId);
  res.status(200).json(data);
});

export const getOutOfStock = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOutOfStock(shopId);
  res.status(200).json(data);
});

// ===============================
// 🏪 SHOP SUMMARY
// ===============================
export const getShopSummary = catchAsync(async (_req: AuthRequest, res: Response, _next: NextFunction) => {
  const data = await dashboardService.getShopSummary();
  res.status(200).json(data);
});

export const getLocationSummary = catchAsync(async (_req: AuthRequest, res: Response, _next: NextFunction) => {
  const data = await dashboardService.getLocationSummary();
  res.status(200).json(data);
});

// ===============================
// 🎟 COUPON SUMMARY
// ===============================
export const getCouponSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getCouponSummary(shopId);
  res.status(200).json(data);
});

export const getCouponUsageSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getCouponUsageSummary(shopId);
  res.status(200).json(data);
});

// ===============================
// ⭐ REVIEW SUMMARY
// ===============================
export const getReviewSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getReviewSummary(shopId);
  res.status(200).json(data);
});

// ===============================
// 🔔 NOTIFICATION SUMMARY
// ===============================
export const getNotificationSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getNotificationSummary(shopId);
  res.status(200).json(data);
});

// ===============================
// 🔍 SEARCH SUMMARY
// ===============================
export const getSearchSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getSearchSummary(shopId, days);
  res.status(200).json(data);
});

// ===============================
// 💰 SALES ANALYTICS
// ===============================
export const getSalesTrends = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const groupBy = (req.query.groupBy as "day" | "week" | "month") || "day";
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getSalesTrends(shopId, groupBy, days);
  res.status(200).json(data);
});

export const getSalesByChannel = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getSalesByChannel(shopId, days);
  res.status(200).json(data);
});

export const getSalesForecast = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const historyDays = parseInt(String(req.query.historyDays), 10) || 30;
  const forecastDays = parseInt(String(req.query.forecastDays), 10) || 7;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getSalesForecast(shopId, historyDays, forecastDays);
  res.status(200).json(data);
});

export const getRefundStats = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 90;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getRefundStats(shopId, days);
  res.status(200).json(data);
});

// ===============================
// 📦 ORDER ANALYTICS
// ===============================
export const getOrderStatusStats = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOrderStatusStats(shopId, days);
  res.status(200).json(data);
});

export const getOrderFulfillmentStats = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOrderFulfillmentStats(shopId, days);
  res.status(200).json(data);
});

export const getOrderValueStats = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 90;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOrderValueStats(shopId, days);
  res.status(200).json(data);
});

export const getAbandonedOrders = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const minAgeDays = parseInt(String(req.query.minAgeDays), 10) || 1;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getAbandonedOrders(shopId, minAgeDays);
  res.status(200).json(data);
});

// ===============================
// 🛍 PRODUCT ANALYTICS
// ===============================
export const getProductPerformance = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 90;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getProductPerformance(shopId, days, limit);
  res.status(200).json(data);
});

export const getProductConversion = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getProductConversion(shopId, days, limit);
  res.status(200).json(data);
});

export const getCategoryStats = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 90;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getCategoryStats(shopId, days);
  res.status(200).json(data);
});

export const getBrandStats = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 90;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getBrandStats(shopId, days);
  res.status(200).json(data);
});

// ===============================
// 👥 CUSTOMER ANALYTICS
// ===============================
export const getCustomerGrowth = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getCustomerGrowth(shopId, days);
  res.status(200).json(data);
});

export const getCustomerRetention = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getCustomerRetention(shopId, days);
  res.status(200).json(data);
});

export const getCustomerLTV = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 90;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getCustomerLTV(shopId, days);
  res.status(200).json(data);
});

export const getCustomerSegments = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 90;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getCustomerSegments(shopId, days);
  res.status(200).json(data);
});

// ===============================
// 📦 INVENTORY ANALYTICS
// ===============================
export const getInventoryValuation = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getInventoryValuation(shopId);
  res.status(200).json(data);
});

export const getInventoryTurnover = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getInventoryTurnover(shopId, days);
  res.status(200).json(data);
});

export const getInventoryAlerts = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 50, 200);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getInventoryAlerts(shopId, limit);
  res.status(200).json(data);
});

export const getInventoryByLocation = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getInventoryByLocation(shopId);
  res.status(200).json(data);
});

// ===============================
// 🎟 COUPONS / PROMOTIONS
// ===============================
export const getCouponPerformance = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getCouponPerformance(shopId, limit);
  res.status(200).json(data);
});

export const getActiveCoupons = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 50, 200);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getActiveCoupons(shopId, limit);
  res.status(200).json(data);
});

export const getExpiredCoupons = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 50, 200);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getExpiredCoupons(shopId, limit);
  res.status(200).json(data);
});

// ===============================
// ⭐ REVIEWS & RATINGS
// ===============================
export const getRatingDistribution = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getRatingDistribution(shopId);
  res.status(200).json(data);
});

export const getRecentReviews = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getRecentReviews(shopId, limit);
  res.status(200).json(data);
});

export const getPendingReviews = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getPendingReviews(shopId, limit);
  res.status(200).json(data);
});

// ===============================
// 🔔 ACTIVITY / SYSTEM LOGS
// ===============================
export const getOrderActivities = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 30, 200);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOrderActivities(shopId, limit);
  res.status(200).json(data);
});

export const getUserActivities = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getUserActivities(shopId, days, limit);
  res.status(200).json(data);
});

export const getInventoryActivities = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 50, 300);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getInventoryActivities(shopId, limit);
  res.status(200).json(data);
});

// ===============================
// 🔍 SEARCH & BEHAVIOR
// ===============================
export const getTopSearchQueries = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getTopSearchQueries(shopId, days, limit);
  res.status(200).json(data);
});

export const getNoResultSearches = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getNoResultSearches(shopId, days, limit);
  res.status(200).json(data);
});

export const getMostViewedProducts = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getMostViewedProducts(shopId, limit);
  res.status(200).json(data);
});

// ===============================
// ⚙️ SYSTEM / SHOP HEALTH
// ===============================
export const getSystemHealth = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string | undefined;
  const data = await dashboardService.getSystemHealth(shopId);
  res.status(200).json(data);
});

export const getSyncStatus = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string | undefined;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
  const data = await dashboardService.getSyncStatus(shopId, limit);
  res.status(200).json(data);
});

export const getUnreadNotifications = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const userId = req.query.userId as string | undefined;
  const data = await dashboardService.getUnreadNotifications(userId);
  res.status(200).json(data);
});




// ===============================  customer dashboard  ===============================

//////////////////////////////////////////////////////
// CONTROLLER
//////////////////////////////////////////////////////

// export const getCustomerDashboardCards = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
//   try {
//     const { current, previous } = getDateRanges();

//     const [
//       totalUsers,
//       prevTotalUsers,

//       activeUsers,
//       prevActiveUsers,

//       newUsers,
//       prevNewUsers,

//       customersWithOrders,
//       prevCustomersWithOrders,
//     ] = await Promise.all([
//       // TOTAL USERS
//       prisma.user.count({ where: { createdAt: current, roles: { some: { name: "user" } } } }),
//       prisma.user.count({ where: { createdAt: previous, roles: { some: { name: "user" } } } }),

//       // ACTIVE USERS
//       prisma.user.count({
//         where: { status: "ACTIVE", createdAt: current, roles: { some: { name: "user" } } },
//       }),
//       prisma.user.count({
//         where: { status: "ACTIVE", createdAt: previous, roles: { some: { name: "user" } } },
//       }),

//       // NEW USERS (same as total but semantic)
//       prisma.user.count({ where: { createdAt: current, roles: { some: { name: "user" } } } }),
//       prisma.user.count({ where: { createdAt: previous, roles: { some: { name: "user" } } } }),

//       // CUSTOMERS WITH ORDERS
//       prisma.user.count({
//         where: {
//           orders: {
//             some: { createdAt: current },
//           },
//           roles: { some: { name: "user" } }
//         },
//       }),
//       prisma.user.count({
//         where: {
//           orders: {
//             some: { createdAt: previous },
//           },
//           roles: { some: { name: "user" } }
//         },
//       }),
//     ]);

//     const response: DashboardResponse = {
//       total_users: formatCard(
//         totalUsers,
//         calculateTrend(totalUsers, prevTotalUsers).percentChange,
//         "Total Users"
//       ),

//       active_users: formatCard(
//         activeUsers,
//         calculateTrend(activeUsers, prevActiveUsers).percentChange,
//         "Active Users"
//       ),

//       new_users: formatCard(
//         newUsers,
//         calculateTrend(newUsers, prevNewUsers).percentChange,
//         "New Users This Month"
//       ),

//       customers_with_orders: formatCard(
//         customersWithOrders,
//         calculateTrend(
//           customersWithOrders,
//           prevCustomersWithOrders
//         ).percentChange,
//         "Customers With Orders"
//       ),
//     };

//     return res.json(response);
//   } catch (error) {
//     console.error("Dashboard Error:", error);

//     return res.status(500).json({
//       message: "Failed to load dashboard data",
//     });
//   }
// });
export const getCustomerDashboardCards = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    try {
      //////////////////////////////////////////////////////
      // DATE RANGES (INTERNAL ONLY FOR TREND)
      //////////////////////////////////////////////////////
      const now = new Date();

      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

      const current = {
        gte: startOfThisMonth,
        lte: now,
      };

      const previous = {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      };

      //////////////////////////////////////////////////////
      // QUERIES
      //////////////////////////////////////////////////////
      const [
        // ✅ ALL TIME VALUES
        totalUsers,
        activeUsers,
        customersWithOrders,

        // ✅ TREND VALUES (THIS MONTH vs LAST MONTH)
        currentUsers,
        previousUsers,

        currentActiveUsers,
        previousActiveUsers,

        currentCustomersWithOrders,
        previousCustomersWithOrders,
      ] = await Promise.all([
        // =========================
        // ALL USERS (NO DATE FILTER)
        // =========================
        prisma.user.count({
          where: {
            roles: { some: { name: "user" } },
          },
        }),

        prisma.user.count({
          where: {
            status: "ACTIVE",
            roles: { some: { name: "user" } },
          },
        }),

        prisma.user.count({
          where: {
            orders: { some: {} },
            roles: { some: { name: "user" } },
          },
        }),

        // =========================
        // TREND (THIS MONTH)
        // =========================
        prisma.user.count({
          where: {
            createdAt: current,
            roles: { some: { name: "user" } },
          },
        }),

        // LAST MONTH
        prisma.user.count({
          where: {
            createdAt: previous,
            roles: { some: { name: "user" } },
          },
        }),

        // ACTIVE TREND
        prisma.user.count({
          where: {
            status: "ACTIVE",
            createdAt: current,
            roles: { some: { name: "user" } },
          },
        }),

        prisma.user.count({
          where: {
            status: "ACTIVE",
            createdAt: previous,
            roles: { some: { name: "user" } },
          },
        }),

        // CUSTOMERS WITH ORDERS TREND
        prisma.user.count({
          where: {
            orders: { some: { createdAt: current } },
            roles: { some: { name: "user" } },
          },
        }),

        prisma.user.count({
          where: {
            orders: { some: { createdAt: previous } },
            roles: { some: { name: "user" } },
          },
        }),
      ]);

      //////////////////////////////////////////////////////
      // RESPONSE
      //////////////////////////////////////////////////////
      const response: DashboardResponse = {
        total_users: formatCard(
          totalUsers,
          calculateTrend(currentUsers, previousUsers).percentChange,
          "Total Users"
        ),

        active_users: formatCard(
          activeUsers,
          calculateTrend(currentActiveUsers, previousActiveUsers).percentChange,
          "Active Users"
        ),

        new_users: formatCard(
          currentUsers,
          calculateTrend(currentUsers, previousUsers).percentChange,
          "New Users This Month"
        ),

        customers_with_orders: formatCard(
          customersWithOrders,
          calculateTrend(
            currentCustomersWithOrders,
            previousCustomersWithOrders
          ).percentChange,
          "Customers With Orders"
        ),
      };

      return res.json(response);
    } catch (error) {
      console.error("Dashboard Error:", error);

      return res.status(500).json({
        message: "Failed to load dashboard data",
      });
    }
  }
);
