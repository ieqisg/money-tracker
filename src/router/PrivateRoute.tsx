import { useAuth } from "@/context/authContext";
import { Navigate, Outlet } from "react-router-dom";


export default function PrivateRoute() {
     const { session, loading } = useAuth()
    if (loading) { 
        return <div>Loading...</div>
    }
     if (!session) { 
        return <Navigate to="/auth" replace />
     }
     return <Outlet />
}