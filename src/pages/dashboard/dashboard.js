import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Transactions from "./transactions";
import { MoneyStats } from "./moneyStats";
export default function Dashboard() {
    return (_jsxs("div", { className: "font-sans  p-6 min-h-screen", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h1", { className: "font-bold ", children: "Dashboard" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Get a complete overview of your financial activity" })] }), _jsx(Separator, { className: "my-4" }), _jsx("div", { className: "flex justify-end mb-2", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { children: ["Charts", _jsx(ChevronDown, {})] }) }), _jsx(DropdownMenuContent, { children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Charts" }), _jsx(DropdownMenuItem, { children: "Donut chart" }), _jsx(DropdownMenuItem, { children: "Line chart" }), _jsx(DropdownMenuItem, { children: "Pie chart" })] }) })] }) }), _jsx(MoneyStats, {}), _jsxs("div", { className: "my-4", children: [_jsx("h1", { className: "font-bold ", children: "Transactions" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Keep track of every income and expense in one place" })] }), _jsx(Separator, { className: "my-4" }), _jsx(Transactions, {})] }));
}
