"use client";
import { useState } from "react";
import { Button } from "@/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog";
import { createTask } from "@/lib/actions/tasks.action";
import { Task, taskInitValues } from "@jsp/shared/types";
import { FormTask } from "./FormTask";

type Props = { task?: Task };

export function ActionCreate({}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
          </DialogHeader>

          <FormTask task={taskInitValues} action={createTask} />
        </DialogContent>
      </Dialog>
    </>
  );
}
