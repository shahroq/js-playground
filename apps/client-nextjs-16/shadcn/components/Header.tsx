import { PropsWithChildren } from "react";
import type { Page } from "@jsp/shared/types";
import { Separator } from "@/shadcn/components/ui/separator";
import { SidebarTrigger } from "@/shadcn/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";
import { NavUser } from "./NavUser";
import { AppBreadcrumb } from "./AppBreadcrumb";

type Props = PropsWithChildren<{ page: Page }>;

export async function Header({ page, children }: Props) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {page.breadcrumb && <AppBreadcrumb items={page.breadcrumb} />}

        {/* header actions */}
        <div className="ml-auto flex flex-row-reverse gap-2">
          <NavUser variant="compact" />
          {children}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
