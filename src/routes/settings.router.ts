import { Router } from "express";
import * as settingsController from "../controllers/settings.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.get("/", protect, settingsController.getSettings);
router.get("/:key", protect, settingsController.getSettingByKey);
router.post(
  "/",
  protect,
  restrictTo("admin"),
  requirePermission("settings", "create"),
  settingsController.setSetting
);
router.put(
  "/:key",
  protect,
  restrictTo("admin"),
  requirePermission("settings", "update"),
  settingsController.updateSetting
);
router.delete(
  "/:key",
  protect,
  restrictTo("admin"),
  requirePermission("settings", "delete"),
  settingsController.deleteSetting
);

export default router;
