import PieChart from "@/components/ui/pieChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function SpendingBreakdown() {
  return (
    <div className="col-span-1">
      <Card>
        <CardHeader>
          <CardTitle>Spending Breakdown</CardTitle>
          <CardDescription>Breakdown of your expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <PieChart />

        </CardContent>
      </Card>
    </div>
  )
}
