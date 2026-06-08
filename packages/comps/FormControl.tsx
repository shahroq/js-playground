type Props = {
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  help?: string;
  type: "input" | "textarea" | "select";
  subtype?: "text" | "email" | "password" | "number" | "hidden";
  value?: string;
  options?: SelectOption[];
} & React.HTMLAttributes<HTMLElement>;

type SelectOption = {
  label: string;
  value: string;
};

export function FormControl(props: Props) {
  const {
    name,
    id,
    label,
    placeholder,
    help,
    type,
    subtype,
    value,
    options,
    ...rest
  } = props;
  const commonHelpId = `${id}-help`;

  return (
    <div className="form-control-wrapper">
      {label && (
        <label htmlFor={id || name} className="form-label">
          {label}
        </label>
      )}

      {type === "textarea" && (
        <textarea
          name={name}
          id={id || name}
          className="form-control form-textarea"
          placeholder={placeholder}
          value={value}
          {...rest}
        />
      )}

      {type === "input" && (
        <input
          name={name}
          id={id || name}
          type={subtype || "text"}
          className="form-control form-input"
          placeholder={placeholder}
          value={value}
          {...rest}
        />
      )}

      {type === "select" && (
        <select
          name={name}
          id={id || name}
          className="form-control form-select"
          value={value}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {help && (
        <div id={commonHelpId} className="form-help invalid-feedback">
          {help}
        </div>
      )}
    </div>
  );
}
