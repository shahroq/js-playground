import type { Page } from "@jsp/shared/types";
import {
  Alert,
  Button,
  DummyBox,
  Hero,
  Counter,
  Item,
} from "@jsp/shared/comps";
import { avatar1 as avatar } from "@jsp/shared/img";
import { PageTitle } from "@/comps";

const page: Page = {
  title: "Misc",
  breadcrumb: [{ label: "Components", path: "/comps" }, { label: "Misc" }],
};

export default function MiscPage() {
  return (
    <section>
      <PageTitle page={page} />

      {/* Item */}
      <Item variant="muted">
        <Item.Content className="flex-none ">
          <img src={avatar} className="avatar" />
        </Item.Content>
        <Item.Content>
          <Item.Title>Default Variant</Item.Title>
          <Item.Description>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </Item.Description>
        </Item.Content>
        <Item.Content className="flex-none">
          <Button as="a" className="btn-icon" onClick={console.log}>
            <i className="icon-kebab" />
          </Button>
        </Item.Content>
      </Item>
      <hr />

      {/* Hero */}
      <Hero>
        <Hero.Title>Hero V2</Hero.Title>
        <Hero.Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Hero.Content>
        <div className="action">
          <Button onClick={() => console.log("Primary Clicked")}>
            Primary
          </Button>
          <Button className={"btn-secondary"} onClick={console.log}>
            Secondary
          </Button>
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
