import { Router } from "express";
import * as reportsController from "../controllers/reports.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/sales", reportsController.getSalesReport);
router.get("/orders", reportsController.getOrdersReport);
router.get("/orders-by-status", reportsController.getOrdersByStatus);
router.get("/inventory", reportsController.getInventoryReport);
router.get("/inventory/low-stock", reportsController.getInventoryReport);
router.get("/sync", reportsController.getSyncReport);
router.get("/sync/:id", reportsController.getSyncReportById);
router.get("/products/top-selling", reportsController.getTopProductsReport);
router.get("/products/views", reportsController.getProductViewsReport);
router.get("/coupons", reportsController.getCouponsReport);

export default router;
