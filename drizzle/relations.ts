import { relations } from "drizzle-orm/relations";
import { user, account, session, profile, transaction } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	profiles: many(profile),
	transactions: many(transaction),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const profileRelations = relations(profile, ({one}) => ({
	user: one(user, {
		fields: [profile.userId],
		references: [user.id]
	}),
}));

export const transactionRelations = relations(transaction, ({one}) => ({
	user: one(user, {
		fields: [transaction.userId],
		references: [user.id]
	}),
}));