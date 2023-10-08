import {
  mysqlTable,
  uniqueIndex,
  varchar,
  tinytext,
  primaryKey,
  index,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const productsTable = mysqlTable(
  "products",
  {
    productId: varchar("id", { length: 36 }).primaryKey().notNull(),
    ownerId: varchar("owner_id", { length: 36 }).unique().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: tinytext("description").notNull(),
  },
  (table) => ({
    ownerIdx: index("owner_idx").on(table.ownerId),
  }),
);

export const productSchema = createSelectSchema(productsTable);
export type Product = typeof productsTable.$inferSelect;
export const newProductSchema = createInsertSchema(productsTable);
export type NewProduct = typeof productsTable.$inferInsert;

export const picturesTable = mysqlTable(
  "pictures",
  {
    pictureId: varchar("id", { length: 36 }).primaryKey().notNull(),
    productId: varchar("product_id", { length: 36 }).notNull(),
    url: tinytext("url").notNull(),
  },
  (table) => ({
    productIdx: index("product_idx").on(table.productId),
  }),
);

export const pictureSchema = createSelectSchema(picturesTable);
export type Picture = typeof picturesTable.$inferSelect;
export const newPictureSchema = createInsertSchema(picturesTable);
export type NewPicture = typeof picturesTable.$inferInsert;

export const productTypesTable = mysqlTable(
  "types",
  {
    typeId: varchar("id", { length: 36 }).primaryKey().notNull(),
    name: varchar("name", { length: 50 }).notNull(),
  },
  (types) => ({
    nameIndex: uniqueIndex("name_idx").on(types.name),
  }),
);

export const productTypeSchema = createSelectSchema(productTypesTable);
export type ProductType = typeof productTypesTable.$inferSelect;
export const newProductTypeSchema = createInsertSchema(productTypesTable);
export type NewProductType = typeof productTypesTable.$inferInsert;

export const productsToTypesTable = mysqlTable(
  "products_to_types",
  {
    productId: varchar("product_id", { length: 36 }).notNull(),
    typeId: varchar("type_id", { length: 36 }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey(table.productId, table.typeId),
      productIdx: index("product_idx").on(table.productId),
      typeIdx: index("type_idx").on(table.typeId),
    };
  },
);

export const productsToTypesRelSchema =
  createSelectSchema(productsToTypesTable);
export type ProductsToTypes = typeof productsToTypesTable.$inferSelect;
export const newProductsToTypesRelSchema =
  createInsertSchema(productsToTypesTable);
export type NewProductsToTypes = typeof productsToTypesTable.$inferInsert;

export const productsRelations = relations(productsTable, ({ many }) => ({
  types: many(productsToTypesTable),
  pictures: many(picturesTable),
}));

export const productTypesRelations = relations(
  productTypesTable,
  ({ many }) => ({
    products: many(productsToTypesTable),
  }),
);

export const productsToTypesRelations = relations(
  productsToTypesTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [productsToTypesTable.productId],
      references: [productsTable.productId],
    }),
    type: one(productTypesTable, {
      fields: [productsToTypesTable.typeId],
      references: [productTypesTable.typeId],
    }),
  }),
);
