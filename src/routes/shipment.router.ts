import { Router } from "express";
import * as shipmentController from "../controllers/shipment.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", requirePermission("shipments", "read"), shipmentController.listShipments);
router.get("/:id/track", requirePermission("shipments", "read"), shipmentController.getTracking);
router.post("/:id/update-status", requirePermission("shipments", "update"), shipmentController.updateStatus);
router.get("/:id", requirePermission("shipments", "read"), shipmentController.getShipmentById);

export default router;
