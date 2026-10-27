import transactionService from "@/api/transactionService";
import { useQuery } from "@tanstack/react-query";

export const useTransaction = () => useQuery({
  queryKey: ['transactionSummary'],
  queryFn: () => transactionService.getSummary(),
  staleTime: Infinity,
})


