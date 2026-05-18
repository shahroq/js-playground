import { NavBreadcrumb } from "./NavBreadcrumb";

type Props = {
  page: unknown;
};

export function PageTitle({ page }: Props) {
  return (
    <div className="page-title space-y-2">
      {page.title && <h1>{page.title}</h1>}

      {page.breadcrumb && page.breadcrumb.length > 0 && (
        <div>
          <NavBreadcrumb breadcrumb={page.breadcrumb} />
        </div>
      )}
    </div>
  );
}
