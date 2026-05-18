import type { Request, Response } from "express";
import { queryParser } from "@/common/container";
import type { ProductService } from "./service";
import type { EntityId } from "@/common/types";
import { policyList, policyShow } from "./policy/query-object.policy";

export class ProductController {
  private collection = "product";

  constructor(private readonly service: ProductService) {}

  index = async (req: Request, res: Response) => {
    const queryObject = queryParser(req.query, policyList);

    const [items, meta] = await this.service.getItems(queryObject);

    res.status(200).json({ [`${this.collection}s`]: items, meta });
  };

  show = async (req: Request, res: Response) => {
    const queryObject = queryParser(req.query, policyShow);

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

  productReviews = async (req: Request, res: Response) => {
    const reviews = await this.service.getProductReviews(
      req.params.id as EntityId
    );

    res.status(200).json(reviews);
  };

  productReviewsSummary = async (req: Request, res: Response) => {
    const reviews = await this.service.getProductReviews(
      req.params.id as EntityId
    );

    res.status(200).json(reviews);
  };
}
