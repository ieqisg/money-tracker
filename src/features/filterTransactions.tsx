import CategoriesProvider from "./categoriesProvider"
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { BASE_CATEGORIES, type categoriesType } from "@/lib/categories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function FilterTransaction() {
  const [transType, setTransType] = useState<categoriesType>("income")

  return (
    <Select>
      <SelectTrigger className="w-48 ">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by: </SelectLabel>
          {BASE_CATEGORIES[transType].map((category) => (
            <SelectItem value={category}>{category}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
