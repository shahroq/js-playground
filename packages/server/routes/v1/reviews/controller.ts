import type { Request, Response, NextFunction } from "express";
import AppError from "@/common/app-error/app-error";
import { appResponse } from "@/common/container";
import type { ReviewService } from "./service";

export class ReviewController {
  private collection = "review";

  constructor(private service: ReviewService) {}

  async index(req: Request, res: Response, next: NextFunction) {
    const { items, meta } = await this.service.getItems(req.query);

    res
      .status(200)
      .json(appResponse.format(null, { [`${this.collection}s`]: items, meta }));
  }

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { item } = await this.service.getItem(+id, req.query);
    if (!item) return next(AppError.notFound());

    res.status(200).json(appResponse.format(null, { [this.collection]: item }));
  }

  async store(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    const { item: newItem } = await this.service.createItem(body);

    res
      .status(201)
      .json(appResponse.format(null, { [this.collection]: newItem }));
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { body } = req;

    const { item: updatedItem } = await this.service.updateItem(+id, body);
    if (!updatedItem) return next(AppError.notFound());

    res
      .status(200)
      .json(appResponse.format(null, { [this.collection]: updatedItem }));
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const deleted = await this.service.deleteItem(+id);
    if (!deleted) return next(AppError.notFound());

    res
      .status(200)
      .json(
        appResponse.format(null, { message: `${this.collection} deleted.` })
      );
  }
}
