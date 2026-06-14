import { site } from "@jsp/shared/json";
import { logoDark as logo } from "@jsp/shared/img";
import Link from "next/link";
import Image from "next/image";

export function Brand() {
  return (
    <Link href="/" className="navbar-brand">
      <Image src={logo.src} alt="Logo" width={35} height={35} />
      <span>{site.app.name}</span>
    </Link>
  );
}
