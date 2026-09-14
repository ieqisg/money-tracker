import { useState } from "react";
import CategoriesProvider from "./categoriesProvider";
import { type transactionsFormType } from "@/types/transactionType";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { formatNumber } from "@/hooks/profileValidator";
import { addTransaction } from "@/api/addTransaction";
import {
  getCurrentTimeString,
  getTodayDateString,
} from "@/hooks/dateAndTime";
import { validateTransaction } from "@/hooks/transactionValidator";
import toast from "react-hot-toast"

export default function AddTransactions() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<transactionsFormType>({
    transType: "income",
    category: "",
    amount: Number(""),
    description: "",
    date: getTodayDateString(),
    time: getCurrentTimeString(),
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleCategoryChange = (newVal: string) => {
    setFormData((prevData) => ({
      ...prevData,
      category: newVal,
    }));
  };

  const handleSubmitTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    const validation = validateTransaction(formData);
    const invalidFields = validation
      .filter((item) => !item.valid)
      .map((item) => item.message);
    setErrors(invalidFields);
    if (invalidFields.length > 0) return

    try {
      const result = await addTransaction(formData);

      if (!result.success) {
        console.log(result);
        toast.error(result.message ?? "An unknown error occured")
        return
      }

      console.log(result);
      toast.success("Transaction added successfully")
    } catch (error) {
      toast.error("Unexpected error occured. Please try again");
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <span className="hidden md:inline">Transactions</span>
            <Plus />
          </Button>
        </DialogTrigger>

        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
        >
          <form onSubmit={handleSubmitTransaction}>
            <DialogHeader>
              <DialogTitle className="text-sm md:text-base">
                Add transactions
              </DialogTitle>

              <DialogDescription className="text-xs md:text-sm">
                Record a new income or expense transaction
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-y-3 md:gap-y-5 max-w-full">

              {/* Transaction Type */}
              <div className="flex flex-col gap-x-5">
                <h1 className="font-semibold">
                  Transaction type{" "}
                  <span className="text-red-600">*</span>
                </h1>

                <div className="flex flex-row gap-x-5">
                  <label className="flex gap-1">
                    <input
                      type="radio"
                      name="transType"
                      value="income"
                      checked={formData.transType === "income"}
                      onChange={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          transType: "income",
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
                      value="expense"
                      checked={formData.transType === "expense"}
                      onChange={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          transType: "expense",
                          category: "",
                        }))
                      }
                    />
                    Expenses
                  </label>

                  <label className="flex gap-1">
                    <input
                      type="radio"
                      name="transType"
                      value="saving"
                      checked={formData.transType === "saving"}
                      onChange={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          transType: "saving",
                          category: "",
                        }))
                      }
                    />
                    Savings
                  </label>
                </div>
              </div>

              {/* Category */}
              <CategoriesProvider
                categoryType={formData.transType}
                onCategoryChange={handleCategoryChange}
                currentValue={formData.category}
              />

              {/* Amount */}
              <div>
                <h1 className="font-semibold">
                  Amount <span className="text-red-600">*</span>
                </h1>

                <span className="mr-1">₱</span>

                <input
                  name="amount"
                  className="border-b border-black focus:outline-none"
                  type="text"
                  placeholder="Enter amount"
                  value={
                    formData.amount
                      ? formatNumber(formData.amount)
                      : ""
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: Number(
                        e.target.value.replace(/\D/g, "")
                      ),
                    })
                  }
                />
              </div>

              {/* Description */}
              <div>
                <h1 className="font-semibold">
                  Description{" "}
                  <span className="text-red-600">*</span>
                </h1>

                <textarea
                  className="border border-input rounded-lg w-full h-10 p-2 text-xs md:text-sm md:placeholder:text-md"
                  rows={5}
                  placeholder="e.g., Grocery shopping, Salary, Electric bill"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-x-2">
                <div>
                  <label>
                    <h1 className="font-semibold">
                      Date <span className="text-red-600">*</span>
                    </h1>

                    <input
                      type="date"
                      className="border border-input p-1.5 rounded-lg w-full"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>

                <div>
                  <label>
                    <h1 className="font-semibold">
                      Time <span className="text-red-600">*</span>
                    </h1>

                    <input
                      type="time"
                      className="border border-input p-1.5 rounded-lg w-full"
                      value={formData.time ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          time: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
              </div>
              {/* Validation Errors */}
              {errors.length > 0 && (
                <div className="flex flex-col ">
                  {errors.map((error, index) => (
                    <span
                      key={index}
                      className="text-red-600 text-sm"
                    >
                      {error}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-row justify-end mt-3 md:mt-3">
              <Button
                type="button"
                variant="outline"
                className="text-red-700"
              >
                Clear
              </Button>

              <Button
                type="submit"
                variant="outline"
                disabled={loading}
              >
                {loading ? "Saving Transaction..." : "Save Transaction"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

