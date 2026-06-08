import Image from "next/image";
import site from "@packages/json/site.json";
import avatar from "@packages/img/avatar.png";
import { Button, Item } from "@packages/comps";

const user = site.user;

export function NavUser() {
  return (
    <Item className="px-0 user-nav">
      <Item.Content className="flex-none ">
        <Image src={avatar} className="avatar" alt="Avatar" />
      </Item.Content>
      <Item.Content>
        <Item.Title>{user.name}</Item.Title>
        <Item.Description>{user.email}</Item.Description>
      </Item.Content>
      <Item.Content className="flex-none">
        <Button className="btn-icon" onClick={console.log}>
          <i className="icon-kebab" />
        </Button>
      </Item.Content>
    </Item>
  );
}
