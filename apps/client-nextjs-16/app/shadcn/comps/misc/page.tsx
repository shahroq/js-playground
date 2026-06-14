"use client";
import { Separator } from "@jsp/shared/comps-shadcn/ui/separator";
import { Button } from "@jsp/shared/comps-shadcn/ui/button";
import { Badge } from "@jsp/shared/comps-shadcn/ui/badge";
import { Apple } from "lucide-react";

export default function Misc() {
  return (
    <section>
      <div className="py-4 flex gap-2">
        <Button className="">Button</Button>
        <Button variant="secondary">Button</Button>
        <Badge>
          <Apple />
          Click
        </Badge>
      </div>

      <Separator />
    </section>
  );
}
