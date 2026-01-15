import express from "express";
import {
  productController as ctrl,
  validate,
  coerceId,
  requireAuth,
  requireRole,
} from "@/common/container";
import { UserRole } from "../users/types";

const router = express.Router();

router.use(requireAuth(), requireRole(UserRole.ADMIN));

router.get("/", [validate("products.findAll")], ctrl.index);
router.get("/:id", [validate("products.findOne"), coerceId], ctrl.show);
router.post("/", [validate("products.create")], ctrl.store);
router.patch("/:id", [validate("products.update"), coerceId], ctrl.update);
router.delete("/:id", [validate("products.delete"), coerceId], ctrl.destroy);

export default router;
