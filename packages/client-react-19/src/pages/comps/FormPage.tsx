import { useState } from "react";
import { PageTitle } from "@/comps";
import type { Page } from "@gpublic/types/types";
import { Button, FormControl } from "@gpublic/comps";

const page: Page = {
  title: "Form",
  breadcrumb: [{ label: "Components" }, { label: "Form" }],
};

export function FormPage() {
  const [form, setForm] = useState({
    title: "task 1",
    description: "",
    category: "",
  });

  const options = [
    { label: "-- Choose Category --", value: "" },
    { label: "Home", value: "home" },
    { label: "Work", value: "work" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <section>
      <PageTitle page={page} />

      <form className="form" onSubmit={handleSubmit}>
        <FormControl
          type="input"
          subtype="text"
          id="title"
          label="Title"
          help="Enter valid title"
          defaultValue={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <FormControl
          type="input"
          subtype="textarea"
          id="description"
          label="Description"
          help="Enter valid description"
          defaultValue={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <FormControl
          type="select"
          id="category"
          label="Category"
          help="Select valid category"
          defaultValue={form.category}
          options={options}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <Button type="submit">Submit</Button>
      </form>
    </section>
  );
}
