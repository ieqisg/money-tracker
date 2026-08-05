import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
export default function FilterTransaction() {
  return (
    <>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col">
          <h1>Type  <span className="text-red-600">*</span></h1>
          <div className="flex flex-row gap-x-5">
            <label className="flex gap-1">
              <input type="radio" name="transType2" /> All
            </label>
            <label className="flex gap-1">
              <input type="radio" name="transType2" /> Income
            </label>
            <label className="flex gap-1">
              <input type="radio" name="transType2" /> Expenses
            </label>
          </div>
        </div>
        <div>
          {/*todo: Add logic to change drop down with respect to transType */}
          <h1>Category <span className="text-red-600">*</span></h1>
          <DropdownMenu modal={false}>
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

      </div>
    </>
  )
}
