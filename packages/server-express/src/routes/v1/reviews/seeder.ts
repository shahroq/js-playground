import dataSource from "@root/data/data-source.json";
import { AppQuery, reviewRepository } from "@/common/container";

const data = dataSource.reviews.map((i) => ({
  product_id: +i.product_id,
  content: i.content,
  rating: +i.rating,
  status: i.status.toUpperCase(),
  created_at: new Date(),
  updated_at: new Date(),
  created_by: +i.created_by,
  updated_by: +i.updated_by,
}));

export async function seed(reset: boolean = true) {
  if (reset) await reviewRepository.deleteMany(new AppQuery({}));

  for (const item of data) await reviewRepository.create(item);
  console.log(`Seeded ${data.length} reviews.`);
}
