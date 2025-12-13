import express from "express";
import {
  reviewController as ctrl,
  validate,
  normalizeQueryHandler as normalize,
  reviewsQueryOptions as queryOptions,
} from "@/common/container";

const router = express.Router();

router.get(
  "/",
  [validate("reviews.findAll"), normalize(queryOptions)],
  ctrl.index
);
router.get(
  "/:id",
  [validate("reviews.findOne"), normalize(queryOptions)],
  ctrl.show
);
router.post("/", validate("reviews.create"), ctrl.store);
router.patch("/:id", validate("reviews.update"), ctrl.update);
router.delete("/:id", validate("reviews.delete"), ctrl.destroy);

export default router;
