import { Router, json } from "express";
import * as staticPageController from "../controllers/staticPage.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.get("/:type", staticPageController.getPageByType);
router.put(
  "/:type",
  protect,
  restrictTo("admin"),
  json({ limit: "256kb" }),
  staticPageController.upsertPageByType,
);

export default router;
