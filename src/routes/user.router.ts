import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as authController from "../controllers/auth.controller";

import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.get("/me", userController.getMe);
router.patch("/me", userController.updateMe);
router.patch("/me/password", userController.updateMyPassword);
router.post("/", protect,restrictTo("admin"), authController.register);

router.get("/", restrictTo("admin"), userController.listUsers);
router.get("/:id", restrictTo("admin"), userController.getById);
router.patch("/:id", restrictTo("admin"), userController.updateUser);

router.delete("/:id", restrictTo("admin"), userController.deactivateUser);

export default router;
