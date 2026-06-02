export type FormElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export type Option = {
  label: string;
  value: string;
};

export type FormFeedback = {
  title?: string;
  messages?: string[];
};

// for reducer action [also used in useActionState]
export type ActionState<T> = {
  data?: T;
  errors?: string[];
};

export const options: Option[] = [
  { label: "-- Choose Category --", value: "" },
  { label: "Home", value: "home" },
  { label: "Work", value: "work" },
];
