import { Router } from "express";
import * as favoriteController from "../controllers/favorite.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.get("/ids", favoriteController.listFavoriteIds);
router.get("/", favoriteController.listFavorites);
router.post("/:productId", favoriteController.addFavorite);
router.delete("/:productId", favoriteController.removeFavorite);

export default router;
