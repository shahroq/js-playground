import express from "express";
import { UserRole } from "../users/types";
import {
  httpbinController as ctrl,
  requireAuth,
  requireRole,
} from "@/common/container";

const appRouter = express.Router();

appRouter.use(requireAuth(), requireRole(UserRole.ADMIN));

appRouter.get("/json", ctrl.json);

export default appRouter;
