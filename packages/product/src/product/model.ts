import { mdf } from "domain-functions";
import { eq } from "drizzle-orm";
import { db } from "../helpers";
import { newProductSchema, productSchema, productsTable } from "../types";

const upsertProduct = mdf(newProductSchema)(async (product) => {
  await db()
    .insert(productsTable)
    .values(product)
    .onDuplicateKeyUpdate({ set: product });
});

const getProductById = mdf(productSchema.pick({ productId: true }))(async ({
  productId,
}) => {
  const products = await db()
    .select()
    .from(productsTable)
    .where(eq(productsTable.productId, productId));
  return products.at(0);
});

const getProducts = mdf()(async () => {
  return db().select().from(productsTable);
});

const deleteProductById = mdf(productSchema.pick({ productId: true }))(async ({
  productId,
}) => {
  return db()
    .delete(productsTable)
    .where(eq(productsTable.productId, productId));
});

export { upsertProduct, getProductById, getProducts, deleteProductById };
