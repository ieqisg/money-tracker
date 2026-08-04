// layouts/DashboardLayout.tsx
import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger className="lg:hidden" />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
