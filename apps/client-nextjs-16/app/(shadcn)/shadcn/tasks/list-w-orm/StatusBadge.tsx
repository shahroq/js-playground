import { Badge } from "@/shadcn/components/ui/badge";
import { TaskStatus } from "@jsp/shared/types";

type Props = {
  status: TaskStatus;
};

const statusMap: Record<
  TaskStatus,
  { label: string; variant: "outline" | "secondary" | "default" }
> = {
  NEW: { label: "New", variant: "outline" },
  IN_PROGRESS: { label: "In Progress", variant: "secondary" },
  COMPLETED: { label: "Completed", variant: "default" },
};

export function StatusBadge({ status }: Props) {
  return (
    <Badge variant={statusMap[status].variant}>{statusMap[status].label}</Badge>
  );
}
