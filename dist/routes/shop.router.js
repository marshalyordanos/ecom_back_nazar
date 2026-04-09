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
const shopController = __importStar(require("../controllers/shop.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const permission_middleware_1 = require("../middleware/permission.middleware");
const multer_1 = require("../config/multer");
const router = (0, express_1.Router)();
router.get("/", shopController.listShops);
router.patch("/locations/:locationId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shops", "update"), shopController.updateLocation);
router.delete("/locations/:locationId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shops", "delete"), shopController.deleteLocation);
// SaleFromShop — register static paths before /:id so "sales-from-shop" is not captured as an id
router.get("/sales-from-shop/stats", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shop_sales", "read"), shopController.getSalesFromShopStats);
router.post("/sales-from-shop", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shop_sales", "create"), shopController.addSalesFromShop);
router.get("/sales-from-shop", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shop_sales", "read"), shopController.getSalesFromShop);
router.get("/sales-from-shop/:id", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shop_sales", "read"), shopController.getSalesFromShopById);
router.patch("/sales-from-shop/:id", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shop_sales", "update"), shopController.updateSalesFromShopById);
router.delete("/sales-from-shop/:id", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shop_sales", "delete"), shopController.deleteSalesFromShopById);
router.get("/:id", shopController.getShopById);
router.patch("/:id", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shops", "update"), shopController.updateShop);
router.get("/:id/locations", shopController.listShopLocations);
router.post("/:id/locations", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shops", "create"), shopController.addShopLocation);
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("shops", "create"), (0, multer_1.uploadSingleImage)("image"), shopController.createOrUpdateShop);
exports.default = router;
//# sourceMappingURL=shop.router.js.map