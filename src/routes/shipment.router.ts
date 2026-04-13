import { Router } from "express";
import * as shipmentController from "../controllers/shipment.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", shipmentController.listShipments);
router.get("/:id/track", shipmentController.getTracking);
router.post("/:id/update-status", shipmentController.updateStatus);
router.get("/:id", shipmentController.getShipmentById);

export default router;
