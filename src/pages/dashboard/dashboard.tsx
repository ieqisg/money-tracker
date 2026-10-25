import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Transactions from "../transactions/transactions";
import { MoneyChart } from "./moneyChart";
import { useAuth } from "@/context/authContext";
import MoneyStats from "./moneyStats";
import SpendingBreakdown from "./spendingBreakdown";
import toast from "react-hot-toast";
import { useProfile } from "@/hooks/useProfile";
export default function Dashboard() {
  const { loading } = useAuth()
  const { data: profile, error } = useProfile()
  if (error) toast.error("An unknown error occured")
  if (loading) return <div>Loading...</div>


  return (
    <div className="font-sans  p-6 min-h-screen bg-white">
      <div className="mb-4">
        <h1 className="font-bold ">Dashboard</h1>
        <p className="text-xs text-muted-foreground">Get a complete overview of your financial activity</p>
      </div>
      <hr className="my-4 border border-gray-400" />
      <div className="flex justify-between mb-2">
        <div className="flex flex-col">
          <h1 className="">Good afternoon, <span className="font-bold">{`${profile?.firstName} ${profile?.lastName}`}</span></h1>
          <span className="text-sm text-muted-foreground"> Here's your financial overview</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-green-600">2026<ChevronDown /></Button>
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
      <hr className="my-4 border border-gray-400" />
      <div className="grid grid-cols-1  md:grid-cols-5 gap-4 ">
        <MoneyChart />
        <SpendingBreakdown />
      </div>
      <div className="my-4">
        <h1 className="font-bold ">Transactions</h1>
        <p className="text-xs text-muted-foreground">Keep track of every income and expense in one place</p>
      </div>
      <hr className="my-4 border border-gray-400" />
      <Transactions />
    </div>
  )
}
