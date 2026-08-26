import { relations } from "drizzle-orm";
import { user } from "./auth-schema";
import { pgTable, text, uuid, numeric, smallint, index } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: uuid("id").primaryKey().defaultRandom(),
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
  monthlyExpenses: numeric("monthly_expenses", {
    precision: 10,
    scale: 2,
  }),
  monthlyBalance: numeric("monthly_balance", {
    precision: 10,
    scale: 2,
  })
}, (table) => [index("profile_userId_idx").on(table.userId)],
);


export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, {
    fields: [profile.userId],
    references: [user.id],
  }),
}));
