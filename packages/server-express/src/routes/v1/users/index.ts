import express from "express";
import {
  userController as ctrl,
  validate,
  coerceId,
  requireAuth,
  requireRole,
} from "@/common/container";
import { UserRole } from "./types";

const router = express.Router();

router.get(
  "/",
  [requireAuth(), requireRole(UserRole.ADMIN), validate("users.findAll")],
  ctrl.index
);
router.get("/:id", [validate("users.findOne"), coerceId], ctrl.show);
router.post("/", validate("users.create"), ctrl.store);
router.patch("/:id", [validate("users.update"), coerceId], ctrl.update);
router.delete("/:id", [validate("users.delete"), coerceId], ctrl.destroy);

router.post("/register", validate("users.create"), ctrl.signUp);
router.post("/login", validate("users.login"), ctrl.signIn);
router.post("/logout", ctrl.signOut);

export default router;
