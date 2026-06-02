import { PageTitle } from "@/comps";
import { taskInitValues, type Page, type Task } from "@gpublic/types/types";
import { options } from "../types";
import { Form, Button } from "@gpublic/comps";

const page: Page = {
  title: "w/ useActionState",
  breadcrumb: [
    { label: "Components" },
    { label: "Form" },
    { label: "w/ useActionState" },
  ],
};

/**
 * Use useActionState
 */
export function FormPage() {
  // local operations: validation etc
  function formAction(formData: FormData): any | Promise<any> {
    const entries = Object.fromEntries(formData.entries());

    const formValues: Task = {
      title: entries.title ?? "",
      description: entries.description ?? "",
      category: entries.category ?? "",
    };
    console.log("formValues:", formValues);
  }

  return (
    <section>
      <PageTitle page={page} />

      <Form className="form " action={formAction}>
        <Form.Row>
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Input
            type="text"
            name="title"
            id="title"
            defaultValue={taskInitValues.title}
          />
          <Form.Description>{"Enter valid title"}</Form.Description>
        </Form.Row>

        <Form.Row>
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Textarea
            name="description"
            id="description"
            defaultValue={taskInitValues.description}
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
          />
          <Form.Description>{"Enter valid description"}</Form.Description>
        </Form.Row>

        <Button type="submit">Submit</Button>
      </Form>
    </section>
  );
}
