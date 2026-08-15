import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/context/authContext";
export function AccountDropdown({ children }) {
    const { signOut } = useAuth();
    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            const logout = await signOut();
            if (!logout.success) {
                console.log(logout.error, logout.message);
                return;
            }
            //reroute to auth page
            console.log("Log out success", logout);
        }
        catch (error) {
            console.error(error);
            throw new Error("Unexpected error occured, Please try again.");
        }
    };
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: children }), _jsxs(DropdownMenuContent, { className: "w-40", align: "end", side: "top", children: [_jsxs(DropdownMenuGroup, { className: "h-10 flex", children: [_jsx(Avatar, { className: "flex justify-center", children: _jsx(AvatarFallback, { children: "MT" }) }), _jsxs("div", { className: "ml-2", children: [_jsx("h1", { className: "text-sm", children: "Full name" }), _jsx("p", { className: "text-[11px] text-gray-500", children: "email@com" })] })] }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuGroup, { children: _jsxs(DropdownMenuItem, { children: [_jsx(Sparkles, {}), "Upgrade to Pro"] }) }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuGroup, { children: [_jsxs(DropdownMenuItem, { children: [_jsx(BadgeCheck, {}), " Account"] }), _jsxs(DropdownMenuItem, { children: [_jsx(CreditCard, {}), " Billing"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Bell, {}), " Notifications"] })] }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuGroup, { children: _jsxs(DropdownMenuItem, { className: "text-red-700", onClick: handleSignOut, children: [_jsx(LogOut, { onClick: handleSignOut }), " Log out"] }) })] })] }));
}
