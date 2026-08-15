import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BASE_CATEGORIES } from "@/lib/categories";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function CategoriesProvider({ categoryType, onCategoryChange, currentValue }) {
    return (_jsxs("div", { children: [_jsxs("h1", { className: "font-semibold", children: ["Category ", _jsx("span", { className: "text-red-600", children: "*" })] }), _jsxs(Select, { value: currentValue, onValueChange: onCategoryChange, children: [_jsx(SelectTrigger, { className: "w-full h-1", children: _jsx(SelectValue, { placeholder: "Select a Category" }) }), _jsx(SelectContent, { children: _jsx(SelectGroup, { children: BASE_CATEGORIES[categoryType].map(category => (_jsx(SelectItem, { value: category, children: category }))) }) })] })] }));
}
