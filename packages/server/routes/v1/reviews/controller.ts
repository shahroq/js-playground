import type { Request, Response, NextFunction } from "express";
import { appEnvelope, AppError } from "@/common/container";
import type { ReviewService } from "./service";

export class ReviewController {
  private collection = "review";

  constructor(private readonly service: ReviewService) {}

  async index(req: Request, res: Response) {
    const { items, meta } = await this.service.findAll(req.query);

    res
      .status(200)
      .json(appEnvelope.create(null, { [`${this.collection}s`]: items, meta }));
  }

  async show(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { item } = await this.service.findOne(+id, req.query);
    if (!item) return next(AppError.notFound());

    res.status(200).json(appEnvelope.create(null, { [this.collection]: item }));
  }

  async store(req: Request, res: Response, next: NextFunction) {
    const { body } = req;

    const { item: newItem } = await this.service.create(body);

    res
      .status(201)
      .json(appEnvelope.create(null, { [this.collection]: newItem }));
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const { body } = req;

    const { item: updatedItem } = await this.service.update(+id, body);
    if (!updatedItem) return next(AppError.notFound());

    res
      .status(200)
      .json(appEnvelope.create(null, { [this.collection]: updatedItem }));
  }

  async destroy(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(AppError.badRequest());

    const deleted = await this.service.delete(+id);
    if (!deleted) return next(AppError.notFound());

    res
      .status(200)
      .json(
        appEnvelope.create(null, { message: `${this.collection} deleted.` })
      );
  }
}
