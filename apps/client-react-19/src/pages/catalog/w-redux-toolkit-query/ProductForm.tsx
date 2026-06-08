import { Alert, Button, Skeleton, Form } from "@packages/comps";
import { productInitValues, type Product } from "@packages/types/types";
import type { EntityId } from "@reduxjs/toolkit";
import { rules } from "./rules";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "./services/products-api";

type Props = {
  id?: EntityId;
  onClose?: () => void;
};

export function ProductForm({ id, onClose }: Props) {
  const isUpdateMode = !!id;

  // 1. Load product (update mode)
  const { data, isLoading, error, isError } = useGetProductQuery(id!, {
    skip: !isUpdateMode,
  });

  // 2. Mutations
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const isSubmitting = isCreating || isUpdating;

  // 3. Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<Partial<Product>>({
    defaultValues: productInitValues,
    values: data ?? productInitValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // 4. Submit
  const onSubmit: SubmitHandler<Product> = async (data) => {
    if (Object.keys(formErrors).length) return;
    try {
      await handleMutation(data);
      onClose?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMutation = async (data: Product) => {
    if (id) {
      await updateProduct({ id, body: data }).unwrap();
    } else {
      await createProduct(data).unwrap();
    }
  };

  // 5. UI states
  if (isLoading && isUpdateMode) return <Skeleton times={5} />;
  if (isError) return <Alert variant="warning">{JSON.stringify(error)}</Alert>;

  return (
    <Form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
      aria-invalid={!!Object.keys(formErrors).length}
    >
      <Form.Row>
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Input type="text" id="name" {...register("name", rules?.name)} />
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
          type="number"
          id="price"
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
        <Button type="reset" className="btn-outline" disabled={isSubmitting}>
          Reset
        </Button>
      </div>
    </Form>
  );
}
