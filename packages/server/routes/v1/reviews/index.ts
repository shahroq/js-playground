import express from "express";
import { reviewController as ctrl, validate } from "@/common/container";

const router = express.Router();

router.get("/", validate("reviews.getItems"), ctrl.index.bind(ctrl));
router.get("/:id", validate("reviews.getItem"), ctrl.show.bind(ctrl));
router.post("/", validate("reviews.createItem"), ctrl.store.bind(ctrl));
router.put("/:id", validate("reviews.updateItem"), ctrl.update.bind(ctrl));
router.delete("/:id", validate("reviews.deleteItem"), ctrl.destroy.bind(ctrl));

export default router;
