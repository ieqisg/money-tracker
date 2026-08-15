import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
export default function DashboardLayout() {
    return (_jsxs(SidebarProvider, { defaultOpen: true, children: [_jsx(AppSidebar, {}), _jsxs("main", { className: "flex-1 min-w-0 overflow-x-hidden", children: [_jsx(SidebarTrigger, { className: "lg:hidden" }), _jsx(Outlet, {})] })] }));
}
