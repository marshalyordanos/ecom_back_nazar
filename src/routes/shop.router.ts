import { Router } from "express";

import * as shopController from "../controllers/shop.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { uploadSingleImage } from "../config/multer";

const router = Router();

router.get("/", shopController.listShops);
router.patch("/locations/:locationId", protect, restrictTo("admin"), shopController.updateLocation);
router.delete("/locations/:locationId", protect, restrictTo("admin"), shopController.deleteLocation);
router.get("/:id", shopController.getShopById);
router.patch("/:id", protect, restrictTo("admin"), shopController.updateShop);
router.get("/:id/locations", shopController.listShopLocations);
router.post("/:id/locations", protect, restrictTo("admin"), shopController.addShopLocation);
router.post("/", protect, restrictTo("admin"), uploadSingleImage("image"), shopController.createOrUpdateShop);
router.post("/sales-from-shop", protect, restrictTo("admin"), shopController.addSalesFromShop);


export default router;
