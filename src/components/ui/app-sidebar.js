import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenuButton, } from "@/components/ui/sidebar";
import Logo from "./logo";
import { CircleUser, LayoutDashboard } from 'lucide-react';
import { BadgeDollarSign } from 'lucide-react';
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronsUpDown } from 'lucide-react';
import { AccountDropdown } from "@/layout/accountDropdown";
import { useAuth } from "@/context/authContext";
//Add props for username and email
export function AppSidebar() {
    const { session } = useAuth();
    return (_jsxs(Sidebar, { children: [_jsxs(SidebarHeader, { className: "grid grid-cols-[auto_max-content] ", children: [_jsx("div", { className: " flex items-center justify-center ", children: _jsx(Logo, {}) }), _jsxs("div", { className: " flex flex-col items-center justify-center mr-9", children: [_jsx("h1", { className: "text-lg font-bold", children: "Expense Tracker " }), _jsx("p", { className: "text-xs text-gray-500", children: "Track your expenses." })] })] }), _jsx("hr", { className: "my-2 border-gray-300" }), _jsx(SidebarContent, { children: _jsxs(SidebarGroup, { className: "gap-y-2", children: [_jsxs(SidebarMenuButton, { children: [_jsx(LayoutDashboard, {}), "Dashboard"] }), _jsxs(SidebarMenuButton, { children: [_jsx(BadgeDollarSign, {}), "Transactions"] }), _jsxs(SidebarMenuButton, { children: [_jsx(CircleUser, {}), "Profile"] }), _jsxs(SidebarMenuButton, { children: [_jsx(Settings, {}), "Settings"] })] }) }), _jsx(SidebarFooter, { children: _jsx(AccountDropdown, { children: _jsxs(SidebarMenuButton, { className: "h-15", children: [_jsx(Avatar, { children: _jsx(AvatarFallback, { children: "MT" }) }), _jsxs("div", { className: "", children: [_jsx("h1", { children: session?.user.name }), _jsx("p", { className: "text-xs text-gray-500", children: session?.user.email })] }), _jsx("div", { className: " ml-auto", children: _jsx(ChevronsUpDown, {}) })] }) }) })] }));
}
