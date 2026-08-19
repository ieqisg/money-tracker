import { z } from "zod";

export const profileSchemaValidation = z.object({
  currSavings: z.number(),
  goalSavings: z.number(),
  jobTitle: z.string(),
  age: z.number(),
  monthlyIncome: z.number(),
});
