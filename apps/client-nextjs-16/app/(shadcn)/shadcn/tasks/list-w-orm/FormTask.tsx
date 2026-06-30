"use client";
import { useActionState } from "react";
import { Button } from "@/shadcn/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shadcn/components/ui/field";
import { Spinner } from "@/shadcn/components/ui/spinner";
import { Textarea } from "@/shadcn/components/ui/textarea";
import Form from "next/form";
import { Json } from "@jsp/shared/comps";
import { Input } from "@/shadcn/components/ui/input";
import { updateTask } from "@/lib/actions/tasks.action";
import { Task } from "@jsp/shared/types";

type Props = {
  task?: Task;
  action: typeof updateTask;
  submitLabel?: string;
};

export function FormTask({
  task,
  action: serverAction,
  submitLabel = "Submit",
}: Props) {
  const [state, action, isPending] = useActionState(serverAction, {
    success: false,
    message: "",
  });

  return (
    <Form action={action}>
      <Json data={state} />

      {task && <Input type="hidden" name="id" value={task.id} />}

      <FieldSet>
        <FieldLegend>Task Form</FieldLegend>
        {state.message && (
          <>
            <FieldDescription
              data-success={state.success}
              className={state.success ? "text-green-600" : "text-destructive"}
            >
              {state.message}
            </FieldDescription>
          </>
        )}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="input-field-title">Title</FieldLabel>
            <Input
              id="input-field-title"
              type="text"
              name="title"
              defaultValue={task?.title}
            />
            <FieldDescription></FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-description">
              Description
            </FieldLabel>
            <Textarea
              id="input-field-description"
              name="description"
              defaultValue={task?.description}
            />
            <FieldDescription></FieldDescription>
          </Field>
          <Field orientation="responsive">
            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              {submitLabel}
            </Button>
            <Button type="reset" variant="outline" disabled={isPending}>
              Reset
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </Form>
  );
}
