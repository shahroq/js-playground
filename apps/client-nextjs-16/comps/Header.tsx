import { Brand } from "./Brand";

export function Header() {
  return (
    <nav className="container-fluid py-4 flex items-center gap-3">
      {/* Navbar Brand */}
      <Brand />

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
