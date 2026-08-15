import { useAuth } from "@/context/authContext"
import { Navigate, Outlet } from "react-router-dom";

export default function ProfileCompletionGuard() {
  const { session } = useAuth();

  if (!session?.user.isProfileComplete) {
    return <Navigate to="/complete-profile" replace />
  }

  return <Outlet />


}
