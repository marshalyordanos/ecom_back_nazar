import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/permission.middleware";
import { uploadSingleImage } from "../config/multer";

const router = Router();

router.get("/", categoryController.listCategories);
router.get("/:id", categoryController.getCategoryById);
router.post(
  "/",
  protect,
  restrictTo("admin"),
  requirePermission("categories", "create"),
  uploadSingleImage("image"),
  categoryController.createCategory
);
router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  requirePermission("categories", "update"),
  uploadSingleImage("image"),
  categoryController.updateCategory
);
router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  requirePermission("categories", "delete"),
  categoryController.deleteCategory
);

export default router;
