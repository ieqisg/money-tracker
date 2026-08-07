import { useState } from "react";
import CategoriesProvider from "./categoriesProvider";
import type { transactionType } from "@/types/transactionType";


export default function AddTransactions() {
  const [transType, setTransType] = useState<transactionType>("income")



  return (
    <div className="flex flex-col gap-y-5 max-w-full">

      <div className="flex flex-col gap-x-5">
        <h1 className="font-semibold">Transaction type <span className="text-red-600">*</span></h1>
        <div className="flex flex-row gap-x-5">
          <label className="flex gap-1">
            <input type="radio" name="transType" value="income" checked={transType === "income"} onChange={() => setTransType("income")} />Income
          </label>
          <label className="flex gap-1">
            <input type="radio" name="transType" value="expenses" checked={transType === "expenses"} onChange={() => setTransType("expenses")} />Expenses
          </label>
        </div>
      </div>
      <div >
        <h1 className="font-semibold">Amount <span className="text-red-600">*</span></h1>
        <span className="mr-1">₱</span><input name="amount" className="border-b border-black focus:outline-none" type="number" placeholder="Enter amount " />
      </div>
      <div>
        <h1 className="font-semibold">Description <span className="text-red-600">*</span></h1>
        <textarea className="border border-input rounded-lg w-full h-10 p-2" rows={5} placeholder="e.g., Grocery shopping, Salary, Electric bill" />
      </div>
      <CategoriesProvider transType={transType} />
      <div>
        <label>
          <h1 className="font-semibold">Date <span className="text-red-600">*</span></h1>
          <input type="date" className="border border-input p-1.5 rounded-lg w-full" />
        </label>
      </div>
    </div >
  )
}
