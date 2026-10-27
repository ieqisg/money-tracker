import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/hooks/profileValidator"
import { useProfile } from "@/hooks/useProfile"
import { useTransaction } from "@/hooks/useTransaction"
import { Landmark, PhilippinePeso, TrendingDown, TrendingUp, WalletCards } from "lucide-react"


export default function MoneyStats() {
  const { data: profile } = useProfile()
  const { data: transactionSummary } = useTransaction();

  const totalIncome = ((profile?.monthlyIncome ?? 0) + (transactionSummary?.total_income ?? 0))
  const totalSavings = ((profile?.currSavings ?? 0) + (transactionSummary?.total_savings ?? 0))
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card >
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between" >
            <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-500"> Income</h1>
            <h1><TrendingUp className="h-5 w-5 text-green-600" /></h1>
          </CardTitle >
        </CardHeader>
        <CardContent className="flex flex-col mt-4">
          <span className="flex flex-row items-center text-xl font-bold"><PhilippinePeso className="h-5 w-5 " />{formatNumber(totalIncome ?? 0)}</span>
          <p className="flex flex-row items-center text-xs mt-2 text-slate-500 ">salary:  <PhilippinePeso className="h-3 w-3" />
            <span className="font-semibold">{formatNumber(profile?.monthlyIncome ?? 0)}</span>
          </p>
        </CardContent>
        <CardFooter className="bg-white border-none text-green-600 ">+8.2% this month</CardFooter>
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
          <span className="text-xl font-bold"> {formatNumber(transactionSummary?.total_expense ?? 0)}</span>
        </CardContent>
        <CardFooter className=" bg-white border-none text-red-600 mt-6">-8.2% this month</CardFooter>
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
          <span className="text-xl font-bold">{formatNumber((totalIncome ?? 0) - (transactionSummary?.total_expense ?? 0))}</span>
        </CardContent>
        <CardFooter className="bg-white border-none text-green-600 mt-6">+8.2% this month</CardFooter>
      </Card>
      <Card >
        <CardHeader>
          <CardTitle className="flex flex-row items-center justify-between" >
            <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Savings</h1>
            <h1><Landmark className="h-5 w-5 text-blue-600" /></h1>
          </CardTitle >
        </CardHeader>
        <CardContent className="flex flex-col justify-start mt-4">
          <span className="flex flex-row items-center text-xl font-bold"><PhilippinePeso className="h-5 w-5" />{formatNumber(totalSavings)}</span>
          <span className="flex flex-row items-center text-xs text-slate-500">orig. savings: <PhilippinePeso className="h-3 w-3" /><span className="font-semibold">{formatNumber(profile?.currSavings ?? 0)}</span></span>
        </CardContent>
        <CardFooter className="flex flex-col items-start bg-white border-none text-[11px] mt-2 ">
          <h1 className="text-blue-500">Goal: {formatNumber(profile?.goalSavings ?? "")}</h1>
          <progress
            className="w-full h-2 border-none bg-gray-200 rounded-full overflow-hidden
                 [&::-webkit-progress-bar]:bg-gray-200 
                 [&::-webkit-progress-value]:bg-blue-600 [&::-webkit-progress-value]:rounded-full
                 [&::-moz-progress-bar]:bg-blue-600 [&::-moz-progress-bar]:rounded-full"
            max={profile?.goalSavings ?? 0}
            value={totalSavings}
          >
            {totalSavings}%
          </progress>
        </CardFooter>
      </Card>

    </div>
  )
}
