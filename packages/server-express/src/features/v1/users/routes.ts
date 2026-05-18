import express from "express";
import { UserRole } from "./types";
import {
  userController as ctrl,
  validate,
  coerceId,
  requireAuth,
  requireRole,
} from "@/common/container";

const appRouter = express.Router();

appRouter.use(requireAuth(), requireRole(UserRole.ADMIN));

appRouter.get("/", [validate("users.findAll")], ctrl.index);
appRouter.get("/:id", [validate("users.findOne"), coerceId], ctrl.show);
appRouter.post("/", [validate("users.create")], ctrl.store);
appRouter.patch("/:id", [validate("users.update"), coerceId], ctrl.update);
appRouter.delete("/:id", [validate("users.delete"), coerceId], ctrl.destroy);

export default appRouter;
