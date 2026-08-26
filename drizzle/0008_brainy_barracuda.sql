CREATE INDEX "profile_userId_idx" ON "profile" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "transactions_userId_idx" ON "transactions" USING btree ("user_id");
