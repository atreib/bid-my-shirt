/* eslint-disable no-console -- migration runner */

import "dotenv/config";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import { db } from "../../src/helpers";

migrate(db(), { migrationsFolder: "./db/migrations" })
  .then(() => {
    console.log("\n\n🚢 Migration completed successfully.");
  })
  .catch((err) => {
    console.error("\n\n❌ Migration failed!", err);
  });
