import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter, } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ShimmerButton } from "@/components/ui/shimmer-button"
export default function LoginForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-8 bg-[#3b5704] overflow-y-auto">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#9dd241]">Money Tracker</h1>
        <p className="text-muted-foreground mt-2">
          Track where your money goes
        </p>
      </div>

      {/* Card */}
      <Card className="w-full max-w-sm bg-[#edffcc]">
        <CardHeader >
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>

        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="border-[#9dd241]"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                </div>

                <Input id="password" type="password" required className="border-[#9dd241]" />
                <a
                  href="#"
                  className="ml-auto text-xs underline-offset-4 underline"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2 bg-[#edffcc]">
          <ShimmerButton type="submit" className="w-full" background="rgba(59, 87, 4, 1)" shimmerColor="#9dd241"  >
            Login
          </ShimmerButton>
          <span className="text-xs">Dont have an account yet? <a href="#" className="ml-auto text-xs underline-offset-4 underline text-[#3b5704]"> Register Here</a></span>

        </CardFooter>
      </Card>

    </div>
  )
}
