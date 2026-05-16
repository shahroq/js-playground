type Props = {
  breadcrumb: unknown;
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
            {item.href ? (
              <a href={item.href}>{item.title} </a>
            ) : (
              <span aria-current="page">{item.title}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
