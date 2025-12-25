import express from "express";
import {
  reviewController as ctrl,
  validate,
  normalizeQueryHandler as normalizeQuery,
  reviewsQueryPolicy as policy,
} from "@/common/container";

const router = express.Router();

router.get(
  "/",
  [validate("reviews.findAll"), normalizeQuery(policy)],
  ctrl.index
);
router.get(
  "/:id",
  [validate("reviews.findOne"), normalizeQuery(policy)],
  ctrl.show
);
router.post("/", validate("reviews.create"), ctrl.store);
router.patch("/:id", validate("reviews.update"), ctrl.update);
router.delete("/:id", validate("reviews.delete"), ctrl.destroy);

router.patch("/:id/approve", validate("reviews.update"), ctrl.approve);
router.patch("/:id/reject", validate("reviews.update"), ctrl.reject);

export default router;
