"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("../controllers/user.controller"));
const authController = __importStar(require("../controllers/auth.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const permission_middleware_1 = require("../middleware/permission.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.protect);
router.get("/me", userController.getMe);
router.patch("/me", userController.updateMe);
router.patch("/me/password", userController.updateMyPassword);
router.post("/", (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("users", "create"), authController.register);
// ===============================
// CUSTOMER NOTIFICATIONS (ME)
// ===============================
router.get("/notifications", userController.listMyNotifications);
router.get("/notifications/unread-count", userController.getMyUnreadNotificationsCount);
router.post("/notifications/read-all", userController.markAllMyNotificationsRead);
router.post("/notifications/:id/read", userController.markMyNotificationRead);
router.post("/me/push-token", userController.registerMyPushToken);
router.delete("/me/push-token", userController.removeMyPushToken);
// ===============================
// SAVED ADDRESSES (ME)
// ===============================
router.get("/saved-addresses", userController.listMySavedAddresses);
router.post("/saved-addresses", userController.addMySavedAddress);
router.delete("/saved-addresses/:id", userController.deleteMySavedAddress);
router.get("/", (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("users", "read"), userController.listUsers);
router.get("/:id", (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("users", "read"), userController.getById);
router.patch("/:id", (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("users", "update"), userController.updateUser);
router.delete("/:id", (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("users", "delete"), userController.deactivateUser);
exports.default = router;
//# sourceMappingURL=user.router.js.map