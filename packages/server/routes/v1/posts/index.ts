import express from "express";
import { postController as controller } from "./controller";

const router = express.Router();

router.get("/", controller.index);
router.get("/:id", controller.show);

export default router;
