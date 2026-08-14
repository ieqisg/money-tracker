import { createContext, useContext, useEffect, useState, } from "react";
import { authClient } from "@/lib/authClient";
import { type Session, type AuthContextType, type AuthResponse, type LoginAuthType, type RegisterAuthType } from "@/types/authTypes";

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const register = async (data: RegisterAuthType): Promise<AuthResponse> => {
    if (!data) return { success: false, message: "Email or password is required" }
    const { data: result, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    if (error) {
      console.log(error, error.message)
      return { success: false, error: error.message, status: error.status, data: null }
    }
    console.log("Result ", result)
    return {
      success: true,
      data: result,
      error: null,
      message: "Register successful",
      status: 200
    }
  }

  const login = async (data: LoginAuthType): Promise<AuthResponse> => {
    if (!data) return { success: false, message: "Email or password is required" }
    const { data: result, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      /* callbackURL: "http://localhost:5173/dashboard", */
    })

    if (error) {
      return { success: false, error: error.message, status: error.status }
    }
    console.log("Result ", result)
    return {
      success: true,
      data: result,
      error: null,
      message: "Login successful",
      status: 200
    }
  }

  const signOut = async (): Promise<AuthResponse> => {
    const { error } = await authClient.signOut()
    if (error) {
      return { success: false, error: error.message, status: error.status }
    }
    return { success: true, status: 200, message: "Sign out successful" }
  }


  const getSession = async (): Promise<AuthResponse> => {
    const { data: session, error } = await authClient.getSession()
    if (error) {
      return { success: false, error: error.message, status: error.status }
    }
    if (!session) return { success: false, message: "Failed to retrieve session" }
    console.log("Session ", session)

    return { success: true, data: session, error: null, message: "Session retrieved" }

  }

  useEffect(() => {
    const loadSession = async () => {
      const sessionData = await getSession()
      if (!sessionData.success) {
        return { message: "No session retrieved" }
      }
      if (sessionData.error) {
        return { error: sessionData.error, message: sessionData.message }
      }
      setSession(sessionData.data)


    }
    loadSession()
  }, [])
  return (
    <AuthContext.Provider value={{ register, login, signOut, getSession, session }}>
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
