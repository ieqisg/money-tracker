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
import { Mail, CircleUser, CircleAlert } from "lucide-react";
import { type ProfileFormType } from "@/types/profileTypes";
import { Button } from "@/components/ui/button";
import { createProfile } from "@/api/userProfile";
import { validateProfile } from "@/hooks/profileValidator";

export default function CompleteProfile() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState<ProfileFormType>({
    currSavings: Number(""),
    goalSavings: Number(""),
    jobTitle: "",
    age: Number(""),
    monthlyIncome: Number(""),
  });

  const [touched, setTouched] = useState({
    currSavings: false,
    goalSavings: false,
    jobTitle: false,
    age: false,
    monthlyIncome: false,
  });

  const validations = validateProfile(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      currSavings: true,
      goalSavings: true,
      jobTitle: true,
      age: true,
      monthlyIncome: true,
    });

    const isValid = validations.every((validation) => validation.valid);

    if (!isValid) {
      return;
    }

    try {
      const result = await createProfile(
        `${API_URL}/api/profile/createProfile`,
        formData,
      );

      if (!result.success) {
        console.log(result);
        return;
      }

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center relative">
      <Card className="w-full max-w-sm bg-[#edffcc] border-slate-200 relative">
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
              <Label htmlFor="currSavings" className="text-[#0F172A]">
                Current Savings
              </Label>

              <div className="relative">
                <CircleUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <Input
                  id="currSavings"
                  name="currSavings"
                  type="number"
                  placeholder="Enter your current savings"
                  className={
                    touched.currSavings && !validations[0].valid
                      ? "pl-10 h-9 border-red-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                      : "pl-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                  }
                  value={formData.currSavings || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currSavings: Number(e.target.value),
                    })
                  }
                  onBlur={() =>
                    setTouched({
                      ...touched,
                      currSavings: true,
                    })
                  }
                />
              </div>
              <span className="text-xs text-red-600 flex items-center gap-x-1">
                {touched.currSavings && !validations[0].valid ? (
                  <>
                    <CircleAlert className="h-3 w-3" />
                    {validations[0].text}
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="goalSavings" className="text-[#0F172A]">
                Goal Savings
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <Input
                  id="goalSavings"
                  name="goalSavings"
                  type="number"
                  placeholder="Enter your goal savings"
                  className={
                    touched.goalSavings && !validations[1].valid
                      ? "pl-10 h-9 border-red-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                      : "pl-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                  }
                  value={formData.goalSavings || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      goalSavings: Number(e.target.value),
                    })
                  }
                  onBlur={() =>
                    setTouched({
                      ...touched,
                      goalSavings: true,
                    })
                  }
                />
              </div>
              <span className="text-xs text-red-600 flex items-center gap-x-1">
                {touched.goalSavings && !validations[1].valid ? (
                  <>
                    <CircleAlert className="h-3 w-3" />
                    {validations[1].text}
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>

            {/* Job Title */}
            <div className="space-y-1.5">
              <Label htmlFor="jobTitle" className="text-[#0F172A]">
                Job title
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <Input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  placeholder="Enter your job title"
                  className={
                    touched.jobTitle && !validations[2].valid
                      ? "pl-10 h-9 border-red-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                      : "pl-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                  }
                  value={formData.jobTitle || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jobTitle: e.target.value,
                    })
                  }
                  onBlur={() =>
                    setTouched({
                      ...touched,
                      jobTitle: true,
                    })
                  }
                />
              </div>
              <span className="text-xs text-red-600 flex items-center gap-x-1">
                {touched.jobTitle && !validations[2].valid ? (
                  <>
                    <CircleAlert className="h-3 w-3" />
                    {validations[2].text}
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="age" className="text-[#0F172A]">
                Age
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  className={
                    touched.age && !validations[3].valid
                      ? "pl-10 h-9 border-red-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                      : "pl-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                  }
                  value={formData.age || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      age: Number(e.target.value),
                    })
                  }
                  onBlur={() =>
                    setTouched({
                      ...touched,
                      age: true,
                    })
                  }
                />
              </div>
              <span className="text-xs text-red-600 flex items-center gap-x-1">
                {touched.age && !validations[3].valid ? (
                  <>
                    <CircleAlert className="h-3 w-3" />
                    {validations[3].text}
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="monthlyIncome" className="text-[#0F172A]">
                Monthly Income
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <Input
                  id="monthlyIncome"
                  name="monthlyIncome"
                  type="number"
                  placeholder="Enter your monthly income"
                  className={
                    touched.monthlyIncome && !validations[4].valid
                      ? "pl-10 h-9 border-red-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                      : "pl-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                  }
                  value={formData.monthlyIncome || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyIncome: Number(e.target.value),
                    })
                  }
                  onBlur={() =>
                    setTouched({
                      ...touched,
                      monthlyIncome: true,
                    })
                  }
                />
              </div>
              <span className="text-xs text-red-600 flex items-center gap-x-1">
                {touched.monthlyIncome && !validations[4].valid ? (
                  <>
                    <CircleAlert className="h-3 w-3" />
                    {validations[4].text}
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>

            <div className="flex flex-row justify-end">
              <Button
                type="submit"
                className="text-white font-medium h-10 mt-1"
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
