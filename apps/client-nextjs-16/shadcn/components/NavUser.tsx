"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { site } from "@jsp/shared/json";
import {
  cn,
  resolveImgPath,
  resolveIcon,
  getInitials,
} from "@jsp/shared/utils";
import { MoreVerticalIcon, UserIcon, UserPlus } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import { ButtonGroup } from "@/shadcn/components/ui/button-group";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { useSidebar } from "@/shadcn/components/ui/sidebar";
// import { signOut } from "next-auth/react";
import { signOutAction } from "@/auth/actions";

type Variant = "full" | "compact";
type Props = { variant?: Variant };
type PropsUserInfo = {
  user?: User;
  className?: string;
  grayscale?: boolean;
  variant?: Variant;
};

const navUser = site.navUser;

export function NavUser({ variant = "full" }: Props) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  // null
  // const user = null;
  // from json
  // const user = site.user;
  // from async:
  // const session = await auth();
  // const user = session?.user;
  // from context:
  const { data: session } = useSession();
  const user = session?.user;

  function handleClick(item: (typeof navUser)[number]) {
    if (item.path) router.push(item.path);
    if (item.action === "sign-out") signOutAction();
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="">
          <div className="flex items-center justify-center cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <UserInfo user={user} grayscale variant={variant} />
            {variant === "full" && (
              <MoreVerticalIcon className="ml-auto size-4" />
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side={isMobile || variant === "compact" ? "bottom" : "right"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <UserInfo user={user} className="px-1 py-1.5" />
          </DropdownMenuLabel>

          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {navUser.map((nav) => {
                  const Icon = resolveIcon(nav?.icon);
                  return (
                    <Fragment key={nav.label}>
                      {nav?.separator && <DropdownMenuSeparator />}
                      <DropdownMenuItem onClick={() => handleClick(nav)}>
                        {Icon && <Icon className="size-4" />}
                        {nav.label}
                      </DropdownMenuItem>
                    </Fragment>
                  );
                })}
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {!user && variant === "compact" && <GuestButtonGroup />}
    </>
  );
}

function UserInfo({
  user,
  className,
  variant = "full",
  grayscale = false,
}: PropsUserInfo) {
  if (!user) user = { name: "Guest" };

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-left text-sm",
        className,
        variant === "full" && "w-full",
      )}
    >
      {/* avatar */}
      <Avatar className={cn("h-8 w-8", grayscale && "grayscale")}>
        <AvatarImage
          src={resolveImgPath(user?.avatar, "/img/avatars")}
          alt={user?.name}
        />

        <AvatarFallback className="rounded-lg">
          {getInitials(user?.name)}
        </AvatarFallback>
      </Avatar>

      {variant === "full" && (
        <>
          {/* info */}
          <div className="grid flex-1 leading-tight">
            <span className="truncate font-medium">{user?.name}</span>
            {user?.email && (
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function GuestButtonGroup() {
  return (
    <ButtonGroup>
      <Button asChild variant="outline">
        <Link href="/sign-in">
          <UserIcon />
          Sign In
        </Link>
      </Button>

      <Button asChild variant="outline">
        <Link href="/sign-up">
          <UserPlus />
          Sign Up
        </Link>
      </Button>
    </ButtonGroup>
  );
}
