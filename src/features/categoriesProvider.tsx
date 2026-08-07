import { ALL_CATEGORIES } from "@/lib/categories";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { categoriesProviderProps } from "@/types/transactionType";

export default function CategoriesProvider({ transType }: categoriesProviderProps) {
  const [selectCategory, setSelectCategory] = useState("")

  useEffect(() => {
    setSelectCategory("")
  }, [transType])


  return (
    <div>
      {/*todo: Add logic to change drop down with respect to transType */}
      <h1 className="font-semibold">Category <span className="text-red-600">*</span></h1>
      <Select value={selectCategory} onValueChange={setSelectCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ALL_CATEGORIES[transType].map(category => (
              <SelectItem value={category}>{category}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>
  )
}
