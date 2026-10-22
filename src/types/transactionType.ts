import type { TransactionType } from "@/lib/categories";



export type transactionsFormType = {
  transactionType: TransactionType;
  category: string;
  amount: number;
  description: string;
  date: string;
  time: string;
}
