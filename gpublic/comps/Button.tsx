type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  // onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  as: Component = "button",
  children,
  className,
  ...rest
}: Props) {
  return (
    <Component className={`btn ${className || "btn-primary"} `} {...rest}>
      {children}
    </Component>
  );
}
