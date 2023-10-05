import {
  mysqlEnum,
  mysqlTable,
  bigint,
  uniqueIndex,
  varchar,
  double,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const profilesTable = mysqlTable(
  "profiles",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    userId: varchar("user_id", { length: 36 }).unique().notNull(),
    weightInKilos: double("weight_in_kilos", { precision: 6, scale: 2 }),
    heightInCentimeters: double("height_in_centimeters", {
      precision: 6,
      scale: 2,
    }),
    bodyType: mysqlEnum("body_type", [
      "slender",
      "petite",
      "stout",
      "ample",
      "muscular",
    ]),
  },
  (profiles) => ({
    userIdIndex: uniqueIndex("user_id_idx").on(profiles.id),
  }),
);

export const newProfileSchema = createInsertSchema(profilesTable);
export type NewProfile = typeof profilesTable.$inferInsert;

export const profileSchema = createSelectSchema(profilesTable);
export type Profile = typeof profilesTable.$inferSelect;
