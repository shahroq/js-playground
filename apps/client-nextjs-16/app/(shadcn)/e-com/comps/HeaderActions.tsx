import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import { ModeToggle } from "@/shadcn/components/ModeToggle";

export function HeaderActions() {
  return (
    <div className="ml-auto flex gap-2">
      <Button size="sm">
        <User />
        Sign In
      </Button>
      <Button size="sm" variant={"outline"}>
        <ShoppingCart />
        Cart
      </Button>
      <ModeToggle />
    </div>
  );
}
