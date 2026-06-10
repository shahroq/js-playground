import { cn } from "../lib";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function DummyBox({ children, className }: Props) {
  return (
    <div
      role="contentinfo"
      data-testid="dummy-area"
      className={cn("dummy-area", className)}
    >
      {children || ""}
    </div>
  );
}
