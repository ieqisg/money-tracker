import type { TransactionType } from "@/lib/categories";

export type TransactionBreakdown = {
  category: string;
  total: number;
}

export type MoneySummary = {
  total_income: number;
  total_expense: number;
  total_savings: number;
}

export type transactionsFormType = {
  transactionType: TransactionType;
  category: string;
  amount: number;
  description: string;
  date: string;
  time: string;
}
