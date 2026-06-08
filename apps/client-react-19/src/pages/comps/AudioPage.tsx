import type { Page } from "@packages/types/types";
import { PageTitle } from "@/comps";
import clickSound from "@packages/sounds/click-sound.m4a";
import enjoy from "@packages/sounds/enjoy.mp3";
import { PlayButton } from "@packages/comps";

const page: Page = {
  title: "Audio",
  breadcrumb: [{ label: "Components", path: "/comps" }, { label: "Audio" }],
};

export default function AudioPage() {
  return (
    <section>
      <PageTitle page={page} />

      <PlayButton src={clickSound} />
    </section>
  );
}
