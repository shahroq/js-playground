import site from "@gpublic/json/site.json";
import logo from "@gpublic/img/logo-dark.png";

export function Header() {
  return (
    <nav className="container-fluid py-4 flex items-center gap-3">
      {/* Navbar Brand */}
      <a href="#" className="navbar-brand">
        <img src={logo.src} alt="Logo" />
        <span>{site.app.name}</span>
      </a>

      {/* Navbar */}
      <ul className="hidden md:flex flex-1 items-center gap-3"></ul>

      {/* HEADER Search */}
      <form className="hidden md:flex">
        <input
          placeholder="Search"
          className="form-control form-control-dark text-bg-dark"
        />
      </form>

      {/* HEADER Auth */}
      <form className="hidden md:flex items-center gap-3">
        <a href="#" className="btn btn-outline">
          {" "}
          Sign-in{" "}
        </a>
        <a href="#" className="btn btn-warning">
          {" "}
          Sign-up{" "}
        </a>
      </form>

      {/* HEADER Burger */}
      <button
        type="button"
        className="navbar-toggler ml-auto flex size-10 items-center justify-center rounded-md border border-white/20 lg:hidden"
        data-toggle="offcanvas"
        data-target="#sidebar"
      >
        ☰
      </button>
    </nav>
  );
}
