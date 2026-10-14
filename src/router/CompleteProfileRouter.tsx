import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function CompleteProfileRouter() {
  const { authData } = useAuth();
  if (authData?.data?.isProfileComplete) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
