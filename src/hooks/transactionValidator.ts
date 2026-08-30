import type { transactionsFormType } from "@/types/transactionType";

export const validateTransaction = (
  formData: transactionsFormType
) => {
  return [
    {
      message: "Please select a category",
      valid: formData.category !== "",
    },
    {
      message: "Please enter an amount that is greater than 0",
      valid: formData.amount > 0,
    },
    {
      message: "Please enter a date",
      valid: formData.date !== "",
    },
    {
      message: "Please enter a time",
      valid: formData.time !== "",
    },
  ];
};

