import type { categoriesType } from "@/lib/categories";



export type transactionsFormType = {
  transactionType: categoriesType;
  category: string;
  amount: number;
  description: string;
  date: Date;
}
