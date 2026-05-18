import type { Crumb } from "@gpublic/types/types";

type Props = {
  breadcrumb: Crumb[];
};

export function NavBreadcrumb({ breadcrumb }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {breadcrumb.map((item, index) => (
          <li
            className={`breadcrumb-item ${index + 1 >= breadcrumb.length ? "last" : ""}`}
            key={index}
          >
            {item.path ? (
              <a href={item.path}>{item.label} </a>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
