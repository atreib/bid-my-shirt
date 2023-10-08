import { mdf } from "domain-functions";
import { eq } from "drizzle-orm";
import { db } from "../helpers";
import {
  newProductTypeSchema,
  productTypeSchema,
  productTypesTable,
} from "../types";

const upsertProductType = mdf(newProductTypeSchema)(async (productType) => {
  await db()
    .insert(productTypesTable)
    .values(productType)
    .onDuplicateKeyUpdate({ set: { name: productType.name } });
});

const getProductTypeById = mdf(productTypeSchema.pick({ typeId: true }))(
  async ({ typeId }) => {
    const productTypes = await db()
      .select()
      .from(productTypesTable)
      .where(eq(productTypesTable.typeId, typeId));
    return productTypes.at(0);
  },
);

export { upsertProductType, getProductTypeById };
