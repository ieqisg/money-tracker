import type { ApiResponse, LoginAuthType, RegisterAuthType } from "@/types/authTypes";


const API_URL = import.meta.env.VITE_API_URL


class AuthService {
  async signUp(credentials: RegisterAuthType): Promise<ApiResponse> {
    if (credentials.password !== credentials.confirmPassword) {
      return { success: false, message: "Invalid credentials" }
    }
    const signUpUser = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials)
    })
    const response: ApiResponse = await signUpUser.json()
    return response
  }

  async login(credentials: LoginAuthType): Promise<ApiResponse> {
    const loginUser = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
    const response: ApiResponse = await loginUser.json()
    return response
  }

  async logout(): Promise<ApiResponse> {
    const logoutUser = await fetch(`${API_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    })
    const response: ApiResponse = await logoutUser.json()
    return response
  }



}

export default new AuthService()
