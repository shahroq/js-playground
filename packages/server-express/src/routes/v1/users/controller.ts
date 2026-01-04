import type { Request, Response } from "express";
import type { UserService } from "./service";
import type { AuthService } from "./auth.service";
import type { EntityId } from "@/common/types";
import { normalizeQueryString } from "@/common/container";
import { policyList, policyShow } from "./policy/query-object.policy";

export class UserController {
  private collection = "user";

  constructor(
    private readonly service: UserService,
    private readonly authService: AuthService
  ) {}

  index = async (req: Request, res: Response) => {
    const queryObject = normalizeQueryString(req.query, policyList);

    const [items, meta] = await this.service.getItems(queryObject);

    res.status(200).json({ [`${this.collection}s`]: items, meta });
  };

  show = async (req: Request, res: Response) => {
    const queryObject = normalizeQueryString(req.query, policyShow);

    const item = await this.service.getItem(
      req.params.id as EntityId,
      queryObject
    );

    res.status(200).json({ [this.collection]: item });
  };

  store = async (req: Request, res: Response) => {
    const newItem = await this.service.createItem(req.body);

    res.status(201).json({ [this.collection]: newItem });
  };

  update = async (req: Request, res: Response) => {
    const updatedItem = await this.service.updateItem(
      req.params.id as EntityId,
      req.body
    );

    res.status(200).json({ [this.collection]: updatedItem });
  };

  destroy = async (req: Request, res: Response) => {
    await this.service.deleteItem(req.params.id as EntityId);

    res.status(200).json({ message: `${this.collection} deleted.` });
  };

  signUp = async (req: Request, res: Response) => {
    const newItem = await this.authService.signUp(req.body);

    res.status(201).json({ [this.collection]: newItem });
  };

  signIn = async (req: Request, res: Response) => {
    await this.authService.signIn(req.body);
  };
  /*
  signOut = async (req: Request, res: Response) => {
    await this.authService.signOut();
  };
  */
}
