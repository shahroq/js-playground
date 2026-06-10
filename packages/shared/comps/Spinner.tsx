import { cn } from "../lib";

type Props = {
  className?: string;
};

export function Spinner({ className }: Props) {
  return <span className={cn("spinner", className)} />;
}
