import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import CategoriesProvider from "./categoriesProvider";
import {} from "@/types/transactionType";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export default function AddTransactions() {
    const [formData, setFormData] = useState({
        transactionType: "income",
        category: "",
        amount: null,
        description: "",
        date: new Date(),
    });
    const handleCategoryChange = (newVal) => {
        setFormData({ ...formData, category: newVal });
    };
    const handleSubmitTransaction = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (_jsx(_Fragment, { children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { children: [_jsx("span", { className: "hidden md:inline", children: "Add Transactions" }), " ", _jsx(Plus, {})] }) }), _jsx(DialogContent, { onInteractOutside: (e) => e.preventDefault(), children: _jsxs("form", { onSubmit: handleSubmitTransaction, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-sm md:text-base", children: "Add transactions" }), _jsx(DialogDescription, { className: "text-xs md:text-sm", children: "Record a new income or expense transaction" })] }), _jsxs("div", { className: "flex flex-col gap-y-3 md:gap-y-5 max-w-full", children: [_jsxs("div", { className: "flex flex-col gap-x-5", children: [_jsxs("h1", { className: "font-semibold", children: ["Transaction type ", _jsx("span", { className: "text-red-600", children: "*" })] }), _jsxs("div", { className: "flex flex-row gap-x-5", children: [_jsxs("label", { className: "flex gap-1", children: [_jsx("input", { type: "radio", name: "transType", value: "income", checked: formData.transactionType === "income", onChange: () => setFormData((prevData) => ({
                                                                    ...prevData,
                                                                    transactionType: "income",
                                                                    category: "",
                                                                })) }), "Income"] }), _jsxs("label", { className: "flex gap-1", children: [_jsx("input", { type: "radio", name: "transType", value: "expenses", checked: formData.transactionType === "expenses", onChange: () => setFormData((prevData) => ({ ...prevData, transactionType: "expenses", category: "", })) }), "Expenses"] })] })] }), _jsx(CategoriesProvider, { categoryType: formData.transactionType, onCategoryChange: handleCategoryChange, currentValue: formData.category }), _jsxs("div", { children: [_jsxs("h1", { className: "font-semibold", children: ["Amount ", _jsx("span", { className: "text-red-600", children: "*" })] }), _jsx("span", { className: "mr-1", children: "\u20B1" }), _jsx("input", { name: "amount", className: "border-b border-black focus:outline-none", type: "number", placeholder: "Enter amount ", value: formData.amount ?? "", onChange: (e) => setFormData({ ...formData, amount: Number(e.target.value) }) })] }), _jsxs("div", { children: [_jsxs("h1", { className: "font-semibold", children: ["Description ", _jsx("span", { className: "text-red-600", children: "*" })] }), _jsx("textarea", { className: "border border-input rounded-lg w-full h-10 p-2 text-xs md:placeholder:text-sm ", rows: 5, placeholder: "e.g., Grocery shopping, Salary, Electric bill", value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }) })] }), _jsx("div", { children: _jsxs("label", { children: [_jsxs("h1", { className: "font-semibold", children: ["Date ", _jsx("span", { className: "text-red-600", children: "*" })] }), _jsx("input", { type: "date", className: "border border-input p-1.5 rounded-lg w-full", value: formData.date ? formData.date.toISOString().split('T')[0] : '', onChange: (e) => setFormData({
                                                        ...formData,
                                                        date: e.target.value ? new Date(e.target.value) : new Date()
                                                    }) })] }) })] }), _jsxs(DialogFooter, { className: "flex flex-row justify-end mt-5 md:mt-3", children: [_jsx(Button, { variant: "outline", className: "text-red-700", children: "Clear" }), _jsx(Button, { variant: "outline", onSubmit: handleSubmitTransaction, children: "Save Transactions" })] })] }) })] }) }));
}
