import type { Page } from "@gpublic/types/types";
import { PageTitle } from "@/comps";
import clickSound from "@gpublic/sounds/click-sound.m4a";
import enjoy from "@gpublic/sounds/enjoy.mp3";
import { PlayButton } from "@gpublic/comps";

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
