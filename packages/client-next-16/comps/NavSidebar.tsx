import site from "@gpublic/json/site.json";
import Link from "next/link";

const navSide = site.navSide;
const pathname = "";

export function NavSidebar() {
  return (
    <>
      <ul className="nav nav-vertical">
        {navSide.map((item, i) => (
          <li key={`main-${i}`}>
            <Link
              href={"path" in item ? item.path : ""}
              to={item.path}
              className={`nav-link	${"path" in item ? "" : "disabled"}`}
            >
              {item.label}
            </Link>

            {item.children && (
              <ul>
                {item.children.map((child, j) => (
                  <li key={`sub-${j}`}>
                    <Link
                      href={"child.path"}
                      to={child.path}
                      className={`nav-link ${child.path === pathname ? "active" : ""}	${"path" in child ? "" : "disabled"}`}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
