import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, SlidersHorizontal, SquarePen, Trash2 } from "lucide-react";
import AddTransactions from "@/features/addTransactions";
import FilterTransaction from "@/features/filterTransactions";

export default function Transactions() {
  return (
    <>
      <div className="flex justify-end space-x-2 mb-2">
        <div className="flex flex-wrap gap-x-3">
          <input type="search" placeholder="Search..." className="border rounded-md placeholder:text-sm p-1" />
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Filter <SlidersHorizontal /> </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter</DialogTitle>
                <DialogDescription>Filter transactions by date, category, amount, or type</DialogDescription>
              </DialogHeader>
              <FilterTransaction />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Add Transactions <Plus /></Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add transactions</DialogTitle>
                <DialogDescription>Record a new income or expense transaction</DialogDescription>
              </DialogHeader>
              <AddTransactions />
              <DialogFooter>
                <Button variant="outline" className="text-red-700">Cancel</Button>
                <Button variant="outline" >Save Transactions</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="min-w-200">
          <TableCaption>Recent Transactions</TableCaption>
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
            <TableRow className="text-red-700">
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
