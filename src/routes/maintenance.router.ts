import { Router } from "express";
import * as maintenanceController from "../controllers/maintenance.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.get("/", maintenanceController.getMaintenance);
router.patch(
  "/",
  protect,
  restrictTo("admin"),
  requirePermission("settings", "update"),
  maintenanceController.patchMaintenance
);

export default router;
