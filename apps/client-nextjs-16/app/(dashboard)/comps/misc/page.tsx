"use client";
import { Page } from "@jsp/shared/types";
import { Button, ModalV2, DummyBox } from "@jsp/shared/comps";
import { PageTitle } from "@/comps";

const page: Page = {
  title: "Misc",
  breadcrumb: [{ label: "Components" }, { label: "Misc" }],
};

export default function Misc() {
  return (
    <section>
      <PageTitle page={page} />

      {/* Modal */}
      <ModalV2 title="Dummy" size="sm" closeOnBackdrop>
        <ModalV2.Trigger windowName="modal-content">
          <Button>Open Modal</Button>
        </ModalV2.Trigger>
        <ModalV2.Window name="modal-content">
          <ModalV2.Content>
            <DummyBox />
          </ModalV2.Content>
          <ModalV2.Footer>Footer</ModalV2.Footer>
        </ModalV2.Window>
      </ModalV2>
    </section>
  );
}
