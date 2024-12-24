import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { MessageCircle, Bell, GraduationCap } from "lucide-react";
import { NavItem } from "@/types/navigation";
import Navigation from "./navigation";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderProps = {
  children?: React.ReactNode;
  navItems: NavItem[];
};

const Header = ({ children, navItems }: HeaderProps) => {
  return (
    <header className="grid h-[var(--header-height)] grid-rows-[1fr_auto] border-b-[1px] border-b-border bg-white-100 px-8 pt-6 shadow-lg">
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
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
                <span>Log out</span>
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