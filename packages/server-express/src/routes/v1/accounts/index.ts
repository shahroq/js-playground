import express from "express";
import { accountController as ctrl, validate } from "@/common/container";

const router = express.Router();

router.post("/register", validate("users.create"), ctrl.signUp);
router.post("/login", validate("users.login"), ctrl.signIn);
router.post("/logout", ctrl.signOut);

export default router;
