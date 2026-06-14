import Link from "next/link";
import type { Page } from "@jsp/shared/types";
import { Nav } from "@jsp/shared/comps";

type Props = {
  page: Page;
};

export function PageTitle({ page }: Props) {
  return (
    <div className="page-title space-y-2">
      {page.title && <h1>{page.title}</h1>}

      {page.breadcrumb && page.breadcrumb.length > 0 && (
        <Nav
          items={page.breadcrumb}
          Link={Link}
          className="nav nav-breadcrumb"
          aria-label="breadcrumb"
        />
      )}
    </div>
  );
}
