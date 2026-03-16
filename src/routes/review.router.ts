import { Router } from "express";
import * as reviewController from "../controllers/review.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/:id", reviewController.getReviewById);
router.post("/", protect, reviewController.createReview);
router.put("/:id", protect, reviewController.updateReview);
router.delete("/:id", protect, reviewController.deleteReview);

export default router;
