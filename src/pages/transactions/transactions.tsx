import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import AddTransactions from "@/features/addTransactions";
import FilterTransaction from "@/features/filterTransactions";
import transactionService from "@/api/transactionService";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { transactionsFormType } from "@/types/transactionType";
import { formatNumber } from "@/hooks/profileValidator";
import { useState } from "react";

const LIMIT = 10;

export default function Transactions() {
  const [showAll, setShowAll] = useState(false);

  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["transaction"],
    queryFn: ({ pageParam }) =>
      transactionService.getTransaction(LIMIT, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length * LIMIT,
  });

  const allTransactions: transactionsFormType[] = data?.pages.flat() ?? [];

  const transactions = showAll
    ? allTransactions
    : allTransactions.slice(0, LIMIT);

  if (isLoading) {
    return <p>Loading transactions...</p>;
  }

  if (isError) {
    return <p>Could not load transactions: {String(error)}</p>;
  }

  return (
    <>
      <div className="mb-2 flex justify-end space-x-2">
        <div className="flex flex-row gap-x-3">
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md border p-1 placeholder:text-sm"
          />
          <FilterTransaction />
          <AddTransactions />
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="min-w-200 bg-[#ffffff]">
          <TableCaption>
            <div className="flex flex-col justify-center gap-y-2">
              <div>
                {hasNextPage && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowAll(true);
                      fetchNextPage();
                    }}
                    disabled={isFetchingNextPage}
                    className="rounded-md border px-4 py-2 disabled:opacity-50 text-black font-semibold"
                  >
                    {isFetchingNextPage ? "Loading..." : "Show more"}
                  </button>
                )}
              </div>
              <div>
                {allTransactions.length > 0
                  ? "Recent transactions"
                  : "No transactions yet..."}
              </div>

            </div>
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow
                key={`${transaction.date}-${transaction.time}-${index}`}
                className={
                  transaction.transactionType === "INCOME"
                    ? "text-green-700"
                    : transaction.transactionType === "EXPENSE"
                      ? "text-red-700"
                      : "text-blue-700"
                }
              >
                <TableCell className="flex flex-col justify-self-start items-center ">
                  <span>{transaction.date}</span>
                  <span className="text-black text-xs">{transaction.time}</span>

                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.transactionType}</TableCell>
                <TableCell>₱ {formatNumber(transaction.amount)}</TableCell>
                <TableCell className="flex gap-2">
                  <Trash2 className="h-4.5 w-4.5 text-red-700" />
                  <SquarePen className="h-4.5 w-4.5 text-black" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
