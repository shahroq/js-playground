import express from "express";
import {
  reviewController as ctrl,
  validate,
  coerceId,
} from "@/common/container";

const router = express.Router();

router.get("/", [validate("reviews.findAll")], ctrl.index);
router.get("/:id", [validate("reviews.findOne"), coerceId], ctrl.show);
router.post("/", [validate("reviews.create")], ctrl.store);
router.patch("/:id", [validate("reviews.update"), coerceId], ctrl.update);
router.delete("/:id", [validate("reviews.delete"), coerceId], ctrl.destroy);
router.patch(
  "/:id/approve",
  [validate("reviews.update"), coerceId],
  ctrl.approve
);
router.patch(
  "/:id/reject",
  [validate("reviews.update"), coerceId],
  ctrl.reject
);

export default router;
