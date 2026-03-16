import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protect, orderController.listMyOrders);
router.get("/admin/list", protect, restrictTo("admin"), orderController.listOrdersAdmin);
router.post("/admin/create", protect, restrictTo("admin"), orderController.createOrderAdmin);
router.get("/:id", protect, orderController.getOrderById);
router.post("/:id/cancel", protect, orderController.cancelOrder);
router.post("/:id/complete", protect, restrictTo("admin"), orderController.completeOrder);
router.get("/:id/items", protect, orderController.listOrderItems);

export default router;
