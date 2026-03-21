import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/overview", dashboardController.getOverview);
router.get("/sales-summary", dashboardController.getSalesSummary);
router.get("/orders-summary", dashboardController.getOrdersSummary);
router.get("/top-products", dashboardController.getTopProducts);
router.get("/low-inventory", dashboardController.getLowInventory);
router.get("/new-customers", dashboardController.getNewCustomers);
router.get("/recent-orders", dashboardController.getRecentOrders);
router.get("/recent-activities", dashboardController.getRecentActivities);

// ===============================
// 📊 GLOBAL SUMMARY (MAIN API)
// ===============================
router.get("/summary", dashboardController.getDashboardSummary);

// ===============================
// 👤 USER SUMMARY
// ===============================
router.get("/users/summary", dashboardController.getUserSummary);
router.get("/users/verification", dashboardController.getUserVerificationStats);

// ===============================
// 📦 ORDER SUMMARY
// ===============================
router.get("/orders/summary-extended", dashboardController.getOrderSummaryExtended);
router.get("/orders/revenue-summary", dashboardController.getOrderRevenueSummary);
router.get("/orders/daily", dashboardController.getDailyOrdersSummary);

// ===============================
// 💳 PAYMENT SUMMARY
// ===============================
router.get("/payments/summary", dashboardController.getPaymentSummary);
router.get("/payments/methods", dashboardController.getPaymentMethodStats);
router.get("/payments/daily", dashboardController.getDailyPayments);

// ===============================
// 🛍 PRODUCT SUMMARY
// ===============================
router.get("/products/summary", dashboardController.getProductSummary);
router.get("/products/variants/summary", dashboardController.getVariantSummary);

// ===============================
// 📦 INVENTORY SUMMARY
// ===============================
router.get("/inventory/summary", dashboardController.getInventorySummary);
router.get("/inventory/low-stock/count", dashboardController.getLowStockCount);
router.get("/inventory/out-of-stock", dashboardController.getOutOfStock);

// ===============================
// 🏪 SHOP SUMMARY
// ===============================
router.get("/shops/summary", dashboardController.getShopSummary);
router.get("/shops/locations/summary", dashboardController.getLocationSummary);

// ===============================
// 🎟 COUPON SUMMARY
// ===============================
router.get("/coupons/summary", dashboardController.getCouponSummary);
router.get("/coupons/usage/summary", dashboardController.getCouponUsageSummary);

// ===============================
// ⭐ REVIEW SUMMARY
// ===============================
router.get("/reviews/summary", dashboardController.getReviewSummary);

// ===============================
// 🔔 NOTIFICATION SUMMARY
// ===============================
router.get("/notifications/summary", dashboardController.getNotificationSummary);

// ===============================
// 🔍 SEARCH SUMMARY
// ===============================
router.get("/search/summary", dashboardController.getSearchSummary);

// ===============================
// 💰 SALES ANALYTICS
// ===============================
router.get("/sales/trends", dashboardController.getSalesTrends);
router.get("/sales/by-channel", dashboardController.getSalesByChannel);
router.get("/sales/forecast", dashboardController.getSalesForecast);
router.get("/sales/refunds", dashboardController.getRefundStats);

// ===============================
// 📦 ORDER ANALYTICS
// ===============================
router.get("/orders/status-distribution", dashboardController.getOrderStatusStats);
router.get("/orders/fulfillment", dashboardController.getOrderFulfillmentStats);
router.get("/orders/value-distribution", dashboardController.getOrderValueStats);
router.get("/orders/abandoned", dashboardController.getAbandonedOrders);

// ===============================
// 🛍 PRODUCT ANALYTICS
// ===============================
router.get("/products/performance", dashboardController.getProductPerformance);
router.get("/products/conversion", dashboardController.getProductConversion);
router.get("/products/categories", dashboardController.getCategoryStats);
router.get("/products/brands", dashboardController.getBrandStats);

// ===============================
// 👥 CUSTOMER ANALYTICS
// ===============================
router.get("/customers/growth", dashboardController.getCustomerGrowth);
router.get("/customers/retention", dashboardController.getCustomerRetention);
router.get("/customers/lifetime-value", dashboardController.getCustomerLTV);
router.get("/customers/segments", dashboardController.getCustomerSegments);

// ===============================
// 📦 INVENTORY ANALYTICS
// ===============================
router.get("/inventory/valuation", dashboardController.getInventoryValuation);
router.get("/inventory/turnover", dashboardController.getInventoryTurnover);
router.get("/inventory/alerts", dashboardController.getInventoryAlerts);
router.get("/inventory/location", dashboardController.getInventoryByLocation);

// ===============================
// 🎟 COUPONS / PROMOTIONS
// ===============================
router.get("/coupons/performance", dashboardController.getCouponPerformance);
router.get("/coupons/active", dashboardController.getActiveCoupons);
router.get("/coupons/expired", dashboardController.getExpiredCoupons);

// ===============================
// ⭐ REVIEWS & RATINGS
// ===============================
router.get("/reviews/ratings-distribution", dashboardController.getRatingDistribution);
router.get("/reviews/recent", dashboardController.getRecentReviews);
router.get("/reviews/pending", dashboardController.getPendingReviews);

// ===============================
// 🔔 ACTIVITY / SYSTEM LOGS
// ===============================
router.get("/activities/orders", dashboardController.getOrderActivities);
router.get("/activities/users", dashboardController.getUserActivities);
router.get("/activities/inventory", dashboardController.getInventoryActivities);

// ===============================
// 🔍 SEARCH & BEHAVIOR
// ===============================
router.get("/search/top-queries", dashboardController.getTopSearchQueries);
router.get("/search/no-results", dashboardController.getNoResultSearches);
router.get("/products/most-viewed", dashboardController.getMostViewedProducts);

// ===============================
// ⚙️ SYSTEM / SHOP HEALTH
// ===============================
router.get("/health/summary", dashboardController.getSystemHealth);
router.get("/sync/status", dashboardController.getSyncStatus);
router.get("/notifications/unread", dashboardController.getUnreadNotifications);

export default router;
