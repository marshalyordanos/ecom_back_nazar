import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.get("/me", userController.getMe);
router.put("/me", userController.updateMe);
router.put("/me/password", userController.updateMyPassword);

router.get("/", restrictTo("admin"), userController.listUsers);
router.get("/:id", restrictTo("admin"), userController.getById);
router.put("/:id", restrictTo("admin"), userController.updateUser);
router.delete("/:id", restrictTo("admin"), userController.deactivateUser);

export default router;
