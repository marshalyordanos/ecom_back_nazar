import { Router } from "express";
import * as roleController from "../controllers/role.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", requirePermission("roles", "read"), roleController.listRoles);
router.post("/", requirePermission("roles", "create"), roleController.createRole);
router.get("/:id", requirePermission("roles", "read"), roleController.getRoleById);
router.patch("/:id", requirePermission("roles", "update"), roleController.updateRole);
router.delete("/:id", requirePermission("roles", "delete"), roleController.deleteRole);
router.post("/:id/permissions", requirePermission("roles", "update"), roleController.assignPermissions);
router.delete("/:id/permissions", requirePermission("roles", "update"), roleController.removePermissions);
router.post("/:id/assign", requirePermission("roles", "update"), roleController.assignRoleToUser);
export default router;
