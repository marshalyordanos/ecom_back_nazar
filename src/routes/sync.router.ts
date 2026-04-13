import { Router } from "express";
import * as syncController from "../controllers/sync.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.post("/products", protect, restrictTo("admin"), syncController.triggerSync);
router.get("/logs", protect, restrictTo("admin"), syncController.listSyncLogs);
router.get("/logs/:id", protect, restrictTo("admin"), syncController.getSyncLogById);

export default router;
