import { z } from "zod";

export const profileSchema = z.object({
  jobTitle: z.string(),
  age: z.number(),
  monthlyIncome: z.number()
})
