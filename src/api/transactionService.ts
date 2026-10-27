import type { ApiResponse } from '@/types/authTypes';
import type { MoneySummary, transactionsFormType } from '@/types/transactionType';

const API_URL = import.meta.env.VITE_API_URL;

class TransactionService {
  async addTransaction(body: transactionsFormType): Promise<ApiResponse> {
    const response = await fetch(`${API_URL}/api/transaction`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to add transaction. Please try again later")
    }

    return { success: true };
  }

  async getTransaction(
    limit: number,
    offset: number
  ): Promise<transactionsFormType[]> {
    const response = await fetch(
      `${API_URL}/api/transaction?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return await response.json();
  }

  async getSummary(): Promise<MoneySummary> {
    const response = await fetch(`${API_URL}/api/summary`, {
      method: 'GET',
      credentials: 'include',
    }
    )
    if (!response.ok) {
      throw new Error("Failed to fetch summary")
    }
    return await response.json()
  }
}

export default new TransactionService();

