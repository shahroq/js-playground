import express from "express";
import { productController as ctrl, validate } from "@/common/container";

const router = express.Router();

router.get("/", validate("products.getItems"), ctrl.index.bind(ctrl));
router.get("/:id", validate("products.getItem"), ctrl.show.bind(ctrl));
router.post("/", validate("products.createItem"), ctrl.store.bind(ctrl));
router.put("/:id", validate("products.updateItem"), ctrl.update.bind(ctrl));
router.delete("/:id", validate("products.deleteItem"), ctrl.destroy.bind(ctrl));

export default router;
