import { useForm, type SubmitHandler } from "react-hook-form";
import { pause } from "@jsp/shared/utils";
import { Form, Button, Alert } from "@jsp/shared/comps";
import { taskInitValues, type Page, type Task } from "@jsp/shared/types";
import { taskSchema, zodTaskValidation as v } from "@jsp/shared/validations";
// import { rhfTaskValidation as v } from "@jsp/shared/validations";
import { PageTitle } from "@/comps";
import { options, type FormFeedback } from "../types";

const page: Page = {
  title: "w/ React Hook Form",
  breadcrumb: [
    { label: "Components" },
    { label: "Form" },
    { label: "w/ React Hook Form" },
  ],
};

export default function FormPage() {
  return (
    <section>
      <PageTitle page={page} />
      <TaskForm />
    </section>
  );
}

/**
 * React Hook Form
 * w/ rhf,zod validation
 */
export function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, touchedFields },
    reset,
  } = useForm<Task>({
    defaultValues: taskInitValues,
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: v?.resolver(taskSchema),
  });

  const allFieldsTouched =
    touchedFields.title && touchedFields.description && touchedFields.category;
  const hasErrors = Object.keys(errors).length > 0;
  const showFeedback = hasErrors && (isSubmitted || allFieldsTouched);

  const formFeedback: FormFeedback | null = showFeedback
    ? {
        title: "Errors:",
        messages: Object.values(errors)
          .map((err) => err?.message)
          .filter((msg): msg is string => Boolean(msg)),
      }
    : null;

  const onSubmit: SubmitHandler<Task> = async (data) => {
    console.log("submission clicked");
    try {
      await createProduct(data);
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  async function createProduct(data: Task) {
    await pause(1500);
    console.log(data);

    // reset if needed
    if (0) reset();
  }

  return (
    <Form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
      aria-invalid={!!Object.keys(errors).length}
    >
      {formFeedback && (
        <Alert variant="warning" messages={formFeedback.messages}>
          {formFeedback.title}
        </Alert>
      )}

      <Form.Row>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Input
          type="text"
          id="title"
          {...register("title", v.rules?.title)}
          aria-invalid={!!errors.title}
        />
        {errors?.title && (
          <Form.Description>{errors.title.message}</Form.Description>
        )}
      </Form.Row>

      <Form.Row>
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Textarea
          id="description"
          {...register("description", v.rules?.description)}
          aria-invalid={!!errors.description}
        />
        {errors?.description && (
          <Form.Description>{errors.description.message}</Form.Description>
        )}
      </Form.Row>

      <Form.Row>
        <Form.Label htmlFor="category">Category *</Form.Label>
        <Form.Select
          id="category"
          {...register("category", v.rules?.category)}
          options={options}
          aria-invalid={!!errors.category}
        />
        {errors?.category && (
          <Form.Description>{errors.category.message}</Form.Description>
        )}
      </Form.Row>

      <div className="flex gap-2 mt-5">
        <Button
          type="submit"
          loading={isSubmitting}
          // disabled={!isValid}
        >
          Submit
        </Button>
        <Button type="reset" className="btn-outline" disabled={isSubmitting}>
          Reset
        </Button>
      </div>
    </Form>
  );
}
