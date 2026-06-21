import Image from "next/image";
import Link from "next/link";
import { resolveImgPath } from "@jsp/shared/utils";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Product } from "@e-com/lib/types";
import { ProductPrice } from ".";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  if (!product) return null;

  return (
    <Card className="relative mx-auto w-full max-w-sm">
      <CardHeader>
        <Image
          src={resolveImgPath(product?.images?.[0], "/img/products")}
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
