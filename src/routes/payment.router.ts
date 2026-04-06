import { Router } from "express";
import * as paymentController from "../controllers/payment.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", requirePermission("payments", "read"), paymentController.listPayments);
router.get("/:id", requirePermission("payments", "read"), paymentController.getPaymentById);
router.post("/:id/capture", requirePermission("payments", "update"), paymentController.capturePayment);
router.post("/:id/refund", requirePermission("payments", "update"), paymentController.refundPayment);

export default router;
