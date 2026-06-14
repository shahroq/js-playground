import { site } from "@jsp/shared/json";
import { logo as logo } from "@jsp/shared/img";
import { Link } from "@/modules/router";

export function Brand() {
  return (
    <Link href="/" className="brand">
      <img src={logo} alt="Logo" />
      <span>{site.app.name}</span>
    </Link>
  );
}
