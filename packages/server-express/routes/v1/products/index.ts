import express from "express";
import {
  productController as ctrl,
  normalizeQueryHandler as normalize,
  validate,
  productsQueryOptions as queryOptions,
} from "@/common/container";

const router = express.Router();

router.get(
  "/",
  [validate("products.findAll"), normalize(queryOptions)],
  ctrl.index
);
router.get(
  "/:id",
  [validate("products.findOne"), normalize(queryOptions)],
  ctrl.show
);
router.post("/", validate("products.create"), ctrl.store);
router.patch("/:id", validate("products.update"), ctrl.update);
router.delete("/:id", validate("products.delete"), ctrl.destroy);

export default router;
