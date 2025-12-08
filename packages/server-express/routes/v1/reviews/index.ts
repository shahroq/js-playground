import express from "express";
import {
  reviewController as ctrl,
  validate,
  normalizeQueryHandler,
} from "@/common/container";

const router = express.Router();

router.get(
  "/",
  normalizeQueryHandler(),
  validate("reviews.findAll"),
  ctrl.index.bind(ctrl)
);
router.get("/:id", validate("reviews.findOne"), ctrl.show.bind(ctrl));
router.post("/", validate("reviews.create"), ctrl.store.bind(ctrl));
router.patch("/:id", validate("reviews.update"), ctrl.update.bind(ctrl));
router.delete("/:id", validate("reviews.delete"), ctrl.destroy.bind(ctrl));

export default router;
