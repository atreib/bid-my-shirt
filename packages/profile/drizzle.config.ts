import "dotenv/config";
import type { Config } from "drizzle-kit";
import { getConnString } from "./src/helpers";

const connectionString = getConnString();

export default {
  schema: "./src/schemas.ts",
  out: "./db/migrations",
  driver: "mysql2",
  dbCredentials: { connectionString },
} satisfies Config;
