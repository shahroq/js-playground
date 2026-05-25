import { useState } from "react";
import type { Page } from "@gpublic/types/types";
import { Alert, Button, DummyBox, Modal } from "@gpublic/comps";
import { PageTitle } from "@/comps";

const page: Page = {
  title: "Misc",
  breadcrumb: [{ label: "Components", path: "/comps" }, { label: "Misc" }],
};

export function MiscPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section>
      <PageTitle page={page} />

      {/* Button */}
      <div className="flex gap-2">
        <Button>Primary</Button>
        <Button className="btn-secondary">Primary</Button>
        <Button disabled>Primary w/ disabled</Button>
        <Button loading>Primary w/ loading</Button>
      </div>
      <hr />

      {/* DummyBox */}
      <DummyBox />
      <hr />

      {/* Alert */}
      <Alert dismissible={true}>Simple Alert</Alert>
      <hr />

      {/* Modal */}
      <Button onClick={() => setShowModal(!showModal)}>Open Modal</Button>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={"Header"}
        footer={<Button onClick={() => setShowModal(false)}>I Accept</Button>}
      >
        <>
          <h2 className="title">Welcome to Modal!</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            obcaecati cupiditate a optio in magnam, earum vero rerum deleniti
            cum totam eligendi sequi dolore. Alias perspiciatis tenetur
            consequuntur reiciendis quod!
          </p>
        </>
      </Modal>
    </section>
  );
}
