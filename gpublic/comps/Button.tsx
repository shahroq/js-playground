import { Spinner } from "./Spinner";

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  // onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.LinkHTMLAttributes<HTMLButtonElement>;

export function Button({
  as: Component = "button",
  children,
  className,
  disabled,
  loading,
  ...rest
}: Props) {
  return (
    <Component
      role={Component === "button" ? `button` : "link"}
      data-testid="btn"
      className={[`btn`, className ? `${className}` : `btn-primary`]
        .filter(Boolean)
        .join(" ")}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </Component>
  );
}
