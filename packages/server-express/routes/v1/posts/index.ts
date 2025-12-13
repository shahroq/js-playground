import express from "express";
import { postController as ctrl } from "@/common/container";

const router = express.Router();

router.get("/", ctrl.index);
router.get("/:id", ctrl.show);

export default router;
