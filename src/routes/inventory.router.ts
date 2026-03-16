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
router.put("/:variantId", inventoryController.updateInventory);

export default router;
