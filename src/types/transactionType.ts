import type { transactionType } from "@/lib/categories";



export type transactionsFormType = {
  transType: transactionType;
  category: string;
  amount: number;
  description: string;
  date: string;
  time: string;
}
