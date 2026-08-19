import { relations } from "drizzle-orm";
import { user } from "./auth-schema";
import { pgTable, text, integer, numeric, smallint } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  currentSavings: numeric("current_savings", {
    precision: 10,
    scale: 2,
  }).notNull(),
  goalSavings: numeric("goal_savings", {
    precision: 10,
    scale: 2,
  }).notNull(),
  jobTitle: text("job_title").notNull(),
  age: smallint("age").notNull(),
  monthlyIncome: numeric("monthly_income", {
    precision: 10,
    scale: 2,
  }).notNull(),
});

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}));
