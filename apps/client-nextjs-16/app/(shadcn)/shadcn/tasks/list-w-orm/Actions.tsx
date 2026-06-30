"use client";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { ActionDelete } from "./ActionDelete";
import { ActionUpdate } from "./ActionUpdate";
import { Task } from "@jsp/shared/types";

type Props = {
  task: Task;
};

export function Actions({ task }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ActionUpdate task={task} />
        <DropdownMenuItem disabled>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <ActionDelete task={task} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
