import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

const host = process.env.DATABASE_HOST;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

function makeDBConnString(): string {
  return `mysql://${username}:${password}@${host}/db`;
}

function db() {
  const connection = connect({ host, username, password });
  return drizzle(connection);
}

export { db, makeDBConnString };
