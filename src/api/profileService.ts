import type { ApiResponse } from "@/types/authTypes";
import type { ProfileFormType } from "@/types/profileTypes";
const API_URL = import.meta.env.VITE_API_URL


class ProfileService {
  async createProfile(body: ProfileFormType): Promise<ApiResponse> {
    const response = await fetch(`${API_URL}/api/profile`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json()
    if (!response.ok) {
      return { success: false, message: result.message }
    }
    return { success: true }

  };

  async getProfile(): Promise<ProfileFormType> {
    const response = await fetch(`${API_URL}/api/profile`, {
      method: "GET",
      credentials: "include",
    })
    if (!response.ok) {
      console.log("Error", response)
      throw new Error("An unexpected error occured")
    }
    return response.json()
  }
}
export default new ProfileService()
