import { ModeToggle } from "@/shadcn/components/ModeToggle";

export default function HeaderActions() {
  return (
    <div className="ml-auto flex gap-2">
      <ModeToggle />
    </div>
  );
}
