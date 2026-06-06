import { cn } from "../utils";

type Props = {
  className?: string;
};

export function Spinner({ className }: Props) {
  return <span className={cn("spinner", className)} />;
}
