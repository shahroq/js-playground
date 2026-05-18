import { Crumb } from "@/gpublic/types/types";
import Link from "next/link";

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
              <Link href={item.path}>{item.label} </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
