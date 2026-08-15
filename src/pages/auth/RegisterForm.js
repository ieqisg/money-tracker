import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardTitle, CardDescription, CardHeader, CardContent, } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, CircleUser, } from "lucide-react";
import { SmallButton } from "@/components/ui/smallButton";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { isPasswordStrong } from "@/hooks/passwordValidator";
import { isPasswordMatched } from "@/hooks/passwordValidator";
import { useAuth } from "@/context/authContext";
export default function RegisterForm({ onLogin }) {
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isPassStrong, setIsPassStrong] = useState();
    const [isPassMatched, setIsPassMatched] = useState();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleCreateAccount = async (e) => {
        e.preventDefault();
        sessionStorage.removeItem('authChoice');
        try {
            isPasswordStrong(formData.password) ? setIsPassStrong(undefined) : setIsPassStrong(false);
            isPasswordMatched(formData.password, formData.confirmPassword) ? setIsPassMatched(undefined) : setIsPassMatched(false);
            const user = await register(formData);
            console.log(user);
        }
        catch (error) {
            console.error(error);
        }
    };
    return (_jsx("div", { className: "w-full flex justify-center relative", children: _jsxs(Card, { className: "w-full max-w-sm  bg-[#edffcc] border-slate-200  relative ", children: [_jsxs(CardHeader, { className: "text-center space-y-1 pb-4", children: [_jsx("div", { className: "mx-auto w-11 h-11 rounded-full bg-[#9dd241] flex items-center justify-center mb-1", children: _jsx("span", { className: "text-[#3b5704] font-bold text-xl", children: "$" }) }), _jsx(CardTitle, { className: "text-xl font-bold text-black", children: "Create Account" }), _jsx(CardDescription, { className: "text-slate-500 text-sm", children: "Complete your profile to get started" })] }), _jsx(CardContent, { className: "pt-0", children: _jsxs("form", { className: "space-y-3", onSubmit: handleCreateAccount, children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { htmlFor: "email", className: "text-[#0F172A]", children: "Full name" }), _jsxs("div", { className: "relative", children: [_jsx(CircleUser, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx(Input, { id: "name", name: "name", type: "text", placeholder: "Enter your full name", className: "pl-10 h-9", value: formData.name || "", onChange: (e) => setFormData({ ...formData, name: e.target.value }) })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { htmlFor: "email", className: "text-[#0F172A]", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx(Input, { id: "email", name: "email", type: "email", placeholder: "Enter your email", className: "pl-10 h-9", value: formData.email || "", onChange: (e) => setFormData({ ...formData, email: e.target.value }) })] })] }), _jsxs("div", { className: "grid grid-rows-2 gap-3", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { htmlFor: "password", className: "text-[#0F172A]", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx(Input, { required: true, id: "password", name: "password", type: showPassword ? 'text' : 'password', placeholder: "Password", className: isPassStrong === false ? `pl-10 h-9 border-2 border-red-400` : ` pl-10 h-9 border-[#e5e5e5]`, value: formData.password, onChange: (e) => { setFormData({ ...formData, password: e.target.value }); setIsPassStrong(undefined); } })] }), _jsx("span", { className: isPassStrong === false ? `text-red-500` : `text-slate-500`, children: "Must contain uppercase, lowercase, number, and special character." })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(Label, { htmlFor: "confirmPassword", className: "text-[#0F172A]", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx(Input, { required: true, id: "confirmPassword", name: "confirmPassword", type: showPassword ? 'text' : 'password', placeholder: "Confirm", className: isPassMatched === false ? `pl-10 h-9 border-2 border-red-400` : ` pl-10 h-9 border-[#e5e5e5]`, value: formData.confirmPassword, onChange: (e) => { setFormData({ ...formData, confirmPassword: e.target.value }); setIsPassMatched(undefined); } })] }), _jsx("span", { className: isPassMatched === false ? `text-red-500` : `text-slate-500`, children: isPassMatched === false ? `Passwords do not match.` : `Re-enter your password` }), _jsx("div", { className: "flex items-center gap-2 mt-2", children: _jsxs(SmallButton, { type: "button", variant: "ghost", size: "sm", onClick: () => setShowPassword(!showPassword), className: "flex justify-end gap-1.5 text-sm text-[#3b5704] hover:text-red-700 h-auto px-0", children: [showPassword ? _jsx(EyeOff, { className: "w-3 h-3" }) : _jsx(Eye, { className: "w-3 h-3" }), showPassword ? 'Hide' : 'Show', " password"] }) })] })] }), _jsx(ShimmerButton, { type: "submit", className: "w-full text-white font-medium h-10 mt-1", background: "rgba(59, 87, 4, 1)", shimmerColor: "#9dd241", onClick: handleCreateAccount, children: "Create Account" }), _jsxs("p", { className: "text-center text-sm text-slate-500", children: ["Already have an account? ", _jsx("a", { onClick: onLogin, className: "underline cursor-pointer", children: "Sign In here." })] })] }) })] }) }));
}
