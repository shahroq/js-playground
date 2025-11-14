import express from "express";
import { reviewController as controller } from "./controller";
import { validate } from "@/core/validation";

const router = express.Router();

router.get("/", validate("reviews.getItems"), controller.getItems);
router.get("/:id", validate("reviews.getItem"), controller.getItem);
router.post("/", validate("reviews.createItem"), controller.createItem);
router.put("/:id", validate("reviews.updateItem"), controller.updateItem);
router.delete("/:id", validate("reviews.deleteItem"), controller.deleteItem);

export default router;
