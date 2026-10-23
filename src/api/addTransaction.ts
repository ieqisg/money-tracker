import type { ApiResponse } from "@/types/authTypes";
import type { transactionsFormType } from "@/types/transactionType";

const API_URL = import.meta.env.VITE_API_URL


export async function addTransaction(body: transactionsFormType): Promise<ApiResponse> {
  const response = await fetch(`${API_URL}/api/transaction`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    return { success: false, message: await response.json() }
  }
  return { success: true }
}
