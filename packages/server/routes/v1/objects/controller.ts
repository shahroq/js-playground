import type { Request, Response } from "express";
import { appEnvelope } from "@/common/container";
import type { Object } from "./types";
import { ObjectService } from "./service";

export class ObjectController {
  private collection = "object";

  constructor(private readonly service: ObjectService) {}

  async index(_req: Request, res: Response): Promise<void> {
    const items: Object[] = await this.service.getItems();
    res
      .status(200)
      .json(appEnvelope.create(null, { [`${this.collection}s`]: items }));
  }
}
