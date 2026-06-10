"use client";
import type { PropsWithChildren, ComponentProps } from "react";
import { cn } from "../lib";

type SelectOption = { label: string; value: string };
type Props = ComponentProps<"form"> & PropsWithChildren & { legend?: string };
type PropsFormDescription = ComponentProps<"span">;
type PropsLabel = ComponentProps<"label">;
type PropsInput = ComponentProps<"input">;
type PropsTextarea = ComponentProps<"textarea">;
type PropsSelect = ComponentProps<"select"> & {
  options?: SelectOption[];
};

function Form({ children, className, legend, ...rest }: Props) {
  return (
    <form className={cn(className)} {...rest}>
      {legend ? (
        <fieldset>
          <legend>{legend}</legend>
          {children}
        </fieldset>
      ) : (
        children
      )}
    </form>
  );
}

function FormRow({ children }: PropsWithChildren) {
  return <div className="form-row">{children}</div>;
}

function FormDescription({ children, className }: PropsFormDescription) {
  return <span className={cn("form-description", className)}>{children}</span>;
}

function Label({ children, className, ...rest }: PropsLabel) {
  return (
    <label className={cn("form-label", className)} {...rest}>
      {children}
    </label>
  );
}

function Input({ type = "text", className, ...rest }: PropsInput) {
  return (
    <input
      type={type}
      className={cn("form-control form-input", className)}
      {...rest}
    />
  );
}

function Textarea({ className, ...rest }: PropsTextarea) {
  return (
    <textarea
      className={cn("form-control form-textarea", className)}
      {...rest}
    />
  );
}

function Select({ options, className, children, ...rest }: PropsSelect) {
  return (
    <select className={cn("form-control form-select", className)} {...rest}>
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
