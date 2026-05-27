type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function DummyBox({ children, className }: Props) {
  return (
    <div
      data-testid="dummy-area"
      className={["dummy-area", className].filter(Boolean).join(" ")}
    >
      {children || ""}
    </div>
  );
}
