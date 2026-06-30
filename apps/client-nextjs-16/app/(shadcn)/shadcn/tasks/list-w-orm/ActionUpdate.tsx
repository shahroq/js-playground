"use client";
import { useState } from "react";
import { Task } from "@jsp/shared/types";
import { updateTask } from "@/lib/actions/tasks.action";
import { DropdownMenuItem } from "@/shadcn/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog";
import { FormTask } from "./FormTask";

type Props = { task?: Task };

export function ActionUpdate({ task }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Update
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
          </DialogHeader>

          <FormTask task={task} action={updateTask} />
        </DialogContent>
      </Dialog>
    </>
  );
}
