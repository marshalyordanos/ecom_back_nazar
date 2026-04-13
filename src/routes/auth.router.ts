import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", authController.register);
router.post('/createSuperAdmin',authController.createSuperAdmin)
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/send-verification-otp", authController.sendVerificationOtp);
router.post("/verify-account", authController.verifyAccount);
router.post("/resend-verification-otp", authController.resendVerificationOtp);
router.post("/request-password-reset", authController.requestPasswordReset);
router.post("/verify-reset-otp", authController.verifyResetOtp);
router.post("/resend-reset-otp", authController.resendResetOtp);
router.post("/change-password", protect, authController.changePassword);

export default router;
