"use client";
import type { PropsWithChildren, ComponentProps } from "react";

type SelectOption = { label: string; value: string };
type Props = ComponentProps<"form"> & PropsWithChildren;
type PropsFormDescription = ComponentProps<"span">;
type PropsLabel = ComponentProps<"label">;
type PropsInput = ComponentProps<"input">;
type PropsTextarea = ComponentProps<"textarea">;
type PropsSelect = ComponentProps<"select"> & {
  options?: SelectOption[];
};

function Form({ children, className, ...rest }: Props) {
  return (
    <form className={[className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </form>
  );
}

function FormRow({ children }: PropsWithChildren) {
  return <div className="form-row">{children}</div>;
}

function FormDescription({ children, className }: PropsFormDescription) {
  return (
    <span className={["form-description", className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}

function Label({ children, className, ...rest }: PropsLabel) {
  return (
    <label
      className={["form-label", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </label>
  );
}

function Input({ type = "text", className, ...rest }: PropsInput) {
  return (
    <input
      type={type}
      className={["form-control form-input", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}

function Textarea({ className, ...rest }: PropsTextarea) {
  return (
    <textarea
      className={["form-control form-textarea", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}

function Select({ options, className, children, ...rest }: PropsSelect) {
  return (
    <select
      className={["form-control form-select", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}

      {children}
    </select>
  );
}

Form.Row = FormRow;
Form.Description = FormDescription;
Form.Label = Label;
// these should be usable alone too:
Form.Input = Input;
Form.Textarea = Textarea;
Form.Select = Select;

export { Form, Input, Textarea, Select };
