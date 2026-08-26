DROP INDEX "transacctions_userId_idx";--> statement-breakpoint
CREATE INDEX "transactions_userId_idx" ON "transactions" USING btree ("user_id");