import express from "express";
import { productController as controller } from "./controller";
import { validate } from "@/common/validation";

const router = express.Router();

router.get("/", validate("products.getItems"), controller.getItems);
router.get("/:id", validate("products.getItem"), controller.getItem);
router.post("/", validate("products.createItem"), controller.createItem);
router.put("/:id", validate("products.updateItem"), controller.updateItem);
router.delete("/:id", validate("products.deleteItem"), controller.deleteItem);

export default router;
