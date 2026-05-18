import type { Request, Response } from "express";
import type { UserService } from "@/features/v1/users/service";
import type { AccountService } from "./service";

export class AccountController {
  private collection = "user";

  constructor(private readonly service: AccountService) {}

  signUp = async (req: Request, res: Response) => {
    const newUser = await this.service.signUp(req.body);

    res.status(201).json({ [this.collection]: newUser });
  };

  signIn = async (req: Request, res: Response) => {
    const token = await this.service.signIn(req.body);

    res.json({ token });
  };

  signOut = async (req: Request, res: Response) => {
    await this.service.signOut();
  };
}
