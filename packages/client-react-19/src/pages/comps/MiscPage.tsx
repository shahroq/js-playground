import type { Page } from "@gpublic/types/types";
import {
  Alert,
  Button,
  DummyBox,
  Hero,
  Counter,
  ModalV2,
} from "@gpublic/comps";
import { PageTitle } from "@/comps";

const page: Page = {
  title: "Misc",
  breadcrumb: [{ label: "Components", path: "/comps" }, { label: "Misc" }],
};

export function MiscPage() {
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
      <hr />

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
