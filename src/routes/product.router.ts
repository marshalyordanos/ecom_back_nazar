import { Router } from "express";
import * as productController from "../controllers/product.controller";
import * as reviewController from "../controllers/review.controller";
import { optionalAuth, protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";
import { uploadSingleImage } from "../config/multer";

const router = Router();

router.get("/", productController.listProducts);
router.get("/featured", productController.getFeatured);
router.get("/popular", productController.getPopular);
router.get("/new-arrivals", productController.getNewArrivals);
router.get("/most-viewed", productController.getMostViewed);
router.get("/recently-viewed", protect, productController.getRecentlyViewed);
router.get(
  "/variants",
  protect,
  restrictTo("admin"),
  requirePermission("products", "read"),
  productController.listVariants
);

router.patch(
  "/variants/:variantId",
  protect,
  restrictTo("admin"),
  requirePermission("products", "update"),
  uploadSingleImage("image"),
  productController.updateVariant
);
router.get(
  "/variants/:id",
  protect,
  restrictTo("admin"),
  requirePermission("products", "read"),
  productController.getVariantById
);
router.delete(
  "/variants/:variantId",
  protect,
  restrictTo("admin"),
  requirePermission("products", "delete"),
  productController.deleteVariant
);
router.post(
  "/variants/:variantId/media",
  protect,
  restrictTo("admin"),
  requirePermission("products", "update"),
  productController.addVariantMedia
);
router.delete(
  "/variants/media/:mediaId",
  protect,
  restrictTo("admin"),
  requirePermission("products", "update"),
  productController.removeVariantMedia
);

// --------- Variant Option Value Assignment Routes ---------
router.post(
  "/variants/:variantId/option-values",
  protect,
  restrictTo("admin"),
  requirePermission("products", "update"),
  productController.setVariantOptionValues
);
router.delete(
  "/variants/:variantId/option-values/:optionValueId",
  protect,
  restrictTo("admin"),
  requirePermission("products", "update"),
  productController.removeVariantOptionValue
);
router.post(
  "/variants/:variantId/option-values/:optionValueId",
  protect,
  restrictTo("admin"),
  requirePermission("products", "update"),
  productController.assignVariantOptionValue
);

// VariantOption & OptionValue (place /options/values/:valueId before /options/:optionId)
router.get("/options", productController.listVariantOptions);
router.post(
  "/options",
  protect,
  restrictTo("admin"),
  requirePermission("products", "create"),
  productController.createVariantOption
);
router.get("/options/values/:valueId", productController.getOptionValueById);
router.patch(
  "/options/values/:valueId",
  protect,
  restrictTo("admin"),
  requirePermission("products", "update"),
  productController.updateOptionValue
);
router.delete(
  "/options/values/:valueId",
  protect,
  restrictTo("admin"),
  requirePermission("products", "delete"),
  productController.deleteOptionValue
);
router.get("/options/:optionId/values", productController.listOptionValues);
router.post(
  "/options/:optionId/values",
  protect,
  restrictTo("admin"),
  requirePermission("products", "create"),
  productController.createOptionValue
);
router.get("/options/:optionId", productController.getVariantOptionById);
router.patch(
  "/options/:optionId",
  protect,
  restrictTo("admin"),
  requirePermission("products", "update"),
  productController.updateVariantOption
);
router.delete(
  "/options/:optionId",
  protect,
  restrictTo("admin"),
  requirePermission("products", "delete"),
  productController.deleteVariantOption
);

router.get("/:id", optionalAuth, productController.getProductById);
router.get("/mobile/:id", optionalAuth, productController.getProductByIdMobile);
router.get("/:id/reviews", reviewController.listByProduct);
router.post(
  "/",
  protect,
  restrictTo("admin"),
  requirePermission("products", "create"),
  productController.createProduct
);
router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  requirePermission("products", "update"),
  productController.updateProduct
);
router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  requirePermission("products", "delete"),
  productController.deleteProduct
);
router.post(
  "/:id/variants",
  protect,
  restrictTo("admin"),
  requirePermission("products", "create"),
  uploadSingleImage("image"),
  productController.createVariant
);


export default router;
