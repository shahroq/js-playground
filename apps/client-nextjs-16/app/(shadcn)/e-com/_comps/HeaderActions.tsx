import { ShoppingCart } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";

export function HeaderActions() {
  return (
    <>
      <Button variant={"outline"}>
        <ShoppingCart />
        Cart
      </Button>
    </>
  );
}
