import { Router } from "express";
import * as permissionController from "../controllers/permission.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", permissionController.listPermissions);
router.post("/", permissionController.createPermission);
router.get("/:id", permissionController.getPermissionById);
router.patch("/:id", permissionController.updatePermission);
router.delete("/:id", permissionController.deletePermission);

export default router;
