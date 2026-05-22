import { Spinner } from "./Spinner";

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  // onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

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
      className={`btn ${className || "btn-primary"} `}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </Component>
  );
}
