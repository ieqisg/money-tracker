import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";


export default function AddTransactions() {
  return (
    <div className="flex flex-col gap-y-5 max-w-full">

      <div className="flex flex-col gap-x-5">
        <h1>Transaction type <span className="text-red-600">*</span></h1>
        <div className="flex flex-row gap-x-5">
          <label className="flex gap-1">
            <input type="radio" name="transType" value="expenses" />Income
          </label>
          <label className="flex gap-1">
            <input type="radio" name="transType" value="expenses" />Expenses
          </label>
        </div>
      </div>
      <div >
        <h1>Amount <span className="text-red-600">*</span></h1>
        <span className="mr-1">₱</span><input name="amount" className="border-b border-black" type="number" placeholder="Enter amount " />
      </div>
      <div>
        <h1>Description <span className="text-red-600">*</span></h1>
        <textarea className="border border-gray-400 rounded-md w-full h-10 p-2" rows={5} placeholder="e.g., Grocery shopping, Salary, Electric bill" />
      </div>
      <div>
        {/*todo: Add logic to change drop down with respect to transType */}
        <h1>Category <span className="text-red-600">*</span></h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="border-gray-400" variant="outline">Select a Category <ChevronDown /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" >
            <DropdownMenuGroup>
              <DropdownMenuItem>Food & Dining</DropdownMenuItem>
              <DropdownMenuItem>Transporation</DropdownMenuItem>
              <DropdownMenuItem>Bills</DropdownMenuItem>
              <DropdownMenuItem>Shopping</DropdownMenuItem>
              <DropdownMenuItem>Grocery</DropdownMenuItem>
              <DropdownMenuItem>Entertainment</DropdownMenuItem>
              <DropdownMenuItem>Salary</DropdownMenuItem>
              <DropdownMenuItem>Investment</DropdownMenuItem>
              <DropdownMenuItem>Other</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <label>
          <h1>Date <span className="text-red-600">*</span></h1>
          <input type="date" className="border p-2 border-gray-400 rounded-md" />
        </label>
      </div>
    </div >
  )
}
