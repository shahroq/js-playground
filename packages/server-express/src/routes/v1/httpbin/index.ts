import express from "express";
import {
  httpbinController as ctrl,
  requireAuth,
  requireRole,
} from "@/common/container";
import { UserRole } from "../users/types";

const router = express.Router();

router.use(requireAuth(), requireRole(UserRole.ADMIN));

router.get("/json", ctrl.json);

export default router;
