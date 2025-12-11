import express from "express";
import {
  reviewController as ctrl,
  validate,
  normalizeQueryHandler as normalize,
  reviewsQueryOptions as queryOptions,
} from "@/common/container";
import { NormQueryDtoList, NormQueryDtoShow } from "@/common/app-query/dto";

const router = express.Router();

router.get(
  "/",
  [validate("reviews.findAll"), normalize(queryOptions, NormQueryDtoList)],
  ctrl.index.bind(ctrl)
);
router.get(
  "/:id",
  [validate("reviews.findOne"), normalize(queryOptions, NormQueryDtoShow)],
  ctrl.show.bind(ctrl)
);
router.post("/", validate("reviews.create"), ctrl.store.bind(ctrl));
router.patch("/:id", validate("reviews.update"), ctrl.update.bind(ctrl));
router.delete("/:id", validate("reviews.delete"), ctrl.destroy.bind(ctrl));

export default router;
