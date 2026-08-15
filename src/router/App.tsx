import Auth from "@/pages/auth/Auth";
import LandingPage from "@/pages/landing/Landing";
import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard/dashboard";
import DashboardLayout from "@/layout/dashboardLayout";
import CompleteProfile from "@/pages/completeProfile/completeProfile";
// import PrivateRoute from "./PrivateRoute";
// import AuthRouter from "./AuthRouter";
// import ProfileCompletionGuard from "./ProfileCompletionGuard";
// import CompleteProfileRouter from "./CompleteProfileRouter";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* <Route element={<AuthRouter />}> */}
      <Route path="/auth" element={<Auth />} />
      {/* </Route> */}

      {/* <Route element={<PrivateRoute />}> */}

      {/* <Route element={<CompleteProfileRouter />}> */}
      <Route path="/complete-profile" element={<CompleteProfile />} />
      {/* </Route> */}

      {/* <Route element={<ProfileCompletionGuard />}> */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      {/* </Route> */}

      {/* </Route> */}
    </Routes>
  );
}
