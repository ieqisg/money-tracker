import Login from "./frontend/auth/Login/Login";
import LandingPage from "./frontend/Landing";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
