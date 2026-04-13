import { Router } from "express";
import * as paymentController from "../controllers/payment.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", paymentController.listPayments);
router.get("/:id", paymentController.getPaymentById);
router.post("/:id/capture", paymentController.capturePayment);
router.post("/:id/refund", paymentController.refundPayment);

export default router;
