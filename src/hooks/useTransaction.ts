import transactionService from "@/api/transactionService";
import { useQuery } from "@tanstack/react-query";

export const useTransactionSummary = (year: number, month: number) => useQuery({
  queryKey: ['transactionSummary', year, month],
  queryFn: () => transactionService.getSummary(year, month),
  staleTime: Infinity,
})

export const useTransactionBreakdown = (transactionType: string, year: number, month: number) => useQuery({
  queryKey: ['transactionBreakdown', transactionType, year, month],
  queryFn: () => transactionService.getBreakdown(transactionType, year, month),
  staleTime: Infinity,
})


