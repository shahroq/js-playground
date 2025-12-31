import type { Request, Response } from "express";
import type { UserService } from "./service";
import type { EntityId } from "@/common/types";
import { AppQuery, usersQueryPolicy } from "@/common/container";

export class UserController {
  private collection = "user";

  constructor(private readonly service: UserService) {}

  index = async (req: Request, res: Response) => {
    const appQuery = new AppQuery(req.query, usersQueryPolicy);
    const [items, meta] = await this.service.getItems(appQuery);

    res.status(200).json({ [`${this.collection}s`]: items, meta });
  };

  show = async (req: Request, res: Response) => {
    const appQuery = new AppQuery(req.query, usersQueryPolicy);
    const item = await this.service.getItem(
      req.params.id as EntityId,
      appQuery
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
}
