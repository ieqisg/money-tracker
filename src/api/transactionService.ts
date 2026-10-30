import type { ApiResponse } from '@/types/authTypes';
import type { MoneySummary, TransactionBreakdown, transactionsFormType } from '@/types/transactionType';

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
    year: number,
    month: number,
    limit: number,
    offset: number,
  ): Promise<transactionsFormType[]> {
    const response = await fetch(
      `${API_URL}/api/transaction?year=${year}&month=${month}&limit=${limit}&offset=${offset}`,
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

  async getSummary(year: number, month: number): Promise<MoneySummary> {
    const response = await fetch(`${API_URL}/api/summary?year=${year}&month=${month}`, {
      method: 'GET',
      credentials: 'include',
    }
    )
    if (!response.ok) {
      throw new Error("Failed to fetch summary")
    }
    return await response.json()
  }

  async getBreakdown(transactionType: string, year: number, month: number): Promise<TransactionBreakdown[]> {
    const response = await fetch(`${API_URL}/api/breakdown?type=${transactionType}&year=${year}&month=${month}`, {
      method: "GET",
      credentials: "include"
    })
    if (!response.ok) {
      throw new Error("Faled to fetch breakdown")
    }
    return await response.json()

  }
}

export default new TransactionService();

