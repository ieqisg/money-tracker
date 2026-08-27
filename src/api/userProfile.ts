import type { ApiResponse } from "@/types/authTypes";
import type { ProfileFormType } from "@/types/profileTypes";
const API_URL = import.meta.env.VITE_API_URL



export const createProfile = async (
  body: ProfileFormType,
): Promise<ApiResponse> => {
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
  return result

};

export const getProfile = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/api/profile`, {
    method: "GET",
    credentials: "include",
  })
  if (!response.ok) {
    console.log("Error", response)
    return { success: false, data: response.json() }
  }
  return response.json()
}
