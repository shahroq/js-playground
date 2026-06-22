import { Skeleton } from "@/shadcn/components/ui/skeleton";

type Props = {
  count?: number;
};

export function SkeletonTable({ count = 5 }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <div className="flex gap-4" key={index}>
          <Skeleton className="h-8 flex-1" />
        </div>
      ))}
    </div>
  );
}
