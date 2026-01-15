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

// router.use(requireAuth(), requireRole(UserRole.ADMIN));

router.get("/", [validate("users.findAll")], ctrl.index);
router.get("/:id", [validate("users.findOne"), coerceId], ctrl.show);
router.post("/", [validate("users.create")], ctrl.store);
router.patch("/:id", [validate("users.update"), coerceId], ctrl.update);
router.delete("/:id", [validate("users.delete"), coerceId], ctrl.destroy);

export default router;
