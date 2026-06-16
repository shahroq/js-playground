import { ProductCard } from "./ProductCard";

type Props = {
  products: any;
  title?: string;
};
export function ProductList({ products, title }: Props) {
  if (products.length === 0) return <h3>No Product</h3>;

  return (
    <div className="">
      <h3 className="mb-5">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
}
