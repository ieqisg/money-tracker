import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/hooks/profileValidator"
import type { MoneyStatsProps } from "@/types/profileTypes"
import { Landmark, PhilippinePeso, TrendingDown, TrendingUp, WalletCards } from "lucide-react"


export default function MoneyStats({ currSavings, goalSavings, monthlyIncome }: MoneyStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card >
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between" >
            <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-500"> Income</h1>
            <h1><TrendingUp className="h-5 w-5 text-green-600" /></h1>
          </CardTitle >
        </CardHeader>
        <CardContent className="flex flex-row items-center mt-4">
          <PhilippinePeso className="h-5 w-5 " />
          <span className="text-xl font-bold">{formatNumber(monthlyIncome ?? 0)}</span>
        </CardContent>
        <CardFooter className="bg-white border-none text-green-600">+8.2% this month</CardFooter>
      </Card>
      <Card >
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between" >
            <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-500" >Expense</h1>
            <h1><TrendingDown className="h-5 w-5 text-red-600" /></h1>
          </CardTitle >
        </CardHeader>
        <CardContent className="flex flex-row items-center mt-4">
          <PhilippinePeso className="h-5 w-5" />
          <span className="text-xl font-bold"> {formatNumber(0)}</span>
        </CardContent>
        <CardFooter className="bg-white border-none text-red-600">-8.2% this month</CardFooter>
      </Card>
      <Card >
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between" >
            <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Remaining</h1>
            <h1><WalletCards className="h-5 w-5 text-purple-600" /></h1>
          </CardTitle >
        </CardHeader>
        <CardContent className="flex flex-row items-center mt-4">
          <PhilippinePeso className="h-5 w-5" />
          <span className="text-xl font-bold">{formatNumber(0)}</span>
        </CardContent>
        <CardFooter className="bg-white border-none text-green-600">+8.2% this month</CardFooter>
      </Card>
      <Card >
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between" >
            <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Savings</h1>
            <h1><Landmark className="h-5 w-5 text-blue-600" /></h1>
          </CardTitle >
        </CardHeader>
        <CardContent className="flex flex-row items-center mt-4">
          <PhilippinePeso className="h-5 w-5" />
          <span className="text-xl font-bold">{formatNumber(currSavings ?? 0)}</span>
        </CardContent>
        <CardFooter className="flex flex-col items-start bg-white border-none text-[11px]  mb-1">
          <h1 className="text-blue-500">Goal: {formatNumber(goalSavings ?? "")}</h1>
          <progress
            className="w-full h-2 border-none bg-gray-200 rounded-full overflow-hidden
                 [&::-webkit-progress-bar]:bg-gray-200 
                 [&::-webkit-progress-value]:bg-blue-600 [&::-webkit-progress-value]:rounded-full
                 [&::-moz-progress-bar]:bg-blue-600 [&::-moz-progress-bar]:rounded-full"
            max={goalSavings}
            value={currSavings}
          >
            {currSavings}%
          </progress>
        </CardFooter>
      </Card>

    </div>
  )
}
