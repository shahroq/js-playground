import { useActionState } from "react";
import type { Product } from "@gpublic/types/types";
import { Button, FormControl, Alert } from "@gpublic/comps";
import type { FormState } from "./types";

type Props = {
  product?: Partial<Product>;
  action: (
    prevState: FormState,
    formData: FormData,
  ) => Promise<FormState> | FormState;
  onCloseModal?: () => void;
};

export default function Form({ product, action, onCloseModal }: Props) {
  const initialFormState: FormState = { values: product };

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
          name="name"
          id="name"
          label="Name *"
          defaultValue={formState?.values?.name || ""}
        />
        <FormControl
          type="textarea"
          name="description"
          id="description"
          label="Description *"
          defaultValue={formState?.values?.description || ""}
        />
        <FormControl
          type="input"
          subtype="number"
          name="price"
          id="price"
          label="Price *"
          defaultValue={formState?.values?.price || ""}
        />
        <Button type="submit" loading={isPending}>
          Submit
        </Button>
      </form>
    </>
  );
}
