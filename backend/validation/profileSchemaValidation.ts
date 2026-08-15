import { z } from "zod";

export const profileSchemaValidation = z.object({
  jobTitle: z.string(),
  age: z.number(),
  monthlyIncome: z.number()
})
