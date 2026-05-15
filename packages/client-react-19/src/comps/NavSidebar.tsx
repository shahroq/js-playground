import site from "@gpublic/json/site.json";

const navSide = site.navSide;
const pathname = "";

export function NavSidebar() {
  return (
    <ul className="nav nav-vertical">
      {navSide.map((item, i) => (
        <li key={`main-${i}`}>
          <a
            href={item.href}
            className={`nav-link ${item.href === pathname ? "active" : ""}	${"href" in item ? "" : "disabled"}`}
          >
            {item.title}
          </a>

          {item.children && (
            <ul>
              {item.children.map((child, j) => (
                <li key={`sub-${j}`}>
                  <a
                    href={child.href}
                    className={`nav-link ${child.href === pathname ? "active" : ""}	${"href" in child ? "" : "disabled"}`}
                  >
                    {child.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
