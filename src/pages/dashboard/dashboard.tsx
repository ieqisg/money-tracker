import MoneyStats from "./moneyStats";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Transactions from "./transactions";
export default function Dashboard() {

  return (
    <div className="font-sans  p-6 min-h-screen">
      <div className="mb-4">
        <h1 className="font-bold ">Dashboard</h1>
        <p className="text-xs text-muted-foreground">Get a complete overview of your financial activity</p>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-end mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Charts<ChevronDown /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Charts</DropdownMenuLabel>
              <DropdownMenuItem>Donut chart</DropdownMenuItem>
              <DropdownMenuItem>Line chart</DropdownMenuItem>
              <DropdownMenuItem>Pie chart</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <MoneyStats />
      <div className="my-4">
        <h1 className="font-bold ">Transactions</h1>
        <p className="text-xs text-muted-foreground">Keep track of every income and expense in one place</p>
      </div>
      <Separator className="my-4" />
      <Transactions />
    </div>
  )
}
