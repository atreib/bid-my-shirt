"use server";

import {
  upsertProduct,
  newProductSchema,
  productTypeSchema,
  addTypeToProduct,
} from "@packages/product";
import { pipe, mdf, all } from "domain-functions";

const createProduct = pipe(
  mdf(
    newProductSchema
      .pick({
        productId: true,
        ownerId: true,
        name: true,
        description: true,
      })
      .merge(productTypeSchema.pick({ typeId: true })),
  )((props) => props),
  all(upsertProduct, addTypeToProduct),
);

export { createProduct };
