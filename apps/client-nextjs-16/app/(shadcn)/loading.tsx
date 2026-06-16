import { Skeleton } from "@/shadcn/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-full flex-col gap-5 p-6">
      <Skeleton className="h-10 w-full shrink-0" />
      <Skeleton className="flex-1 w-full" />
    </div>
  );
}
