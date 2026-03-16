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
router.post("/change-password", protect, authController.changePassword);

export default router;
