import { pgEnum, pgTable, text, uuid, numeric, varchar, date, index, time, } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";

export const transactionTypeEnum = pgEnum('transactionType', ['income', 'expense', 'saving'])

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  transactionType: transactionTypeEnum("transaction_type").notNull(),
  category: text("category").notNull(),
  amount: numeric("amount", {
    precision: 10,
    scale: 2,
  }).notNull(),
  description: varchar("description", { length: 256 }),
  date: date("date").notNull(),
  time: time("time")
}, (table) => [index("transactions_userId_idx").on(table.userId)],
)



