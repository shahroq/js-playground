import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { ProductPrice } from "./ProductPrice";
import { Product } from "@e-com/lib/types";

type Props = {
  product: Product;
};

const defaultImgSrc = `/img/no-img.jpg`;

export function ProductCard({ product }: Props) {
  if (!product) return null;

  const [firstImg] = product?.images ?? [];
  const imgSrc = firstImg ? `/img/products/${firstImg}` : defaultImgSrc;

  return (
    <Card className="relative mx-auto w-full max-w-sm">
      <CardHeader>
        <Image
          src={imgSrc}
          width={100}
          height={100}
          alt={product.name}
          className="aspect-video w-full object-contain border"
          // onError={(e) => (e.currentTarget.src = defaultImgSrc)}
        />
      </CardHeader>

      <CardContent className="space-y-2">
        {" "}
        <Link href={`/e-com/product/${product.id}`} className="block">
          <CardTitle>{product.name}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
        <ProductPrice value={product.price} />
      </CardContent>
      <CardFooter>
        <Button className="w-full">+ Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
