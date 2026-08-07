export type baseCategoriesType = {
  income: string[];
  expenses: string[];
}

const BASE_CATEGORIES: baseCategoriesType = {
  expenses: ["Food & Dining", "Transportation", "Bills", "Shopping", "Grocery", "Entertainment", "Other"],
  income: ["Salary", "Investment", "Other"],
}

export const ALL_CATEGORIES = {
  ...BASE_CATEGORIES,
  all: [...new Set(Object.values(BASE_CATEGORIES).flat())]
}
