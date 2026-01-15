import express from "express";
import { UserRole } from "../users/types";
import {
  reviewController as ctrl,
  validate,
  coerceId,
  requireAuth,
  requireRole,
} from "@/common/container";

const appRouter = express.Router();

appRouter.use(requireAuth(), requireRole(UserRole.ADMIN));

appRouter.get("/", [validate("reviews.findAll")], ctrl.index);
appRouter.get("/:id", [validate("reviews.findOne"), coerceId], ctrl.show);
appRouter.post("/", [validate("reviews.create")], ctrl.store);
appRouter.patch("/:id", [validate("reviews.update"), coerceId], ctrl.update);
appRouter.delete("/:id", [validate("reviews.delete"), coerceId], ctrl.destroy);
appRouter.patch(
  "/:id/approve",
  [validate("reviews.update"), coerceId],
  ctrl.approve
);
appRouter.patch(
  "/:id/reject",
  [validate("reviews.update"), coerceId],
  ctrl.reject
);

export default appRouter;
