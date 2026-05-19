type Props = {
  id: string;
  label: string;
  placeholder?: string;
  help?: string;
  type: "input";
  subtype?: "text" | "email" | "password" | "number" | "textarea" | "select";
  value?: string;
  options?: SelectOption[];
} & React.InputHTMLAttributes<HTMLButtonElement>;

type SelectOption = {
  label: string;
  value: string;
};

export function FormControl(props: Props) {
  const {
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
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      {type === "input" && subtype === "textarea" && (
        <textarea
          id={id}
          className="form-control"
          placeholder={placeholder}
          value={value}
          {...rest}
        />
      )}

      {type === "input" && subtype !== "textarea" && (
        <input
          id={id}
          type={subtype || "text"}
          className="form-control"
          placeholder={placeholder}
          value={value}
          {...rest}
        />
      )}

      {type === "select" && (
        <select
          id={id}
          className="form-select"
          value={value}
          // onChange={(e) => onChange?.(e.target.value)}
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
        <div id={commonHelpId} className="form-text">
          {help}
        </div>
      )}
    </div>
  );
}
