import "dotenv/config";
import * as ORMModule from "drizzle-orm/planetscale-serverless";
import * as DBConnectionModule from "@planetscale/database";
import { vi, describe, it, expect } from "vitest";
import { makeDBConnString, db } from "../helpers";

vi.mock("drizzle-orm/planetscale-serverless", () => ({
  drizzle: vi.fn().mockReturnValue({ db: "mock" } as never),
}));

vi.mock("@planetscale/database", () => ({
  connect: vi.fn().mockReturnValue({ conn: "mock" } as never),
}));

describe("makeDBConnString", () => {
  it("Should return conn string based on env", () => {
    const result = makeDBConnString();
    expect(result).toBe(
      `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/db`,
    );
  });
});

describe("db", () => {
  it("Should return DB instance based on env", () => {
    const spyConnect = vi.spyOn(DBConnectionModule, "connect");
    const spyDrizzle = vi.spyOn(ORMModule, "drizzle");

    const result = db();
    expect(spyConnect).toHaveBeenCalledWith({
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    });
    expect(spyDrizzle).toHaveBeenCalledWith({ conn: "mock" });
    expect(result).toEqual({ db: "mock" });
  });
});
