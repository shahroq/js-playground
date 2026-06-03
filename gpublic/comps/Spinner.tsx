type Props = {
  className?: string;
};

export function Spinner({ className }: Props) {
  return <span className={["spinner", className].filter(Boolean).join(" ")} />;
}
