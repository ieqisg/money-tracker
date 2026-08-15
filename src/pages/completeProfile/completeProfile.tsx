import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, CircleUser } from "lucide-react";
import { type ProfileFormType } from "@/types/profileTypes";
import { Button } from "@/components/ui/button";

export default function CompleteProfile() {
  const [formData, setFormData] = useState<ProfileFormType>({
    savings: Number(""),
    goalSavings: Number(""),
    jobTitle: "",
    age: Number(""),
    monthlyIncome: Number(""),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="w-full flex justify-center items-center relative">
      <Card className="w-full max-w-sm  bg-[#edffcc] border-slate-200  relative ">
        <CardHeader className="text-center space-y-1 pb-4">
          <div className="mx-auto w-11 h-11 rounded-full bg-[#9dd241] flex items-center justify-center mb-1">
            <span className="text-[#3b5704] font-bold text-xl">$</span>
          </div>
          <CardTitle className="text-xl font-bold text-black">
            Complete your profile
          </CardTitle>
          <CardDescription className="text-slate-500 text-sm">
            Complete your profile to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#0F172A]">
                Current Savings
              </Label>
              <div className="relative">
                <CircleUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  name="currSavings"
                  type="number"
                  placeholder="Enter your current savings"
                  className="pl-10 h-9"
                  value={formData.savings || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      savings: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#0F172A]">
                Goal Savings
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  name="goalSavings"
                  type="number"
                  placeholder="Enter your goal savings"
                  className="pl-10 h-9"
                  value={formData.goalSavings || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      goalSavings: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#0F172A]">
                Job title
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  name="jobTitle"
                  type="text"
                  placeholder="Enter your job title"
                  className="pl-10 h-9"
                  value={formData.jobTitle || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#0F172A]">
                Age
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  className="pl-10 h-9"
                  value={formData.age || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, age: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#0F172A]">
                Monthly Income
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  name="monthlyIncome"
                  type="number"
                  placeholder="Enter your monthly income"
                  className="pl-10 h-9"
                  value={formData.monthlyIncome || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyIncome: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <Button
                type="submit"
                className=" text-white font-medium h-10 mt-1 "
                onClick={handleSubmit}
              >
                Complete Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
