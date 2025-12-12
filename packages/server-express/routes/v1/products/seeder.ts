import dataSource from "@/data/data-source.json";
import { AppQuery, productRepository } from "@/common/container";

const data = dataSource.products.map((i) => ({
  name: i.name,
  description: i.description,
  price: i.price,
  category: i.category,
  in_stock: Boolean(i.in_stock),
  created_at: new Date(),
  updated_at: new Date(),
  created_by: +i.created_by,
  updated_by: +i.updated_by,
}));

export async function seed(reset: boolean = true) {
  if (reset) await productRepository.deleteMany(new AppQuery({}));

  for (const item of data) await productRepository.create(item);
  console.log(`Seeded ${data.length} products.`);
}
