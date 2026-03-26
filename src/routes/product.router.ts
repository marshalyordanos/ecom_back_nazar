import { Router } from "express";
import * as productController from "../controllers/product.controller";
import * as reviewController from "../controllers/review.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { uploadSingleImage } from "../config/multer";

const router = Router();

router.get("/", productController.listProducts);
router.get("/featured", productController.getFeatured);
router.get("/variants", protect, restrictTo("admin"), productController.listVariants);

router.patch("/variants/:variantId", protect, restrictTo("admin"), uploadSingleImage("image"), productController.updateVariant);
router.get("/variants/:id", protect, restrictTo("admin"), productController.getVariantById);
router.delete("/variants/:variantId", protect, restrictTo("admin"), productController.deleteVariant);
router.post("/variants/:variantId/media", protect, restrictTo("admin"), productController.addVariantMedia);
router.delete("/variants/media/:mediaId", protect, restrictTo("admin"), productController.removeVariantMedia);

// --------- Variant Option Value Assignment Routes ---------
router.post("/variants/:variantId/option-values", protect, restrictTo("admin"), productController.setVariantOptionValues);
router.delete("/variants/:variantId/option-values/:optionValueId", protect, restrictTo("admin"), productController.removeVariantOptionValue);
router.post("/variants/:variantId/option-values/:optionValueId", protect, restrictTo("admin"), productController.assignVariantOptionValue);

// VariantOption & OptionValue (place /options/values/:valueId before /options/:optionId)
router.get("/options", productController.listVariantOptions);
router.post("/options", protect, restrictTo("admin"), productController.createVariantOption);
router.get("/options/values/:valueId", productController.getOptionValueById);
router.patch("/options/values/:valueId", protect, restrictTo("admin"), productController.updateOptionValue);
router.delete("/options/values/:valueId", protect, restrictTo("admin"), productController.deleteOptionValue);
router.get("/options/:optionId/values", productController.listOptionValues);
router.post("/options/:optionId/values", protect, restrictTo("admin"), productController.createOptionValue);
router.get("/options/:optionId", productController.getVariantOptionById);
router.patch("/options/:optionId", protect, restrictTo("admin"), productController.updateVariantOption);
router.delete("/options/:optionId", protect, restrictTo("admin"), productController.deleteVariantOption);

router.get("/:id", productController.getProductById);
router.get("/mobile/:id", productController.getProductByIdMobile);
router.get("/:id/reviews", reviewController.listByProduct);
router.post("/", protect, restrictTo("admin"), productController.createProduct);
router.patch("/:id", protect, restrictTo("admin"), productController.updateProduct);
router.delete("/:id", protect, restrictTo("admin"), productController.deleteProduct);
router.post("/:id/variants", protect, restrictTo("admin"), uploadSingleImage("image"), productController.createVariant);


export default router;
