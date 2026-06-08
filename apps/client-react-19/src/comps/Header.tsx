import site from "@packages/json/site.json";
import logo from "@packages/img/logo-dark.png";

export function Header() {
  return (
    <>
      <nav className="container-fluid py-4 flex items-center gap-3">
        {/* Navbar Brand */}
        <a href="#" className="navbar-brand">
          <img src={logo} alt="Logo" />
          <span>{site.app.name}</span>
        </a>

        {/* HEADER Burger */}
        <button
          type="button"
          className="navbar-toggler btn-burger ml-auto lg:hidden"
          data-toggle="offcanvas"
          data-target="#sidebar"
        >
          ☰
        </button>
      </nav>
    </>
  );
}
