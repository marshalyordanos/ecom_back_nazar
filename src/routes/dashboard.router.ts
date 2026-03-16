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

export default router;
