import { getDBAdapter } from ".";
import { ProductRepository } from "@/routes/v1/products/repository";

// let dbAdapter = getDBAdapter(); // used for migration directly

// HERE: wtf, why it return empty when reading the file!
const fn = async () => {
  const productRepository = new ProductRepository();
  // finAll test
  // const allItems = await productRepository.findAll();
  // console.log("-->");
  // console.table(allItems);

  await productRepository.deleteMany();
};
await fn();
// console.log(allItems);
