import { BASE_CATEGORIES } from "@/lib/categories";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { categoriesProviderProps } from "@/lib/categories";

type categoryChangeProps = {
  currentValue: string;
  onCategoryChange: (value: string) => void;
}

export default function CategoriesProvider({ categoryType, onCategoryChange, currentValue }: categoriesProviderProps & categoryChangeProps) {
  return (
    <div>
      <h1 className="font-semibold">Category <span className="text-red-600">*</span></h1>
      <Select value={currentValue} onValueChange={onCategoryChange} >
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
