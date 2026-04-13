<<<<<<< HEAD
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
=======
import { Router } from "express";
import * as permissionController from "../controllers/permission.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", requirePermission("permissions", "read"), permissionController.listPermissions);
router.post("/", requirePermission("permissions", "create"), permissionController.createPermission);
router.get("/:id", requirePermission("permissions", "read"), permissionController.getPermissionById);
router.patch("/:id", requirePermission("permissions", "update"), permissionController.updatePermission);
router.delete("/:id", requirePermission("permissions", "delete"), permissionController.deletePermission);

export default router;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
