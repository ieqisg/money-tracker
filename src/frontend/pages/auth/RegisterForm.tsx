import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { RegisterFormProps } from "@/frontend/types/authTypes"
import { useState } from "react"
import { Mail, User, Lock, Briefcase, Calendar, Eye, EyeOff, DollarSign } from "lucide-react"
import { SmallButton } from "@/components/ui/smallButton"
import { ShimmerButton } from "@/components/ui/shimmer-button"



export default function RegisterForm({ onLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(true)



  const handleCreateAccount = () => {
    localStorage.removeItem('authChoice');
  }
  return (
    <div className="w-full flex justify-center relative">


      <Card className="w-full max-w-sm  bg-[#edffcc] border-slate-200  relative ">
        <CardHeader className="text-center space-y-1 pb-4">
          <div className="mx-auto w-11 h-11 rounded-full bg-[#9dd241] flex items-center justify-center mb-1">
            <span className="text-[#3b5704] font-bold text-xl">$</span>
          </div>
          <CardTitle className="text-xl font-bold text-black">Create Account</CardTitle>
          <CardDescription className="text-slate-500 text-sm">
            Complete your profile to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <form className="space-y-3">

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#0F172A]">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-[#0F172A]">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  className="pl-10 h-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-[#0F172A]">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="pl-10 h-9"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-[#0F172A]">Confirm</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm"
                    className="pl-10 h-9"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 -mt-1">
              <SmallButton
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 h-auto px-0"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {showPassword ? 'Hide' : 'Show'} password
              </SmallButton>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="job" className="text-[#0F172A]">Job Title</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="job"
                  name="job"
                  type="text"
                  placeholder="e.g. Software Engineer"
                  className="pl-10 h-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="age" className="text-[#0F172A]">Age</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Age"
                    className="pl-10 h-9"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="monthlyIncome" className="text-[#0F172A]">Monthly Income</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="monthlyIncome"
                    name="monthlyIncome"
                    type="number"
                    placeholder="Income"
                    className="pl-10 h-9"
                  />
                </div>
              </div>
            </div>

            <ShimmerButton
              type="submit"
              className="w-full text-white font-medium h-10 mt-1" background="rgba(59, 87, 4, 1)" shimmerColor="#9dd241"
              onClick={handleCreateAccount}
            >
              Create Account
            </ShimmerButton>

            <p className="text-center text-sm text-slate-500">
              Already have an account? <a onClick={onLogin} className="underline cursor-pointer">Sign In here.</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
