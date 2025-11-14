import express from "express";
import { userController as controller } from "./controller";
import { getValidateMiddleware } from "@/core/validation";

const router = express.Router();

const validate = getValidateMiddleware();

router.get("/", validate("users.getItems"), controller.getItems);
router.get("/:id", validate("users.getItem"), controller.getItem);
router.post("/", validate("users.createItem"), controller.createItem);
router.put("/:id", validate("users.updateItem"), controller.updateItem);
router.delete("/:id", validate("users.deleteItem"), controller.deleteItem);

export default router;
