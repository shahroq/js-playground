import express from "express";
import { reviewController as controller } from "./controller";
import { validate } from "@/common/validation";

const router = express.Router();

router.get("/", validate("reviews.getItems"), controller.index);
router.get("/:id", validate("reviews.getItem"), controller.show);
router.post("/", validate("reviews.createItem"), controller.store);
router.put("/:id", validate("reviews.updateItem"), controller.update);
router.delete("/:id", validate("reviews.deleteItem"), controller.destroy);

export default router;
