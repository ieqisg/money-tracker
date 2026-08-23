import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";

import { useState, type ReactNode } from "react";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";

type AccountDropdownProps = {
  children: ReactNode;
};



export function AccountDropdown({ children }: AccountDropdownProps) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const { signOut, session } = useAuth()
  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const logout = await signOut()
      if (!logout.success) {
        console.log(logout.error, logout.message)
        return
      }
      //reroute to auth page
      console.log("Log out success", logout)
    } catch (error) {
      console.error(error)
      throw new Error("Unexpected error occured, Please try again.")
    } finally {
      setLoading(false)
      navigate("/auth")
    }
  }
  if (loading) return <div>Loading...</div>
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" side="top">
        <DropdownMenuGroup className="h-10 flex">
          <Avatar className="flex justify-center">
            <AvatarFallback>{session?.user?.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-2 ">
            <h1 className="text-xs">{session?.user?.name}</h1>
            <p className="text-[11px] text-gray-500">{session?.user?.email}</p>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck /> Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard /> Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell /> Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-red-700" onClick={handleSignOut}>
            <LogOut onClick={handleSignOut} /> Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}
