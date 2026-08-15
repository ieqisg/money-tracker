
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

  return (
    <Select>
      <SelectTrigger className="w-48 ">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by: </SelectLabel>
          <SelectItem value="tite">Tite</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
