import LandingPage from "./pages/landing/Landing"
import { Routes, Route } from "react-router-dom"
import Auth from "./pages/auth/Auth"
import Dashboard from "./pages/dashboard/dashboard"
import DashboardLayout from "./layout/dashboardLayout"
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

      </Route>
    </Routes>
  )
}
