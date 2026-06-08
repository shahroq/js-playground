import { Alert, Button, Skeleton, Form } from "@gpublic/comps";
import { productInitValues, type Product } from "@gpublic/types/types";
import type { EntityId } from "@reduxjs/toolkit";
import { rules } from "./rules.ts";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateProduct, useProduct, useUpdateProduct } from "./hooks.ts";

type Props = {
  id?: EntityId;
  onClose?: () => void;
};

export function ProductForm({ id, onClose }: Props) {
  const isUpdateMode = !!id;

  // 1. Load product (update mode)
  const { data, isPending, isError, error } = useProduct(id);

  // 2. Mutations
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct(id);
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // 3. Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<Partial<Product>>({
    defaultValues: productInitValues,
    values: data ?? productInitValues,
    mode: "onChange",
  });

  // 4. Submit
  const onSubmit: SubmitHandler<Product> = async (data) => {
    if (Object.keys(formErrors).length) return;

    try {
      if (id) {
        await updateMutation.mutateAsync({ id, data });
      } else {
        await createMutation.mutateAsync(data);
      }

      onClose?.();
    } catch (err) {
      console.error(err);
    }
  };

  // 5. UI states
  if (isPending && isUpdateMode) return <Skeleton times={5} />;
  if (isError) return <Alert variant="warning">{JSON.stringify(error)}</Alert>;

  return (
    <Form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
      aria-invalid={!!Object.keys(formErrors).length}
    >
      <Form.Row>
        <Form.Label htmlFor="name">Name</Form.Label>

        <Form.Input id="name" type="text" {...register("name", rules?.name)} />

        {formErrors?.name && (
          <Form.Description>{formErrors.name.message}</Form.Description>
        )}
      </Form.Row>

      <Form.Row>
        <Form.Label htmlFor="description">Description</Form.Label>

        <Form.Textarea
          id="description"
          {...register("description", rules?.description)}
        />

        {formErrors?.description && (
          <Form.Description>{formErrors.description.message}</Form.Description>
        )}
      </Form.Row>

      <Form.Row>
        <Form.Label htmlFor="price">Price</Form.Label>

        <Form.Input
          id="price"
          type="number"
          {...register("price", rules?.price)}
        />

        {formErrors?.price && (
          <Form.Description>{formErrors.price.message}</Form.Description>
        )}
      </Form.Row>

      <div className="flex gap-2 mt-5">
        <Button type="submit" loading={isSubmitting}>
          Submit
        </Button>

        <Button
          type="button"
          className="btn-outline"
          disabled={isSubmitting}
          onClick={() => reset(productInitValues)}
        >
          Reset
        </Button>
      </div>
    </Form>
  );
}
