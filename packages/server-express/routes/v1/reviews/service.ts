import { ReviewStatus } from "./types.d";
import { AppError, AppQuery, config, MetaData } from "@/common/container";
import type { EntityId } from "@/common/types";
import { ReviewRepository } from "./repository";
import type { IReviewResult, Review } from "./types";
import { ProductRepository } from "@products/repository";

export class ReviewService {
  constructor(
    private readonly repository: ReviewRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async getItems(appQuery: AppQuery): Promise<IReviewResult> {
    // add status filter all the times
    appQuery.append({ status: ReviewStatus.APPROVED });

    let [items, total] = await Promise.all([
      this.repository.findAll(appQuery),
      this.repository.count(appQuery),
    ]);

    // TODO: abstract away
    // get expansions: products
    if (appQuery.normQuery.expansion?.include?.includes("products")) {
      items = await Promise.all(
        items.map(async (item) => {
          // get product
          const product = await this.productRepository.findById(
            item.product_id
          );
          return { ...item, product: product ?? undefined };
        })
      );
    }

    // get meta data
    const meta = new MetaData(appQuery, total).build();

    return { items, meta };
  }

  async getItem(id: EntityId, appQuery: AppQuery): Promise<Review> {
    appQuery.append({ id });
    // add status filter all the times
    // appQuery.append({ status: ReviewStatus.APPROVED });

    const item = await this.repository.findOne(appQuery);
    if (!item) throw AppError.notFound();

    // get expansions: products
    // TODO: abstract away
    if (appQuery.normQuery.expansion?.include?.includes("products")) {
      const product = await this.productRepository.findById(
        item?.product_id as EntityId
      );
      if (item && product) item.product = product;
    }

    return item;
  }

  async createItem(data: Review): Promise<Review> {
    if (!data?.status) data = { ...data, status: config.default.review_status };

    const newItem = await this.repository.create(data);
    return newItem;
  }

  async updateItem(id: EntityId, data: Partial<Review>): Promise<Review> {
    // check if this is updatable
    // const appQuery = new AppQuery({ id, status: ReviewStatus.PENDING });
    // const existingReview = await this.repository.findOne(appQuery);
    //...

    const updatedItem = await this.repository.update(+id, data);
    if (!updatedItem) throw AppError.notFound();

    return updatedItem;
  }

  async deleteItem(id: EntityId): Promise<boolean> {
    const deleted = await this.repository.delete(+id);
    if (!deleted) throw AppError.notFound();

    return deleted;
  }
}
