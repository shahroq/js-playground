import express from "express";
import { UserRole } from "../users/types";
import {
  postController as ctrl,
  requireAuth,
  requireRole,
} from "@/common/container";

const appRouter = express.Router();

appRouter.use(requireAuth(), requireRole(UserRole.ADMIN));

appRouter.get("/", ctrl.index);
appRouter.get("/:id", ctrl.show);

export default appRouter;
