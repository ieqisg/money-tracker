import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
export default function FilterTransaction() {
    return (_jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-48 ", children: _jsx(SelectValue, { placeholder: "Select a category" }) }), _jsx(SelectContent, { children: _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Sort by: " }), _jsx(SelectItem, { value: "tite", children: "Tite" })] }) })] }));
}
