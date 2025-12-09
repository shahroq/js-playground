import express from "express";
import {
  productController as ctrl,
  validate,
  normalizeQueryHandler as normalize,
} from "@/common/container";
import { options } from "./options";

const router = express.Router();

router.get(
  "/",
  [validate("products.findAll"), normalize({}, options)],
  ctrl.index.bind(ctrl)
);
router.get(
  "/:id",
  [validate("products.findOne"), normalize({}, options)],
  ctrl.show.bind(ctrl)
);
router.post("/", validate("products.create"), ctrl.store.bind(ctrl));
router.patch("/:id", validate("products.update"), ctrl.update.bind(ctrl));
router.delete("/:id", validate("products.delete"), ctrl.destroy.bind(ctrl));

export default router;
