import CategoriesProvider from "./categoriesProvider"
import type { transactionType } from "@/types/transactionType"
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export default function FilterTransaction() {
  const [transType, setTransType] = useState<transactionType>("income")

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="outline"><span className="hidden md:inline">Filter</span> <SlidersHorizontal /> </Button>
        </DialogTrigger>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-sm md:text-base">Filter</DialogTitle>
            <DialogDescription className="text-xs md:text-sm">Filter transactions by date, category, amount, or type</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-3 md:gap-y-5">
            <div className="flex flex-col">
              <h1 className="font-semibold">Type  <span className="text-red-600">*</span></h1>
              <div className="flex flex-row gap-x-5 text-xs md:text-sm">
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
                  <p className="font-medium text-xs md:text-sm">from: </p>
                  <input type="date" className="border border-input p-1 rounded-md text-xs md:text-sm col-span-2" />
                </label>
                <label className="grid grid-cols-4 items-center">
                  <p className="font-medium text-xs md:text-sm">to: </p>
                  <input type="date" className="border border-input p-1 text-xs md:text-sm rounded-md col-span-2" />
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold">Amount <span className="text-red-600">*</span></h1>
              <div className="flex flex-col gap-y-5">
                <label className="grid grid-cols-4  items-center">
                  <p className="font-medium text-xs md:text-sm ">Min:  </p>
                  <input type="number" className="border-b border-black focus:outline-none p-0.5   col-span-2 md:placeholder:text-sm placeholder:text-xs text-xs md:text-sm" placeholder="Enter min amount" />
                </label>
                <label className="grid grid-cols-4 items-center">
                  <p className="font-medium text-xs md:text-sm">Max: </p>
                  <input type="number" className="border-b border-black focus:outline-none p-0.5   col-span-2 md:placeholder:text-sm placeholder:text-xs text-xs md:text-sm" placeholder="Enter max amount" />
                </label>
              </div>

            </div>

          </div>
          <DialogFooter className="flex flex-row justify-end">
            <Button variant="outline" className="text-red-700">Reset Filters</Button>
            <Button variant="outline" >Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    </>
  )
}
