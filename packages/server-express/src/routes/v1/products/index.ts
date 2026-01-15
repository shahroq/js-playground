import express from "express";
import { UserRole } from "../users/types";
import {
  productController as ctrl,
  validate,
  coerceId,
  requireAuth,
  requireRole,
} from "@/common/container";

const appRouter = express.Router();

appRouter.use(requireAuth(), requireRole(UserRole.ADMIN));

appRouter.get("/", [validate("products.findAll")], ctrl.index);
appRouter.get("/:id", [validate("products.findOne"), coerceId], ctrl.show);
appRouter.post("/", [validate("products.create")], ctrl.store);
appRouter.patch("/:id", [validate("products.update"), coerceId], ctrl.update);
appRouter.delete("/:id", [validate("products.delete"), coerceId], ctrl.destroy);

export default appRouter;
