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
const productController = __importStar(require("../controllers/product.controller"));
const reviewController = __importStar(require("../controllers/review.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const permission_middleware_1 = require("../middleware/permission.middleware");
const multer_1 = require("../config/multer");
const router = (0, express_1.Router)();
router.get("/", productController.listProducts);
router.get("/featured", productController.getFeatured);
router.get("/popular", productController.getPopular);
router.get("/new-arrivals", productController.getNewArrivals);
router.get("/most-viewed", productController.getMostViewed);
router.get("/recently-viewed", auth_middleware_1.protect, productController.getRecentlyViewed);
router.get("/variants", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "read"), productController.listVariants);
router.patch("/variants/:variantId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "update"), (0, multer_1.uploadSingleImage)("image"), productController.updateVariant);
router.get("/variants/:id", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "read"), productController.getVariantById);
router.delete("/variants/:variantId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "delete"), productController.deleteVariant);
router.post("/variants/:variantId/media", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "update"), productController.addVariantMedia);
router.delete("/variants/media/:mediaId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "update"), productController.removeVariantMedia);
// --------- Variant Option Value Assignment Routes ---------
router.post("/variants/:variantId/option-values", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "update"), productController.setVariantOptionValues);
router.delete("/variants/:variantId/option-values/:optionValueId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "update"), productController.removeVariantOptionValue);
router.post("/variants/:variantId/option-values/:optionValueId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "update"), productController.assignVariantOptionValue);
// VariantOption & OptionValue (place /options/values/:valueId before /options/:optionId)
router.get("/options", productController.listVariantOptions);
router.post("/options", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "create"), productController.createVariantOption);
router.get("/options/values/:valueId", productController.getOptionValueById);
router.patch("/options/values/:valueId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "update"), productController.updateOptionValue);
router.delete("/options/values/:valueId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "delete"), productController.deleteOptionValue);
router.get("/options/:optionId/values", productController.listOptionValues);
router.post("/options/:optionId/values", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "create"), productController.createOptionValue);
router.get("/options/:optionId", productController.getVariantOptionById);
router.patch("/options/:optionId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "update"), productController.updateVariantOption);
router.delete("/options/:optionId", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "delete"), productController.deleteVariantOption);
router.get("/:id", auth_middleware_1.optionalAuth, productController.getProductById);
router.get("/mobile/:id", auth_middleware_1.optionalAuth, productController.getProductByIdMobile);
router.get("/:id/reviews", reviewController.listByProduct);
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "create"), productController.createProduct);
router.patch("/:id", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "update"), productController.updateProduct);
router.delete("/:id", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "delete"), productController.deleteProduct);
router.post("/:id/variants", auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)("admin"), (0, permission_middleware_1.requirePermission)("products", "create"), (0, multer_1.uploadSingleImage)("image"), productController.createVariant);
exports.default = router;
//# sourceMappingURL=product.router.js.map