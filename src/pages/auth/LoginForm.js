import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter, } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {} from "@/types/authTypes";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
export default function LoginForm({ onRegister }) {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    //getSession is for testing only, remove later
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login(formData);
            if (!user.success) {
                console.log(user.error, user.message);
                return;
            }
            console.log(user);
        }
        catch (error) {
            console.error(error);
            throw new Error("Unexpected error occured, Please try again.");
        }
    };
    return (_jsxs("div", { className: "flex flex-col items-center gap-6 py-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-[#9dd241]", children: "Money Tracker" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Track where your money goes" })] }), _jsx(Card, { className: "w-full max-w-sm bg-[#edffcc]", children: _jsxs("form", { onSubmit: handleLogin, children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Login to your account" }), _jsx(CardDescription, { children: "Enter your email below to login to your account" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), placeholder: "m@example.com", required: true, className: "border-[#9dd241]" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx("div", { className: "flex items-center", children: _jsx(Label, { htmlFor: "password", children: "Password" }) }), _jsx(Input, { id: "password", type: "password", value: formData.password, onChange: (e) => (setFormData({ ...formData, password: e.target.value })), required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022", className: "border-[#9dd241]" }), _jsx("a", { href: "#", className: "ml-auto text-xs underline-offset-4 underline", children: "Forgot your password?" })] })] }) }), _jsxs(CardFooter, { className: "flex-col gap-2 bg-[#edffcc]", children: [_jsx(ShimmerButton, { type: "submit", className: "w-full", background: "rgba(59, 87, 4, 1)", shimmerColor: "#9dd241", onClick: handleLogin, children: "Login" }), _jsxs("span", { className: "text-xs", children: ["Dont have an account yet?", " ", _jsx("a", { onClick: onRegister, className: "ml-auto text-xs underline-offset-4 underline text-[#3b5704] cursor-pointer", children: "Register Here" })] })] })] }) })] }));
}
