import { ALL_CATEGORIES } from "@/lib/categories"

export type transactionType = keyof typeof ALL_CATEGORIES

export type categoriesProviderProps = {
  transType: transactionType
}
