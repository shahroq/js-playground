import type { Page } from "@packages/types/types";
import { PageTitle } from "@/comps";
import { Button, DummyBox, ModalV2, useModalContext } from "@packages/comps";
import { useState } from "react";

const page: Page = {
  title: "Modal",
  breadcrumb: [{ label: "Components", path: "/comps" }, { label: "Modal" }],
};

export default function ModalPage() {
  const [openName, setOpenName] = useState("");

  return (
    <section>
      <PageTitle page={page} />

      {/* Modal: Controlled: parent manages the open/closed state. */}
      <Button
        className="btn-secondary"
        onClick={() => {
          setOpenName("controlled-modal");
        }}
      >
        Controlled Modal [managed by parent state]
      </Button>

      <ModalV2
        title="Controlled Modal"
        size="sm"
        openName={openName}
        onOpenChange={setOpenName}
      >
        <ModalV2.Window name="controlled-modal">
          <ModalV2.Content>
            <DummyBox>Controlled Modal</DummyBox>
            <br />
            <CloseButton />
          </ModalV2.Content>
          <ModalV2.Footer>Footer</ModalV2.Footer>
        </ModalV2.Window>
      </ModalV2>
      <hr />

      {/* Modal: Uncontrolled? */}
      <ModalV2 title="Uncontrolled Modal" size="sm">
        <ModalV2.Trigger windowName="uncontrolled-modal">
          <Button>Uncontrolled Modal: manages its own internal state</Button>
        </ModalV2.Trigger>
        <ModalV2.Window name="uncontrolled-modal">
          <ModalV2.Content>
            <DummyBox>Uncontrolled</DummyBox>
          </ModalV2.Content>
          <ModalV2.Footer>Footer</ModalV2.Footer>
        </ModalV2.Window>
      </ModalV2>
      <hr />
    </section>
  );
}

function CloseButton() {
  const { close } = useModalContext();

  return (
    <Button className="btn-danger" onClick={close}>
      Close Modal
    </Button>
  );
}
