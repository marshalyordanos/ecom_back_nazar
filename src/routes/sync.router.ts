<<<<<<< HEAD
import { Router } from "express";
import * as syncController from "../controllers/sync.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.post("/products", protect, restrictTo("admin"), syncController.triggerSync);
router.get("/logs", protect, restrictTo("admin"), syncController.listSyncLogs);
router.get("/logs/:id", protect, restrictTo("admin"), syncController.getSyncLogById);

export default router;
=======
import { Router } from "express";
import * as syncController from "../controllers/sync.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.post(
  "/products",
  protect,
  restrictTo("admin"),
  requirePermission("sync", "create"),
  syncController.triggerSync
);
router.get(
  "/logs",
  protect,
  restrictTo("admin"),
  requirePermission("sync", "read"),
  syncController.listSyncLogs
);
router.get(
  "/logs/:id",
  protect,
  restrictTo("admin"),
  requirePermission("sync", "read"),
  syncController.getSyncLogById
);

export default router;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
