import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRouter() {
  const { isAuthenticated, loading, authData } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (isAuthenticated) {
    return <Navigate to={authData?.isProfileComplete ? "/dashboard" : "/complete-profile"} replace />;
  }
  return <Outlet />;
}
