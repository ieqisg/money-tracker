import type { ApiResponse, RegisterAuthType } from "@/types/authTypes";


const API_URL = import.meta.env.VITE_API_URL


class AuthService {
  async signUp(credentials: RegisterAuthType): Promise<ApiResponse> {
    if (credentials.password !== credentials.confirmPassword) {
      return { success: false, message: "Passwords doesnt match" }
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

}

export default new AuthService()
