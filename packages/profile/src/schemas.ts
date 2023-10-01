import {
  mysqlEnum,
  mysqlTable,
  bigint,
  uniqueIndex,
  varchar,
  double,
} from "drizzle-orm/mysql-core";

export const profiles = mysqlTable(
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
  (profilesTable) => ({
    userIdIndex: uniqueIndex("user_id_idx").on(profilesTable.id),
  }),
);

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
