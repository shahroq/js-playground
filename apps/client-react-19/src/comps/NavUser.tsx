import { avatar } from "@jsp/shared/img";
import { Button, Item } from "@jsp/shared/comps";
import type { User } from "@jsp/shared/types";

type Props = { user: User };

export function NavUser({ user }: Props) {
  return (
    <Item className="px-0 user-nav">
      <Item.Content className="flex-none ">
        <img src={avatar} className="avatar" />
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
