import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";

import type { ReactNode } from "react";


type AccountDropdownProps = {
  children: ReactNode;
};



export function AccountDropdown({ children }: AccountDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" side="top">
        <DropdownMenuGroup className="h-10 flex">
          <Avatar className="flex justify-center">
            <AvatarFallback>MT</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <h1 className="text-sm">Full name</h1>
            <p className="text-[11px] text-gray-500">email@com</p>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck /> Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard /> Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell /> Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-red-700">
            <LogOut /> Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}
