<<<<<<< HEAD
import { Router } from "express";
import * as analyticsController from "../controllers/analytics.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.get("/product-views", protect, restrictTo("admin"), analyticsController.getProductViews);
router.get("/searches", protect, restrictTo("admin"), analyticsController.getSearches);
router.get("/sales", protect, restrictTo("admin"), analyticsController.getSalesReport);
router.get("/orders", protect, restrictTo("admin"), analyticsController.getOrdersReport);

export default router;
=======
import { Router } from "express";
import * as analyticsController from "../controllers/analytics.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.get(
  "/product-views",
  protect,
  restrictTo("admin"),
  requirePermission("analytics", "read"),
  analyticsController.getProductViews
);
router.get(
  "/searches",
  protect,
  restrictTo("admin"),
  requirePermission("analytics", "read"),
  analyticsController.getSearches
);
router.get(
  "/sales",
  protect,
  restrictTo("admin"),
  requirePermission("analytics", "read"),
  analyticsController.getSalesReport
);
router.get(
  "/orders",
  protect,
  restrictTo("admin"),
  requirePermission("analytics", "read"),
  analyticsController.getOrdersReport
);

export default router;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
