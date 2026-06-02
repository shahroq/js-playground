import { useActionState } from "react";
import type { Product } from "@gpublic/types/types";
import { Form, Button, Alert } from "@gpublic/comps";
import type { FormState } from "./types";

type Props = {
  product?: Partial<Product>;
  action: (
    prevState: FormState,
    formData: FormData,
  ) => Promise<FormState> | FormState;
  onCloseModal?: () => void;
};

export default function FormProduct({ product, action, onCloseModal }: Props) {
  const initialFormState: FormState = { values: product };

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
          <Form.Label htmlFor="name">Name *</Form.Label>
          <Form.Input
            type="text"
            name="name"
            id="name"
            defaultValue={formState?.values?.name || ""}
          />
          <Form.Description>{"Enter valid title"}</Form.Description>
        </Form.Row>

        <Form.Row>
          <Form.Label htmlFor="description">Description *</Form.Label>
          <Form.Textarea
            name="description"
            id="description"
            defaultValue={formState?.values?.description || ""}
          />
          <Form.Description>{"Enter valid description"}</Form.Description>
        </Form.Row>

        <Form.Row>
          <Form.Label htmlFor="price">Price</Form.Label>
          <Form.Input
            type="number"
            name="price"
            id="price"
            defaultValue={formState?.values?.price || ""}
          />
          <Form.Description>{"Enter valid title"}</Form.Description>
        </Form.Row>

        <Button type="submit" loading={isPending}>
          Submit
        </Button>
      </Form>
    </>
  );
}
