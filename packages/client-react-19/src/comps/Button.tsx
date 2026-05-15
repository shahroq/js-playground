type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  // onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  as: Component = "button",
  children,
  className = "btn btn-primary",
  ...rest
}: Props) {
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}
