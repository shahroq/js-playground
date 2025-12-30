import express from "express";
import { httpbinController as ctrl } from "@/common/container";

const router = express.Router();

router.get("/json", ctrl.json);

export default router;
