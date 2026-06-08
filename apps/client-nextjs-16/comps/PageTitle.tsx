import type { Page } from "@packages/types/types";
import { Nav } from "@packages/comps";
import Link from "next/link";

type Props = {
  page: Page;
};

export function PageTitle({ page }: Props) {
  return (
    <div className="page-title space-y-2">
      {page.title && <h1>{page.title}</h1>}

      {page.breadcrumb && page.breadcrumb.length > 0 && (
        <Nav
          navItems={page.breadcrumb}
          Link={Link}
          className="nav nav-breadcrumb"
          aria-label="breadcrumb"
        />
      )}
    </div>
  );
}
