import { Router } from "express";
import * as faqController from "../controllers/faq.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

/** Admin: paginated list (all statuses), optional ?status=DRAFT|PUBLISHED — must be before `/:id`. */
router.get(
  "/manage",
  protect,
  restrictTo("admin"),
  faqController.listFaqsAdmin,
);

router.get("/", faqController.listPublishedFaqs);

router.get("/:id", protect, restrictTo("admin"), faqController.getFaqById);
router.post("/", protect, restrictTo("admin"), faqController.createFaq);
router.patch("/:id", protect, restrictTo("admin"), faqController.updateFaq);
router.delete("/:id", protect, restrictTo("admin"), faqController.deleteFaq);

export default router;
