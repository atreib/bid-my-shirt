import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { v4 as uuid } from "uuid";
import { eq, inArray } from "drizzle-orm";
import { addTypeToProduct, removeTypeFromProduct } from "../model";
import { db } from "../../helpers";
import { productsToTypesTable } from "../../types";

const databaseGarbageIds = new Set<string>();

describe("Product Type Model Test Suite", () => {
  afterAll(async () => {
    await db()
      .delete(productsToTypesTable)
      .where(inArray(productsToTypesTable.productId, [...databaseGarbageIds]));
  });

  describe("addTypeToProduct", () => {
    it("Should be able to add multiple types to the multiple products", async () => {
      const productA = uuid();
      databaseGarbageIds.add(productA);
      const productB = uuid();
      databaseGarbageIds.add(productB);
      const typeA = uuid();
      const typeB = uuid();

      const response1 = await addTypeToProduct({
        productId: productA,
        typeId: typeA,
      });
      expect(response1.success).toBe(true);

      const response2 = await addTypeToProduct({
        productId: productA,
        typeId: typeB,
      });
      expect(response2.success).toBe(true);

      const response3 = await addTypeToProduct({
        productId: productB,
        typeId: typeB,
      });
      expect(response3.success).toBe(true);

      const productATypes = await db()
        .select()
        .from(productsToTypesTable)
        .where(eq(productsToTypesTable.productId, productA));
      expect(productATypes).toEqual(
        expect.arrayContaining([
          {
            productId: productA,
            typeId: typeA,
          },
          {
            productId: productA,
            typeId: typeB,
          },
        ]),
      );

      const productBTypes = await db()
        .select()
        .from(productsToTypesTable)
        .where(eq(productsToTypesTable.productId, productB));
      expect(productBTypes).toEqual([
        {
          productId: productB,
          typeId: typeB,
        },
      ]);
    });
  });

  describe("removeTypeFromProduct", () => {
    const productA = uuid();
    databaseGarbageIds.add(productA);
    const typeA = uuid();
    const typeB = uuid();

    beforeAll(async () => {
      await db().insert(productsToTypesTable).values({
        productId: productA,
        typeId: typeA,
      });

      await db().insert(productsToTypesTable).values({
        productId: productA,
        typeId: typeB,
      });
    });

    it("Should be able to remove a type from a product", async () => {
      const response = await removeTypeFromProduct({
        productId: productA,
        typeId: typeA,
      });
      expect(response.success).toBe(true);

      const productATypes = await db()
        .select()
        .from(productsToTypesTable)
        .where(eq(productsToTypesTable.productId, productA));
      expect(productATypes).toEqual([
        {
          productId: productA,
          typeId: typeB,
        },
      ]);
    });
  });
});
