import { useRef, type ChangeEvent, type SubmitEvent } from "react";
import { taskInitValues, type Page } from "@jsp/shared/types";
import { Form, Button } from "@jsp/shared/comps";
import { PageTitle } from "@/comps";
import { options, type FormElement } from "../types";

const page: Page = {
  title: "Plain",
  breadcrumb: [
    { label: "Components" },
    { label: "Form" },
    { label: "Plain (Uncontrolled)" },
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
 * UNCONTROLLED components → the DOM manages the input state internally
 * use `defaultValue` attr
 */
function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // obsolete
  const handleChange = (e: ChangeEvent<FormElement>) => {};

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.target);

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    console.log("formData:", formData);

    /*
    const formValues = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
    };
    */

    // reset form if needed
    if (0) formRef.current.reset();
  };

  return (
    <Form className="form" onSubmit={handleSubmit} ref={formRef}>
      <Form.Row>
        <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Input
          type="text"
          name="title"
          id="title"
          defaultValue={taskInitValues.title}
          onChange={handleChange}
        />
        <Form.Description>{"Enter valid title"}</Form.Description>
      </Form.Row>

      <Form.Row>
        <Form.Label htmlFor="description">Description</Form.Label>
        <Form.Textarea
          name="description"
          id="description"
          defaultValue={taskInitValues.description}
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
          defaultValue={taskInitValues.category}
          onChange={handleChange}
        />
        <Form.Description>{"Enter valid description"}</Form.Description>
      </Form.Row>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
