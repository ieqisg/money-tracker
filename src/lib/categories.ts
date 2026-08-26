export type transactionType = "income" | "expense" | "saving" | "all"
export type categoriesProviderProps = {
  categoryType: transactionType
}

export type baseTransactionType = {
  income: string[];
  expense: string[];
  all: string[];
  saving: string[];
}

export const BASE_CATEGORIES: baseTransactionType = {
  expense: ["Food & Dining", "Transportation", "Bills", "Shopping", "Grocery", "Entertainment", "Loan", "Other"],
  income: ["Salary", "Investment", "Other"],
  all: ["Food & Dining", "Transportation", "Bills", "Shopping", "Grocery", "Entertainment", "Salary", "Investment", "Other"],
  saving: ["Bank", "Cash", "Other"]
}


