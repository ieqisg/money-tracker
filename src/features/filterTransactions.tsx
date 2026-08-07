import CategoriesProvider from "./categoriesProvider"
import type { transactionType } from "@/types/transactionType"
import { useState } from "react"

export default function FilterTransaction() {
  const [transType, setTransType] = useState<transactionType>("income")

  return (
    <>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col">
          <h1 className="font-semibold">Type  <span className="text-red-600">*</span></h1>
          <div className="flex flex-row gap-x-5">
            <label className="flex gap-1">
              <input type="radio" name="transType2" value="all" checked={transType === "all"} onChange={() => setTransType("all")} />All
            </label>
            <label className="flex gap-1">
              <input type="radio" name="transType2" value="income" checked={transType === "income"} onChange={() => setTransType("income")} />Income
            </label>
            <label className="flex gap-1">
              <input type="radio" name="transType2" value="expenses" checked={transType === "expenses"} onChange={() => setTransType("expenses")} />Expenses
            </label>

          </div>
        </div>
        <div>
          <CategoriesProvider transType={transType} />
        </div>
        <div className="flex flex-col ">
          <h1 className="font-semibold">Date range <span className="text-red-600">*</span></h1>
          <div className="flex flex-col gap-y-5">
            <label className="grid grid-cols-4  items-center">
              <p className="font-medium">from: </p>
              <input type="date" className="border p-1.5 border-gray-400 rounded-md col-span-2" />
            </label>
            <label className="grid grid-cols-4 items-center">
              <p className="font-medium">to: </p>
              <input type="date" className="border p-1.5 border-gray-400 rounded-md col-span-2" />
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold">Amount <span className="text-red-600">*</span></h1>
          <div className="flex flex-col gap-y-5">
            <label className="grid grid-cols-4  items-center">
              <p className="font-medium">Min:  </p>
              <input type="number" className="border p-1 border-gray-400 rounded-md col-span-2" />
            </label>
            <label className="grid grid-cols-4 items-center">
              <p className="font-medium">Max: </p>
              <input type="number" className="border p-1 border-gray-400 rounded-md col-span-2" />
            </label>
          </div>

        </div>

      </div>
    </>
  )
}
