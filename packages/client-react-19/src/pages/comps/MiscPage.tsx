import { useState } from "react";
import type { Page } from "@gpublic/types/types";
import { Alert, Button, DummyBox, Modal, Hero, Counter } from "@gpublic/comps";
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

      {/* Hero */}
      <Hero>
        <Hero.Title>Hero V2</Hero.Title>
        <Hero.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Hero.Content>
        <div className="action">
          <Hero.Button onClick={() => console.log("Primary Clicked")}>
            Primary
          </Hero.Button>
          <Hero.Button className={"btn-secondary"}>Secondary</Hero.Button>
        </div>
      </Hero>

      <hr />
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
      <hr />

      {/* Counter */}
      <Counter>
        <Counter.Label>My Counter</Counter.Label>
        <Counter.Decrease icon="-" />
        <Counter.Count />
        <Counter.Increase icon="+" />
      </Counter>
    </section>
  );
}
