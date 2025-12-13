import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/common/container";
import type { ProductService } from "./service";

export class ProductController {
  private collection = "product";

  constructor(private readonly service: ProductService) {}

  index = async (req: Request, res: Response) => {
    const { items, meta } = await this.service.findAll(
      res.locals.appQuery ?? {}
    );

    res.status(200).json({ [`${this.collection}s`]: items, meta });
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { item } = await this.service.findOne(+id, res.locals.appQuery ?? {});
    if (!item) return next(AppError.notFound());

    res.status(200).json({ [this.collection]: item });
  };

  store = async (req: Request, res: Response) => {
    const { body } = req;

    const { item: newItem } = await this.service.create(body);

    res.status(201).json({ [this.collection]: newItem });
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { body } = req;

    const { item: updatedItem } = await this.service.update(+id, body);
    if (!updatedItem) return next(AppError.notFound());

    res.status(200).json({ [this.collection]: updatedItem });
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deleted = await this.service.delete(+id);
    if (!deleted) return next(AppError.notFound());

    res.status(200).json({ message: `${this.collection} deleted.` });
  };
}
