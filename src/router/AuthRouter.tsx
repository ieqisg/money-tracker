import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRouter() {
  const { session, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (session) {
    if (!session?.user.isProfileComplete) {
      return <Navigate to="/complete-profile" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
