import express from "express";
import { userController as ctrl, validate } from "@/common/container";

const router = express.Router();

router.get("/", validate("users.findAll"), ctrl.index);
router.get("/:id", validate("users.findOne"), ctrl.show);
router.post("/", validate("users.create"), ctrl.store);
router.patch("/:id", validate("users.update"), ctrl.update);
router.delete("/:id", validate("users.delete"), ctrl.destroy);

router.post("/register", validate("users.create"), ctrl.signUp);
router.post("/login", validate("users.login"), ctrl.signIn);
// router.post("/logout", ctrl.signOut);

export default router;
