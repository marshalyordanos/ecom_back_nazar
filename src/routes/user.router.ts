import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as authController from "../controllers/auth.controller";

import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.use(protect);

router.get("/me", userController.getMe);
router.patch("/me", userController.updateMe);
router.patch("/me/password", userController.updateMyPassword);
router.post(
  "/",
  restrictTo("admin"),
  requirePermission("users", "create"),
  authController.register
);

// ===============================
// CUSTOMER NOTIFICATIONS (ME)
// ===============================
router.get("/notifications", userController.listMyNotifications);
router.get("/notifications/unread-count", userController.getMyUnreadNotificationsCount);
router.post("/notifications/read-all", userController.markAllMyNotificationsRead);
router.post("/notifications/:id/read", userController.markMyNotificationRead);

// ===============================
// SAVED ADDRESSES (ME)
// ===============================
router.get("/saved-addresses", userController.listMySavedAddresses);
router.post("/saved-addresses", userController.addMySavedAddress);
router.delete("/saved-addresses/:id", userController.deleteMySavedAddress);

router.get("/", restrictTo("admin"), requirePermission("users", "read"), userController.listUsers);
router.get("/:id", restrictTo("admin"), requirePermission("users", "read"), userController.getById);
router.patch("/:id", restrictTo("admin"), requirePermission("users", "update"), userController.updateUser);

router.delete("/:id", restrictTo("admin"), requirePermission("users", "delete"), userController.deactivateUser);

export default router;
