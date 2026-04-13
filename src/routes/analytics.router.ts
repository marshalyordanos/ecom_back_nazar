import { Router } from "express";
import * as analyticsController from "../controllers/analytics.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.get("/product-views", protect, restrictTo("admin"), analyticsController.getProductViews);
router.get("/searches", protect, restrictTo("admin"), analyticsController.getSearches);
router.get("/sales", protect, restrictTo("admin"), analyticsController.getSalesReport);
router.get("/orders", protect, restrictTo("admin"), analyticsController.getOrdersReport);

export default router;
