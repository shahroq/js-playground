"use client";
import { Form, Button, Alert } from "@jsp/shared/comps";
import { useActionState } from "react";
import { FormState, Task } from "./types";

type Props = {
  task?: Partial<Task>;
  action: (
    prevState: FormState,
    formData: FormData,
  ) => Promise<FormState> | FormState;
};

export default function FormTask({ task, action }: Props) {
  const initialFormState: FormState = { values: task };

  const [formState, formAction, isPending] = useActionState(
    action,
    initialFormState,
  );

  return (
    <>
      {formState?.message && (
        <Alert
          variant={formState?.errors ? "danger" : "info"}
          messages={formState?.errors || []}
        >
          {formState.message}
        </Alert>
      )}

      <Form className="form" action={formAction}>
        <Form.Row>
          <Form.Input
            type="hidden"
            name="id"
            id="id"
            defaultValue={formState?.values?.id || 0}
          />
        </Form.Row>

        <Form.Row>
          <Form.Label htmlFor="title">Title *</Form.Label>
          <Form.Input
            type="text"
            name="title"
            id="title"
            defaultValue={formState?.values?.title || ""}
          />
          <Form.Description>{"Enter valid title"}</Form.Description>
        </Form.Row>

        <Form.Row>
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Textarea
            name="description"
            id="description"
            defaultValue={formState?.values?.description || ""}
          />
          <Form.Description>{"Enter valid description"}</Form.Description>
        </Form.Row>

        <Button type="submit" loading={isPending}>
          Submit
        </Button>
      </Form>
    </>
  );
}
