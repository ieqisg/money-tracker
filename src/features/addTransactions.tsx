import { useState } from "react";
import CategoriesProvider from "./categoriesProvider";
import { type transactionsFormType } from "@/types/transactionType";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function AddTransactions() {
  const [formData, setFormData] = useState<transactionsFormType>({
    transactionType: "income",
    category: "",
    amount: null,
    description: "",
    date: new Date(),
  })

  const handleCategoryChange = (newVal: string) => {
    setFormData({ ...formData, category: newVal })
  }

  const handleSubmitTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <>
      <Dialog >

        <DialogTrigger>
          <Button ><span className="hidden md:inline">Add Transactions</span> <Plus /></Button>
        </DialogTrigger>
        <DialogContent onInteractOutside={(e) => e.preventDefault()} >
          <form onSubmit={handleSubmitTransaction}>
            <DialogHeader>
              <DialogTitle className="text-sm md:text-base">Add transactions</DialogTitle>
              <DialogDescription className="text-xs md:text-sm">Record a new income or expense transaction</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-y-3 md:gap-y-5 max-w-full">
              <div className="flex flex-col gap-x-5">
                <h1 className="font-semibold">Transaction type <span className="text-red-600">*</span></h1>
                <div className="flex flex-row gap-x-5">
                  <label className="flex gap-1">
                    <input
                      type="radio"
                      name="transType"
                      value="income"
                      checked={formData.transactionType === "income"}
                      onChange={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          transactionType: "income",
                          category: "",
                        }))
                      }

                    />
                    Income
                  </label>
                  <label className="flex gap-1">
                    <input
                      type="radio"
                      name="transType"
                      value="expenses"
                      checked={formData.transactionType === "expenses"}
                      onChange={() => setFormData((prevData) => ({ ...prevData, transactionType: "expenses", category: "", }))}
                    />Expenses
                  </label>
                </div>
              </div>
              <CategoriesProvider categoryType={formData.transactionType} onCategoryChange={handleCategoryChange} currentValue={formData.category} />
              <div >
                <h1 className="font-semibold">Amount <span className="text-red-600">*</span></h1>
                <span className="mr-1">₱</span>
                <input
                  name="amount"
                  className="border-b border-black focus:outline-none"
                  type="number"
                  placeholder="Enter amount "
                  value={formData.amount ?? ""}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                />
              </div>
              <div>
                <h1 className="font-semibold">Description <span className="text-red-600">*</span></h1>
                <textarea
                  className="border border-input rounded-lg w-full h-10 p-2 text-xs md:placeholder:text-sm "
                  rows={5}
                  placeholder="e.g., Grocery shopping, Salary, Electric bill"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label>
                  <h1 className="font-semibold">Date <span className="text-red-600">*</span></h1>
                  <input
                    type="date"
                    className="border border-input p-1.5 rounded-lg w-full"
                    value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      date: e.target.value ? new Date(e.target.value) : new Date()
                    })}
                  />
                </label>
              </div>
            </div >

            <DialogFooter className="flex flex-row justify-end mt-5 md:mt-3">
              <Button variant="outline" className="text-red-700">Clear</Button>
              <Button variant="outline" onSubmit={handleSubmitTransaction} >Save Transactions</Button>
            </DialogFooter>
          </form>
        </DialogContent>

      </Dialog>
    </>
  )
}
