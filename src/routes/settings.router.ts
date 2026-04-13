import { Router } from "express";
import * as settingsController from "../controllers/settings.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protect, settingsController.getSettings);
router.get("/:key", protect, settingsController.getSettingByKey);
router.post("/", protect, restrictTo("admin"), settingsController.setSetting);
router.put("/:key", protect, restrictTo("admin"), settingsController.updateSetting);
router.delete("/:key", protect, restrictTo("admin"), settingsController.deleteSetting);

export default router;
