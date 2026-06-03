import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { PageTitle } from "@/comps";
import { taskInitValues, type Page, type Task } from "@gpublic/types/types";
import { options, type FormElement, type FormFeedback } from "../types";
import { Form, Button, Alert } from "@gpublic/comps";
import { taskSchema, validateByZod as v } from "@gpublic/validation";
import { INITIAL_STATE } from "@/pages/counter/w-reducer/counter-reducer";

const page: Page = {
  title: "Plain",
  breadcrumb: [
    { label: "Components" },
    { label: "Form" },
    { label: "Plain (Controlled)" },
  ],
};

export function FormPage() {
  return (
    <section>
      <PageTitle page={page} />
      <TaskForm />
    </section>
  );
}

/**
 * CONTROLLED components → React state is the source of truth
 * use `value` attr
 */
function TaskForm() {
  const [formValues, setFormValues] = useState<Task>(taskInitValues);
  const [formFeedback, setFormFeedback] = useState<FormFeedback>();

  // Generic handler for any field
  const handleChange = (e: ChangeEvent<FormElement>) => {
    // console.log(e.target);
    const { name, value } = e.target;
    // console.log(name, value);
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formValues:", formValues);

    // validation
    const vResult = v<Task>(taskSchema, formValues);

    if (!vResult.success) {
      setFormFeedback({
        title: "Errors:",
        // messages: vResult.errors.map((error) => error.message),
        messages: Object.values(vResult.errors).flat(),
      });
      return;
    }

    // reset form if needed
    setFormFeedback(undefined);
    setFormValues(taskInitValues);
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      {formFeedback && (
        <Alert variant="warning" messages={formFeedback.messages}>
          {formFeedback.title}
        </Alert>
      )}

      <Form.Row>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Input
          type="text"
          name="title"
          id="title"
          value={formValues.title}
          onChange={handleChange}
        />
        <Form.Description>{"Enter valid title"}</Form.Description>
      </Form.Row>

      <Form.Row>
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Textarea
          name="description"
          id="description"
          value={formValues.description}
          onChange={handleChange}
        />
        <Form.Description>{"Enter valid description"}</Form.Description>
      </Form.Row>

      <Form.Row>
        <Form.Label htmlFor="category">Category</Form.Label>
        <Form.Select
          name="category"
          id="category"
          options={options}
          value={formValues.category}
          onChange={handleChange}
        />
        <Form.Description>{"Enter valid description"}</Form.Description>
      </Form.Row>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
