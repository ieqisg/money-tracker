export type categoriesType = "income" | "expenses" | "all"
export type categoriesProviderProps = {
  categoryType: categoriesType
}

export type baseCategoriesType = {
  income: string[];
  expenses: string[];
  all: string[]
}

export const BASE_CATEGORIES: baseCategoriesType = {
  expenses: ["Food & Dining", "Transportation", "Bills", "Shopping", "Grocery", "Entertainment", "Other"],
  income: ["Salary", "Investment", "Other"],
  all: ["Food & Dining", "Transportation", "Bills", "Shopping", "Grocery", "Entertainment", "Salary", "Investment", "Other"]
}


