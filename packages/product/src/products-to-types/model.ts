import { mdf } from "domain-functions";
import { and, eq } from "drizzle-orm";
import { db } from "../helpers";
import {
  productsToTypesTable,
  newProductsToTypesRelSchema,
  productsToTypesRelSchema,
} from "../types";

const addTypeToProduct = mdf(newProductsToTypesRelSchema)(async (rel) => {
  await db().insert(productsToTypesTable).values(rel);
});

const removeTypeFromProduct = mdf(
  productsToTypesRelSchema.pick({
    productId: true,
    typeId: true,
  }),
)(async ({ productId, typeId }) => {
  const condition = and(
    eq(productsToTypesTable.productId, productId),
    eq(productsToTypesTable.typeId, typeId),
  );
  return db().delete(productsToTypesTable).where(condition);
});

export { addTypeToProduct, removeTypeFromProduct };
