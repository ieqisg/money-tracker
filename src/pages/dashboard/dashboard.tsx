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
import { useState } from "react";
export default function Dashboard() {
  const { loading } = useAuth()
  const { data: profile, error } = useProfile()
  if (error) toast.error("An unknown error occured")
  if (loading) return <div>Loading...</div>

  const years = [2025, 2026, 2027, 2028, 2029, 2030]
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())

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
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-green-600">{selectedYear}<ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Year</DropdownMenuLabel>
                {years.map((year) => (
                  <DropdownMenuItem key={year} onSelect={() => setSelectedYear(year)}>{year}</DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-green-600">{months[selectedMonth]}<ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Month</DropdownMenuLabel>
                {months.map((month, index) => (
                  <DropdownMenuItem key={month} onSelect={() => setSelectedMonth(index)}>{month}</DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <MoneyStats year={selectedYear} month={selectedMonth + 1} />
      <hr className="my-4 border border-gray-400" />
      <div className="grid grid-cols-1  md:grid-cols-5 gap-4 ">
        <MoneyChart />
        <SpendingBreakdown year={selectedYear} month={selectedMonth + 1} />
      </div>
      <div className="my-4">
        <h1 className="font-bold ">Transactions</h1>
        <p className="text-xs text-muted-foreground">Keep track of every income and expense in one place</p>
      </div>
      <hr className="my-4 border border-gray-400" />
      <Transactions year={selectedYear} month={selectedMonth + 1} />
    </div>
  )
}
