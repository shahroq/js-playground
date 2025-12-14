import type { NextFunction, Request, Response } from "express";
import type { ProductService } from "./service";
import type { EntityId } from "@/common/types";

export class ProductController {
  private collection = "product";

  constructor(private readonly service: ProductService) {}

  index = async (_req: Request, res: Response) => {
    const { items, meta } = await this.service.getItems(res.locals.appQuery);

    res.status(200).json({ [`${this.collection}s`]: items, meta });
  };

  show = async (req: Request, res: Response) => {
    const item = await this.service.getItem(
      req.params.id as EntityId,
      res.locals.appQuery
    );

    res.status(200).json({ [this.collection]: item });
  };

  store = async (req: Request, res: Response) => {
    const newItem = await this.service.createItem(req.body);

    res.status(201).json({ [this.collection]: newItem });
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const updatedItem = await this.service.updateItem(
      req.params.id as EntityId,
      req.body
    );

    res.status(200).json({ [this.collection]: updatedItem });
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const deleted = await this.service.deleteItem(req.params.id as EntityId);

    res.status(200).json({ message: `${this.collection} deleted.` });
  };
}
