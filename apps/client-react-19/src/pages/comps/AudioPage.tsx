import type { Page } from "@jsp/shared/types";
import { PlayButton } from "@jsp/shared/comps";
import { PageTitle } from "@/comps";
import { clickSound, enjoy } from "@jsp/shared/audio";

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
