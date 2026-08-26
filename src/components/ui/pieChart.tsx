import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const categories = [
  {
    name: "Food & Dining",
    amount: 9088,
    color: "#EA580C",
  },
  {
    name: "Bills",
    amount: 7100,
    color: "#CA8A04",
  },
  {
    name: "Transportation",
    amount: 5112,
    color: "#2563EB",
  },
  {
    name: "Shopping",
    amount: 3976,
    color: "#DB2777",
  },
  {
    name: "Entertainment",
    amount: 2100,
    color: "#9333EA",
  },
  {
    name: "Grocery",
    amount: 1024,
    color: "#65A30D",
  },
];

export default function PieChart() {
  const total = categories.reduce(
    (sum, category) => sum + category.amount,
    0
  );

  const data = {
    labels: categories.map((category) => category.name),

    datasets: [
      {
        data: categories.map((category) => category.amount),

        backgroundColor: categories.map(
          (category) => `${category.color}CC`
        ),

        borderColor: categories.map(
          (category) => category.color
        ),

        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);

            return ` ₱${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">

      {/* Pie */}
      <div className="w-full max-w-[260px]">
        <Pie data={data} options={options} />
      </div>

      {/* Total */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Total expenses
        </p>

        <p className="text-2xl font-semibold">
          ₱{total.toLocaleString()}
        </p>
      </div>

      {/* Category list */}
      <div className="mt-6 w-full space-y-4">
        {categories.map((category) => {
          const percentage = (category.amount / total) * 100;

          return (
            <div key={category.name}>

              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: category.color,
                    }}
                  />

                  <span className="text-sm md:max-w-[40px] truncate lg:max-w-full">
                    {category.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    ₱{category.amount.toLocaleString()}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: category.color,
                  }}
                />
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
