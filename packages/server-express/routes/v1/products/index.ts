import express from "express";
import {
  productController as ctrl,
  normalizeQueryHandler as normalizeQuery,
  validate,
  productsQueryOptions as options,
} from "@/common/container";

const router = express.Router();

router.get(
  "/",
  [validate("products.findAll"), normalizeQuery(options)],
  ctrl.index
);
router.get(
  "/:id",
  [validate("products.findOne"), normalizeQuery(options)],
  ctrl.show
);
router.post("/", validate("products.create"), ctrl.store);
router.patch("/:id", validate("products.update"), ctrl.update);
router.delete("/:id", validate("products.delete"), ctrl.destroy);

export default router;
