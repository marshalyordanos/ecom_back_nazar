import { Router } from "express";

import * as shopController from "../controllers/shop.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";
import { uploadSingleImage } from "../config/multer";

const router = Router();

router.get("/", shopController.listShops);
router.patch(
  "/locations/:locationId",
  protect,
  restrictTo("admin"),
  requirePermission("shops", "update"),
  shopController.updateLocation
);
router.delete(
  "/locations/:locationId",
  protect,
  restrictTo("admin"),
  requirePermission("shops", "delete"),
  shopController.deleteLocation
);

// SaleFromShop — register static paths before /:id so "sales-from-shop" is not captured as an id
router.get(
  "/sales-from-shop/stats",
  protect,
  restrictTo("admin"),
  requirePermission("shop_sales", "read"),
  shopController.getSalesFromShopStats
);
router.post(
  "/sales-from-shop",
  protect,
  restrictTo("admin"),
  requirePermission("shop_sales", "create"),
  shopController.addSalesFromShop
);
router.get(
  "/sales-from-shop",
  protect,
  restrictTo("admin"),
  requirePermission("shop_sales", "read"),
  shopController.getSalesFromShop
);
router.get(
  "/sales-from-shop/:id",
  protect,
  restrictTo("admin"),
  requirePermission("shop_sales", "read"),
  shopController.getSalesFromShopById
);
router.patch(
  "/sales-from-shop/:id",
  protect,
  restrictTo("admin"),
  requirePermission("shop_sales", "update"),
  shopController.updateSalesFromShopById
);
router.delete(
  "/sales-from-shop/:id",
  protect,
  restrictTo("admin"),
  requirePermission("shop_sales", "delete"),
  shopController.deleteSalesFromShopById
);

router.get("/:id", shopController.getShopById);
router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  requirePermission("shops", "update"),
  shopController.updateShop
);
router.get("/:id/locations", shopController.listShopLocations);
router.post(
  "/:id/locations",
  protect,
  restrictTo("admin"),
  requirePermission("shops", "create"),
  shopController.addShopLocation
);
router.post(
  "/",
  protect,
  restrictTo("admin"),
  requirePermission("shops", "create"),
  uploadSingleImage("image"),
  shopController.createOrUpdateShop
);

export default router;
