"use client";
import { Button, FormControl, Alert } from "@gpublic/comps";
import { useActionState } from "react";
import { FormState, Task } from "./types";

type Props = {
  task?: Partial<Task>;
  action: (
    prevState: FormState,
    formData: FormData,
  ) => Promise<FormState> | FormState;
};

export default function Form({ task, action }: Props) {
  const initialFormState: FormState = { values: task };

  const [formState, formAction, isPending] = useActionState(
    action,
    initialFormState,
  );

  return (
    <>
      {formState?.message && (
        <Alert variant={formState?.errors ? "danger" : "info"}>
          {formState.message}
          {formState?.errors && (
            <ul>
              {formState?.errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          )}
        </Alert>
      )}
      <form className="form" action={formAction}>
        <FormControl
          type="input"
          subtype="hidden"
          name="id"
          id="id"
          defaultValue={formState?.values?.id || 0}
        />
        <FormControl
          type="input"
          subtype="text"
          name="title"
          id="title"
          label="Title *"
          defaultValue={formState?.values?.title || ""}
        />
        <FormControl
          type="textarea"
          name="desc"
          id="desc"
          label="Description *"
          defaultValue={formState?.values?.desc || ""}
        />
        <Button type="submit" loading={isPending}>
          Submit
        </Button>
      </form>
    </>
  );
}
