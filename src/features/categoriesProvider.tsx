import { BASE_CATEGORIES } from "@/lib/categories";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { categoriesProviderProps } from "@/lib/categories";

export default function CategoriesProvider({ categoryType }: categoriesProviderProps) {
  const [selectCategory, setSelectCategory] = useState("")

  useEffect(() => {
    setSelectCategory("")
  }, [categoryType])


  return (
    <div>
      {/*todo: Add logic to change drop down with respect to transType */}
      <h1 className="font-semibold">Category <span className="text-red-600">*</span></h1>
      <Select value={selectCategory} onValueChange={setSelectCategory}>
        <SelectTrigger className="w-full h-1">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup >
            {BASE_CATEGORIES[categoryType].map(category => (
              <SelectItem value={category}>{category}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>
  )
}
