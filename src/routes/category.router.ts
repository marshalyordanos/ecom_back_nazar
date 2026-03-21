import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { uploadSingleImage } from "../config/multer";

const router = Router();

router.get("/", categoryController.listCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", protect, restrictTo("admin"),uploadSingleImage('image'), categoryController.createCategory);
router.patch("/:id", protect, restrictTo("admin"),uploadSingleImage('image'), categoryController.updateCategory);
router.delete("/:id", protect, restrictTo("admin"), categoryController.deleteCategory);

export default router;
