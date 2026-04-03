import { Router } from "express";
import * as roleController from "../controllers/role.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", roleController.listRoles);
router.post("/", roleController.createRole);
router.get("/:id", roleController.getRoleById);
router.patch("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);
router.post("/:id/permissions", roleController.assignPermissions);
router.delete("/:id/permissions", roleController.removePermissions);
router.post("/:id/assign", roleController.assignRoleToUser);
export default router;
