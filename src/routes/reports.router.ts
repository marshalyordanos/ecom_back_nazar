<<<<<<< HEAD
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
=======
import { Router } from "express";
import * as reportsController from "../controllers/reports.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/sales", requirePermission("reports", "read"), reportsController.getSalesReport);
router.get("/orders", requirePermission("reports", "read"), reportsController.getOrdersReport);
router.get("/orders-by-status", requirePermission("reports", "read"), reportsController.getOrdersByStatus);
router.get("/inventory", requirePermission("reports", "read"), reportsController.getInventoryReport);
router.get("/inventory/low-stock", requirePermission("reports", "read"), reportsController.getInventoryReport);
router.get("/sync", requirePermission("reports", "read"), reportsController.getSyncReport);
router.get("/sync/:id", requirePermission("reports", "read"), reportsController.getSyncReportById);
router.get("/products/top-selling", requirePermission("reports", "read"), reportsController.getTopProductsReport);
router.get("/products/views", requirePermission("reports", "read"), reportsController.getProductViewsReport);
router.get("/coupons", requirePermission("reports", "read"), reportsController.getCouponsReport);

export default router;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
