import { type ProfileFormType } from "@/types/profileTypes";

export const validateProfile = (formData: ProfileFormType) => {
  return [
    {
      message: "Current savings should be greater than 0",
      valid: formData.currSavings > 0,
    },
    {
      message: "Goal savings should be greater than 0",
      valid: formData.goalSavings > 0,
    },
    {
      message: "Job title should not be empty",
      valid: formData.jobTitle !== "",
    },
    {
      message: "Age should be greater than 0",
      valid: formData.age > 0,
    },
    {
      message: "Monthly Income should be greater than 0",
      valid: formData.monthlyIncome > 0,
    },
  ];
};

export const formatNumber = (num: string | number) => {
  const cleanValue = String(num).replace(/[^\d.]/g, '');

  if (!cleanValue) return '';

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  }).format(Number(cleanValue));
};
