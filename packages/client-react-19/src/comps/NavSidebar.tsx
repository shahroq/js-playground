import site from "@gpublic/json/site.json";

const navSide = site.navSide;
const pathname = "";

export function NavSidebar() {
  return (
    <ul className="nav nav-vertical">
      {navSide.map((item, i) => (
        <li key={`main-${i}`}>
          <a
            href={item.path}
            className={`nav-link ${item.path === pathname ? "active" : ""}	${"path" in item ? "" : "disabled"}`}
          >
            {item.label}
          </a>

          {item.children && (
            <ul>
              {item.children.map((child, j) => (
                <li key={`sub-${j}`}>
                  <a
                    href={child.path}
                    className={`nav-link ${child.path === pathname ? "active" : ""}	${"path" in child ? "" : "disabled"}`}
                  >
                    {child.label}
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
