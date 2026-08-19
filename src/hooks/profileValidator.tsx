import { type ProfileFormType } from "@/types/profileTypes";

export const validateProfile = (formData: ProfileFormType) => {
  return [
    {
      text: "Current savings should be greater than 0",
      valid: formData.currSavings > 0,
    },
    {
      text: "Goal savings should be greater than 0",
      valid: formData.goalSavings > 0,
    },
    {
      text: "Job title should not be empty",
      valid: formData.jobTitle !== "",
    },
    {
      text: "Age should be greater than 0",
      valid: formData.age > 0,
    },
    {
      text: "Monthly Income should be greater than 0",
      valid: formData.monthlyIncome > 0,
    },
  ];
};
