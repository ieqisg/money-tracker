
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import AddTransactions from "@/features/addTransactions";
import FilterTransaction from "@/features/filterTransactions";

export default function Transactions() {
  return (
    <>
      <div className="flex justify-end space-x-2 mb-2">
        <div className="flex flex-row gap-x-3">
          <input type="search" placeholder="Search..." className="border rounded-md placeholder:text-sm p-1 w-full" />
          <FilterTransaction />
          <AddTransactions />
        </div>
      </div>
      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="min-w-200">
          <TableCaption>Recent Transactions</TableCaption>
          <TableHeader className="">
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
            <TableRow className="text-red-700 text-sm">
              <TableCell>2026-08-04</TableCell>
              <TableCell>Grocery Store</TableCell>
              <TableCell>Food</TableCell>
              <TableCell>Expense</TableCell>
              <TableCell>$45.00</TableCell>
              <TableCell className="flex gap-2">
                <Trash2 className="h-4.5 w-4.5 text-red-700" />
                <SquarePen className="h-4.5 w-4.5 text-black" />
              </TableCell>
            </TableRow>
            <TableRow className="text-green-700">
              <TableCell>2026-08-04</TableCell>
              <TableCell>Grocery Store</TableCell>
              <TableCell>Food</TableCell>
              <TableCell>Expense</TableCell>
              <TableCell>$45.00</TableCell>
              <TableCell className="flex gap-2">
                <Trash2 className="h-4.5 w-4.5 text-red-700" />
                <SquarePen className="h-4.5 w-4.5 text-black" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

    </>
  )
}
