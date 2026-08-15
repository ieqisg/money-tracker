import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function CompleteProfileRouter() {
  const { session, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (session?.user.isProfileComplete) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
