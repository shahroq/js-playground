import { site } from "@jsp/shared/json";
import { logo as logo } from "@jsp/shared/img";
import Link from "next/link";
import Image from "next/image";

export function Brand() {
  return (
    <Link href="/" className="brand">
      <Image src={logo.src} alt="Logo" width={25} height={25} />
      <span>{site.app.name}</span>
    </Link>
  );
}
