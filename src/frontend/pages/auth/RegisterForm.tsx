import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Mail, User, Lock, Briefcase, Calendar, Eye, EyeOff, DollarSign } from "lucide-react"
import { SmallButton } from "@/components/ui/smallButton"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { isPasswordStrong } from "@/hooks/passwordValidator"
import { isPasswordMatched } from "@/hooks/passwordValidator"
import type { RegisterFormProps } from "@/types/authTypes"
import type { RegisterUser } from "@/types/authTypes"


export default function RegisterForm({ onLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(true)
  const [isPassStrong, setIsPassStrong] = useState<boolean | undefined>()
  const [isPassMatched, setIsPassMatched] = useState<boolean | undefined>()

  const [formData, setFormData] = useState<RegisterUser>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    jobTitle: "",
    age: 0,
    monthlyIncome: 0,
  })
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.removeItem('authChoice');
    try {
      isPasswordStrong(formData.password) ? setIsPassStrong(undefined) : setIsPassStrong(false)
      isPasswordMatched(formData.password, formData.confirmPassword) ? setIsPassMatched(undefined) : setIsPassMatched(false)
      console.log(isPassStrong, isPassMatched)
    } catch (error) {
      console.error(error)
    }

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
          <form className="space-y-3" onSubmit={handleCreateAccount}>

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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="pl-10 h-9"
                />
              </div>
            </div>

            <div className="grid grid-rows-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-[#0F172A]">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    required
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={isPassStrong === false ? `pl-10 h-9 border-2 border-red-400` : ` pl-10 h-9 border-[#e5e5e5]`}
                    value={formData.password}
                    onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setIsPassStrong(undefined) }}
                  />
                </div>
                <span className={isPassStrong === false ? `text-red-500` : `text-slate-500`}>Must contain uppercase, lowercase, number, and special character.</span>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-[#0F172A]">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    required
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm"
                    className={isPassMatched === false ? `pl-10 h-9 border-2 border-red-400` : ` pl-10 h-9 border-[#e5e5e5]`}
                    value={formData.confirmPassword}
                    onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }); setIsPassMatched(undefined) }}
                  />
                </div>
                <span className={isPassMatched === false ? `text-red-500` : `text-slate-500`}>{isPassMatched === false ? `Passwords do not match.` : `Re-enter your password`}</span>
                <div className="flex items-center gap-2 mt-2">
                  <SmallButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex justify-end gap-1.5 text-sm text-[#3b5704] hover:text-red-700 h-auto px-0"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {showPassword ? 'Hide' : 'Show'} password
                  </SmallButton>
                </div>
              </div>

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
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
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
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
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
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
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
