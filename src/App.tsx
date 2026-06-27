import LandingPage from "./frontend/pages/landing/Landing"
import { Routes, Route } from "react-router-dom"
import Auth from "./frontend/pages/auth/Auth"
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}
