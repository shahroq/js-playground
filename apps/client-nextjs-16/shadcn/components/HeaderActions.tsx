import { ModeToggle } from "@/shadcn/components/ModeToggle";

export function HeaderActions() {
  return (
    <div className="ml-auto flex gap-2">
      <ModeToggle />
    </div>
  );
}
