import Image from "next/image";
import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import Link from "next/link";
import { ProductPrice } from "./ProductPrice";

type Props = {
  product: any;
};

export function ProductCard({ product }: Props) {
  if (!product) return null;
  const mainImg =
    product.images?.length > 0 ? product.images[0] : "/no-img.jpg";

  return (
    <Card className="relative mx-auto w-full max-w-sm">
      <CardHeader>
        <Image
          src={mainImg}
          width={100}
          height={100}
          alt={product.name}
          className="aspect-video w-full object-contain border"
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
