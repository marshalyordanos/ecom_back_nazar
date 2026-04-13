<<<<<<< HEAD
import { Router } from "express";
import * as inventoryController from "../controllers/inventory.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", inventoryController.listInventory);
router.get("/movements", inventoryController.listMovements);
router.post("/movements", inventoryController.addMovement);
router.get("/:variantId", inventoryController.getByVariantId);
router.patch("/:variantId", inventoryController.updateInventory);

export default router;
=======
import { Router } from "express";
import * as inventoryController from "../controllers/inventory.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";

const router = Router();

router.use(protect);
router.use(restrictTo("admin"));

router.get("/", requirePermission("inventory", "read"), inventoryController.listInventory);
router.get("/movements", requirePermission("inventory", "read"), inventoryController.listMovements);
router.get("/inventory/:id", requirePermission("inventory", "read"), inventoryController.getInventoryById);

router.post("/movements", requirePermission("inventory", "create"), inventoryController.addMovement);
router.get("/:variantId", requirePermission("inventory", "read"), inventoryController.getByVariantId);
router.patch("/:variantId", requirePermission("inventory", "update"), inventoryController.updateInventory);

export default router;
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
