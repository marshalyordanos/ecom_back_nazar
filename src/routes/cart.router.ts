import { Router } from "express";
import * as cartController from "../controllers/cart.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.all("/chapa-callback", cartController.handleChapaCallback);

router.use(protect);

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.patch("/items/:id", cartController.updateCartItem);
router.delete("/items/:id", cartController.removeCartItem);
router.post("/checkout", cartController.checkout);
export default router;
