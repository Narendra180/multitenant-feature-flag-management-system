ALTER TABLE "feature_flags" DROP CONSTRAINT "fk_org_id";
--> statement-breakpoint
ALTER TABLE "feature_flags" ALTER COLUMN "is_enabled" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "feature_flags" ADD COLUMN "key" varchar(500) NOT NULL;--> statement-breakpoint
ALTER TABLE "feature_flags" ADD CONSTRAINT "fk_org_id" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feature_flags" ADD CONSTRAINT "uq_feature_key_org_id" UNIQUE("key","organization_id");