import { createContext, useContext, useEffect, useState } from "react";
import {
  type AuthContextType,
  type ApiResponse,
  type LoginAuthType,
  type RegisterAuthType,
  type AuthDataType,
} from "@/types/authTypes";
import authService from "@/api/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true);
  const [authData, setAuthData] = useState<AuthDataType | null>(null)
  const register = async (credentials: RegisterAuthType): Promise<ApiResponse> => {
    try {
      const signUpResult = await authService.signUp(credentials);
      if (!signUpResult.success) {
        return { success: false, message: signUpResult.message }
      }
      navigate("/complete-profile")
      return signUpResult
    } catch (error) {
      console.error(error)
      return { success: false, message: "Something went wrong" }
    }
  };


  const login = async (credentials: LoginAuthType): Promise<ApiResponse> => {
    try {
      const loginResult = await authService.login(credentials);
      if (!loginResult.success) {
        return { success: false, message: loginResult.message }
      }
      navigate("/dashboard")
      return loginResult
    } catch (error) {
      console.error(error)
      return { success: false, message: "Something went wrong" }
    }
  };

  const signOut = async (): Promise<ApiResponse> => {
    try {
      const logoutResult = await authService.logout();
      if (!logoutResult.success) {
        return { success: false, message: logoutResult.message }
      }
      return logoutResult
    } catch (error) {
      console.error(error)
      return { success: false, message: "Something went wrong" }
    }

  };


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user`, { credentials: "include" });
        if (!res.ok) throw new Error();
        const data = await res.json()
        setIsAuthenticated(true);
        setAuthData(data)
      } catch {
        setIsAuthenticated(false);
        setAuthData(null)
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);


  return (
    <AuthContext.Provider
      value={{ register, login, signOut, loading, isAuthenticated, authData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
