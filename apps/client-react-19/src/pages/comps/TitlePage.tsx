import { useEffect, useRef } from "react";
import type { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";
import VanillaTilt from "vanilla-tilt";

/*
interface HTMLVanillaTiltElement extends HTMLDivElement {
  vanillaTilt?: VanillaTilt;
}
*/
type HTMLVanillaTiltElement = HTMLDivElement & {
  vanillaTilt?: VanillaTilt;
};

const page: Page = {
  title: "Tilt",
  breadcrumb: [{ label: "Components", path: "/comps" }, { label: "Tilt" }],
};

export default function TiltPage() {
  return (
    <section>
      <PageTitle page={page} />
      <TitlBox />
    </section>
  );
}

export function TitlBox() {
  const tiltRef = useRef<HTMLVanillaTiltElement>(null);
  const options = {
    glare: true,
  };

  useEffect(() => {
    const elem = tiltRef.current;

    if (!elem) return;

    VanillaTilt.init(elem, options);
    return () => {
      // Clean up when component unmounts
      (elem as any).vanillaTilt?.destroy();
    };
  }, []);

  return (
    <div
      ref={tiltRef}
      className="bg-slate-200 size-50 text-center flex-center mb-2"
      data-tilt-max-glare="0.8"
    >
      TILT!
    </div>
  );
}
