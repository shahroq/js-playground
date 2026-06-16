import { PropsWithChildren } from "react";
import type { NavItem, Page } from "@jsp/shared/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcn/components/ui/breadcrumb";
import { Separator } from "@/shadcn/components/ui/separator";
import { SidebarTrigger } from "@/shadcn/components/ui/sidebar";
import { HeaderActions } from "./HeaderActions";

type Props = PropsWithChildren<{ page: Page }>;
type PropsAppBreadcrumb = { items?: NavItem[] };

export function Header({ page, children }: Props) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {page.breadcrumb && <AppBreadcrumb items={page.breadcrumb} />}
        {children || <HeaderActions />}
      </div>
    </header>
  );
}

function AppBreadcrumb({ items }: PropsAppBreadcrumb) {
  if (!items?.length) return null;

  const lastIndex = items.length - 1;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, i) => (
          <div key={item.label} className="contents">
            <BreadcrumbItem>
              {i === lastIndex || !item.path ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.path}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {i < lastIndex && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
