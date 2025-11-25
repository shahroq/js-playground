import express from "express";
import { productController as controller } from "./controller";
import { validate } from "@/common/validation/factory";

const router = express.Router();

router.get("/", validate("products.getItems"), controller.index);
router.get("/:id", validate("products.getItem"), controller.show);
router.post("/", validate("products.createItem"), controller.store);
router.put("/:id", validate("products.updateItem"), controller.update);
router.delete("/:id", validate("products.deleteItem"), controller.destroy);
router.get(
  "/:id/reviews",
  validate("products.getItem"),
  controller.showWithReviews
);

export default router;
