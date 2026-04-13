import { Router } from "express";
import * as brandController from "../controllers/brand.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { uploadSingleImage } from "../config/multer";

const router = Router();

router.get("/", brandController.listBrands);
router.get("/:id", brandController.getBrandById);
router.post("/", protect, restrictTo("admin"),uploadSingleImage('image'), brandController.createBrand);
router.patch("/:id", protect, restrictTo("admin"),uploadSingleImage('image'), brandController.updateBrand);
router.delete("/:id", protect, restrictTo("admin"), brandController.deleteBrand);

export default router;
