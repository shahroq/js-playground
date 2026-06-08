import express from "express";
import { accountController as ctrl, validate } from "@/common/container";

const appRouter = express.Router();

appRouter.post("/register", [validate("users.create")], ctrl.signUp);
appRouter.post("/login", [validate("users.login")], ctrl.signIn);
appRouter.post("/logout", ctrl.signOut);

export default appRouter;
