import type { ApiResponse } from "@/types/authTypes";
import type { ProfileFormType } from "@/types/profileTypes";

export const createProfile = async (
  url: string,
  body: ProfileFormType,
): Promise<ApiResponse> => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.log("Error. Status:", response.status);
  }
  return await response.json();
};
