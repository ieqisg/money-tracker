export type TransactionType = "INCOME" | "EXPENSE" | "SAVINGS" | "ALL"
export type categoriesProviderProps = {
  categoryType: TransactionType
}

export type baseTransactionType = {
  INCOME: string[];
  EXPENSE: string[];
  ALL: string[];
  SAVINGS: string[];
}

export const BASE_CATEGORIES: baseTransactionType = {
  EXPENSE: ["Food & Dining", "Transportation", "Bills", "Shopping", "Grocery", "Entertainment", "Loan", "Other"],
  INCOME: ["Salary", "Investment", "Other"],
  ALL: ["Food & Dining", "Transportation", "Bills", "Shopping", "Grocery", "Entertainment", "Salary", "Investment", "Other"],
  SAVINGS: ["Bank", "Cash", "Other"]
}


