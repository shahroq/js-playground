import type { Response } from "express";
import type { Object } from "./types";
import { ObjectService } from "./service";

export class ObjectController {
  private collection = "object";

  constructor(private readonly service: ObjectService) {}

  async index(_: any, res: Response): Promise<void> {
    const items: Object[] = await this.service.findAll();

    res.status(200).json({ [`${this.collection}s`]: items });
  }
}
