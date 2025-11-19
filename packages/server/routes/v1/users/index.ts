import express from "express";
import { userController as controller } from "./controller";
import { validate } from "@/common/validation";

const router = express.Router();

router.get("/", validate("users.getItems"), controller.index);
router.get("/:id", validate("users.getItem"), controller.show);
router.post("/", validate("users.createItem"), controller.store);
router.put("/:id", validate("users.updateItem"), controller.update);
router.delete("/:id", validate("users.deleteItem"), controller.destroy);

export default router;
