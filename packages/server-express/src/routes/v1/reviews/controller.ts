import type { Request, Response } from "express";
import type { ReviewService } from "./service";
import type { EntityId } from "@/common/types";
import { AppQuery, reviewsQueryPolicy } from "@/common/container";

export class ReviewController {
  private collection = "review";

  constructor(private readonly service: ReviewService) {}

  index = async (req: Request, res: Response) => {
    const appQuery = new AppQuery(req.query, reviewsQueryPolicy);
    const [items, meta] = await this.service.getItems(appQuery);

    res.status(200).json({ [`${this.collection}s`]: items, meta });
  };

  show = async (req: Request, res: Response) => {
    const appQuery = new AppQuery(req.query, reviewsQueryPolicy);
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

  reject = async (req: Request, res: Response) => {
    const updatedItem = await this.service.rejectItem(
      req.params.id as EntityId
    );

    res.status(200).json({ [this.collection]: updatedItem });
  };

  approve = async (req: Request, res: Response) => {
    const updatedItem = await this.service.approveItem(
      req.params.id as EntityId
    );

    res.status(200).json({ [this.collection]: updatedItem });
  };
}
