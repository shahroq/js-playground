import type { NavItem } from "@jsp/shared/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcn/components/ui/breadcrumb";

type Props = { items?: NavItem[] };

export function AppBreadcrumb({ items }: Props) {
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
