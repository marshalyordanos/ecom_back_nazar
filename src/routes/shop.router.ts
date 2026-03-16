import { Router } from "express";
import * as shopController from "../controllers/shop.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.get("/", shopController.listShops);
router.put("/locations/:locationId", protect, restrictTo("admin"), shopController.updateLocation);
router.delete("/locations/:locationId", protect, restrictTo("admin"), shopController.deleteLocation);
router.get("/:id", shopController.getShopById);
router.put("/:id", protect, restrictTo("admin"), shopController.updateShop);
router.get("/:id/locations", shopController.listShopLocations);
router.post("/:id/locations", protect, restrictTo("admin"), shopController.addShopLocation);

export default router;
