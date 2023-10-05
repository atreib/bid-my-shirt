import "dotenv/config";
import type { Config } from "drizzle-kit";
import { makeDBConnString } from "./src/helpers";

const connectionString = makeDBConnString();

export default {
  schema: "./src/types.ts",
  out: "./db/migrations",
  driver: "mysql2",
  dbCredentials: { connectionString },
} satisfies Config;
