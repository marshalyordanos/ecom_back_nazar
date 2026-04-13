import { Router } from "express";
import * as couponController from "../controllers/coupon.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.get("/", couponController.listCoupons);
router.get("/:id", couponController.getCouponById);
router.post("/", protect, restrictTo("admin"), couponController.createCoupon);
router.put("/:id", protect, restrictTo("admin"), couponController.updateCoupon);
router.delete("/:id", protect, restrictTo("admin"), couponController.deleteCoupon);
router.post("/:id/use", protect, couponController.useCoupon);

export default router;
