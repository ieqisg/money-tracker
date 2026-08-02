import { createContext, useContext, } from "react";
import { authClient } from "@/lib/authClient";
import type { AuthContextType, RegisterAuth } from "@/types/authTypes";

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const register = async (data: RegisterAuth) => {
    try {
      const { data: result } = await authClient.signUp.email({
        name: data.username,
        email: data.email,
        password: data.password,
        callbackURL: "http://localhost:5173/dashboard",
      })
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <AuthContext.Provider value={{ register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context;
}
