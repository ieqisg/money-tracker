import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Logo from "./logo"
import { LayoutDashboard } from 'lucide-react';
import { BadgeDollarSign } from 'lucide-react';
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronsUpDown } from 'lucide-react';
import { AccountDropdown } from "@/layout/accountDropdown";
import { Link } from "react-router-dom";


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="grid grid-cols-[auto_max-content] ">
        <div className=" flex items-center justify-center ">
          <Logo />
        </div>
        <div className=" flex flex-col items-center justify-center mr-9">
          <h1 className="text-lg font-bold">Expense Tracker </h1>
          <p className="text-xs text-gray-500">Track your expenses.</p>
        </div>
      </SidebarHeader>
      <hr className="my-2 border-gray-300" />
      <SidebarContent >
        <nav>
          <SidebarGroup className="gap-y-2">
            <SidebarMenuButton asChild>
              <Link to="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link to="/transactions">
                <BadgeDollarSign />
                <span>Transactions</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link to="/profile">
                <BadgeDollarSign />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link to="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarGroup>
        </nav>
      </SidebarContent>
      <SidebarFooter >
        <AccountDropdown>
          <SidebarMenuButton className="h-15">
            <Avatar>
              <AvatarFallback>Tite</AvatarFallback>
            </Avatar>
            <div className="">
              <h1>Tite</h1>
              <p className="text-xs text-gray-500">Tite</p>
            </div>
            <div className=" ml-auto">
              <ChevronsUpDown />
            </div>
          </SidebarMenuButton >
        </AccountDropdown>
      </SidebarFooter>
    </Sidebar >
  )
}
