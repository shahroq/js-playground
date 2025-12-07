import express from "express";
import { objectController as ctrl } from "@/common/container";

const router = express.Router();

router.get("/", ctrl.index.bind(ctrl));

export default router;
