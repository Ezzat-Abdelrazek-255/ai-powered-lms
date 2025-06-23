import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { MessageCircle, Bell, GraduationCap } from "lucide-react";
import { NavItem } from "@/types/navigation";
import Navigation from "./navigation";
import { LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./logout-button";

type HeaderProps = {
  children?: React.ReactNode;
  navItems: NavItem[];
};

const Header = ({ navItems }: HeaderProps) => {
  return (
    <header className="grid grid-rows-[1fr_auto] border-b-[1px] border-b-white/20 bg-white/5 px-[var(--container-px)] pt-[1.6rem] backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-10 w-10 rounded-full p-0"
            aria-label="Messages"
          >
            <MessageCircle className="mb-[1px] h-full w-full object-cover" />
          </Button>
          <Button
            variant="outline"
            className="grid h-10 w-10 place-content-center rounded-full"
            aria-label="Notifications"
          >
            <Bell className="h-full w-full object-cover" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="h-12 w-12 rounded-full bg-muted-foreground"
                aria-label="Open"
              ></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[20rem] px-[1.6rem] py-[1.6rem]"
              align="end"
            >
              <DropdownMenuLabel className="text-[1.6rem]">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GraduationCap />
                <span>Grades</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircle />
                <span>Messages</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Navigation navItems={navItems} />
    </header>
  );
};

export default Header;
