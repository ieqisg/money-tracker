// layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout() {

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden bg-[#f7f8f3]">
        <SidebarTrigger className="" />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
