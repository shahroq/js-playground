import express from "express";
import { objectController as ctrl } from "@/common/container";

const router = express.Router();

router.get("/", ctrl.index);

export default router;
