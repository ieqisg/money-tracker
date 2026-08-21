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
import { CircleUser, CircleAlert, PhilippinePeso, BriefcaseBusiness } from "lucide-react";
import { type ProfileFormType } from "@/types/profileTypes";
import { Button } from "@/components/ui/button";
import { createProfile } from "@/api/userProfile";
import { validateProfile } from "@/hooks/profileValidator";
import { formatNumber } from "@/hooks/profileValidator";

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
    <div className="min-h-screen flex justify-center items-center relative bg-white">
      <Card className="w-full max-w-sm relative border-0 shadow-none">
        <CardHeader className="text-center space-y-1 ">

          <CardTitle className="text-xl font-bold text-black">
            Complete your profile
          </CardTitle>
          <CardDescription className="text-slate-500 text-xs">
            Complete your profile to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex flex-row gap-x-2">
              <div className="space-y-1.5">
                <Label htmlFor="currSavings" className="text-black">
                  Current Savings
                </Label>
                <div className="relative">
                  <PhilippinePeso className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <Input
                    id="currSavings"
                    name="currSavings"
                    type="text"
                    placeholder="20,000"
                    className={`pl-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0  text-black ${touched.currSavings && !validations[0].valid ? "border-red-600" : ""}`}
                    value={formData.currSavings ? formatNumber(formData.currSavings) : ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currSavings: Number(e.target.value.replace(/\D/g, "")),
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
                <span className="text-xs text-red-600 flex gap-x-1">
                  {touched.currSavings && !validations[0].valid ? (
                    <>
                      <CircleAlert className="h-4 w-4" />
                      {validations[0].text}
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="goalSavings" className="text-black">
                  Goal Savings
                </Label>

                <div className="relative">
                  <PhilippinePeso className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <Input
                    id="goalSavings"
                    name="goalSavings"
                    type="text"
                    placeholder="e.g 5,000"
                    className={`pl-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0  text-black ${touched.goalSavings && !validations[1].valid ? "border-red-600" : ""}`}
                    value={formData.goalSavings ? formatNumber(formData.goalSavings) : ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        goalSavings: Number(e.target.value.replace(/\D/g, "")),
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
                <span className="text-xs text-red-600 flex  gap-x-1">
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
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="jobTitle" className="text-black">
                Job title
              </Label>

              <div className="relative">
                <BriefcaseBusiness className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <Input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  placeholder="Enter your job title"

                  className={`pl-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0  text-black ${touched.jobTitle && !validations[2].valid ? "border-red-600" : ""}`}
                  value={formData.jobTitle || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      jobTitle: e.target.value.replace(/[0-9]/g, ''),
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
              <Label htmlFor="age" className="text-black">
                Age
              </Label>

              <div className="relative">
                <CircleUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <Input
                  id="age"
                  name="age"
                  type="text"
                  placeholder="Enter your age"
                  maxLength={3}
                  className={`pl-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0  text-black ${touched.age && !validations[3].valid ? "border-red-600" : ""}`}
                  value={formData.age ? formatNumber(formData.age) : ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      age: Number(e.target.value.replace(/\D/g, "")),
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
              <Label htmlFor="monthlyIncome" className="text-black">
                Monthly Income
              </Label>

              <div className="relative">
                <PhilippinePeso className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <Input
                  id="monthlyIncome"
                  name="monthlyIncome"
                  type="text"
                  placeholder="Enter your monthly income"
                  className={`pl-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0  text-black ${touched.currSavings && !validations[0].valid ? "border-red-600" : ""}`}
                  value={formData.monthlyIncome ? formatNumber(formData.monthlyIncome) : ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyIncome: Number(e.target.value.replace(/\D/g, "")),
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
                className="text-white bg-green-500 font-medium h-10 mt-1"
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
