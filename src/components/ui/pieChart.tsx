import { useTransactionBreakdown } from "@/hooks/useTransaction";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const categoryColors: Record<string, string> = {
  "Food & Dining": "#EA580C",
  Bills: "#CA8A04",
  Transportation: "#2563EB",
  Shopping: "#DB2777",
  Entertainment: "#9333EA",
  Grocery: "#65A30D",
};

const fallbackColors = ["#0D9488", "#DC2626", "#4F46E5", "#0891B2", "#A16207"];

const getColor = (name: string, index: number) =>
  categoryColors[name] ?? fallbackColors[index % fallbackColors.length];

export default function PieChart() {
  const { data: transactionBreakdown = [] } = useTransactionBreakdown("EXPENSE", 2026, 10);

  const total = transactionBreakdown.reduce((sum, c) => sum + Number(c.total), 0);

  const items = transactionBreakdown.map((c, i) => ({
    name: c.category,
    amount: Number(c.total),
    color: getColor(c.category, i),
  }));

  const data = {
    labels: items.map((i) => i.name),
    datasets: [
      {
        data: items.map((i) => i.amount),
        backgroundColor: items.map((i) => `${i.color}CC`),
        borderColor: items.map((i) => i.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const percentage = total ? ((value / total) * 100).toFixed(1) : "0.0";
            return ` ₱${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[260px]">
        <Pie data={data} options={options} />
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">Total expenses</p>
        <p className="text-2xl font-semibold">₱{total.toLocaleString()}</p>
      </div>

      <div className="mt-6 w-full space-y-4">
        {items.map((item) => {
          const percentage = total ? (item.amount / total) * 100 : 0;

          return (
            <div key={item.name}>
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm md:max-w-[40px] truncate lg:max-w-full">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    ₱{item.amount.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${percentage}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
