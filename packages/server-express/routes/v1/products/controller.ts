import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/common/container";
import type { ProductService } from "./service";

export class ProductController {
  private collection = "product";

  constructor(private readonly service: ProductService) {}

  async index(req: Request, res: Response) {
    const { items, meta } = await this.service.findAll(req.appQuery ?? {});

    res.status(200).json({ [`${this.collection}s`]: items, meta });
  }

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const { item } = await this.service.findOne(+id, req.appQuery ?? {});
    if (!item) return next(AppError.notFound());

    res.status(200).json({ [this.collection]: item });
  }

  async store(req: Request, res: Response) {
    const { body } = req;

    const { item: newItem } = await this.service.create(body);

    res.status(201).json({ [this.collection]: newItem });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const { body } = req;

    const { item: updatedItem } = await this.service.update(+id, body);
    if (!updatedItem) return next(AppError.notFound());

    res.status(200).json({ [this.collection]: updatedItem });
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const deleted = await this.service.delete(+id);
    if (!deleted) return next(AppError.notFound());

    res.status(200).json({ message: `${this.collection} deleted.` });
  }
}
