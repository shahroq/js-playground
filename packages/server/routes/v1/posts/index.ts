import express from "express";
import { postController as ctrl } from "@/common/container";

const router = express.Router();

router.get("/", ctrl.index.bind(ctrl));
router.get("/:id", ctrl.show.bind(ctrl));

export default router;
