import express from "express";
import {
  postController as ctrl,
  requireAuth,
  requireRole,
} from "@/common/container";
import { UserRole } from "../users/types";

const router = express.Router();

router.use(requireAuth(), requireRole(UserRole.ADMIN));

router.get("/", ctrl.index);
router.get("/:id", ctrl.show);

export default router;
