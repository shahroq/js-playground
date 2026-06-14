import { site } from "@jsp/shared/json";
import { logoDark as logo } from "@jsp/shared/img";
import { Link } from "@/modules/router";

export function Brand() {
  return (
    <Link href="/" className="navbar-brand">
      <img src={logo} alt="Logo" />
      <span>{site.app.name}</span>
    </Link>
  );
}
