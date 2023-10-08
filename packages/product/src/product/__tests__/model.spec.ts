import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { v4 as uuid } from "uuid";
import { fromSuccess } from "domain-functions";
import { eq, inArray } from "drizzle-orm";
import {
  deleteProductById,
  getProductById,
  getProducts,
  upsertProduct,
} from "../model";
import { db } from "../../helpers";
import { productsTable } from "../../types";

const databaseGarbageIds = new Set<string>();

describe("Product Model Test Suite", () => {
  afterAll(async () => {
    await db()
      .delete(productsTable)
      .where(inArray(productsTable.productId, [...databaseGarbageIds]));
  });

  describe("getProductById", () => {
    const existingProduct = {
      productId: uuid(),
      ownerId: uuid(),
      name: "My amazing t-shirt",
      description: "Some cool t-shirt",
    };

    beforeAll(async () => {
      await db().insert(productsTable).values(existingProduct);
      databaseGarbageIds.add(existingProduct.productId);
    });

    it("Should find the product by id", async () => {
      const product = await fromSuccess(getProductById)({
        productId: existingProduct.productId,
      });
      expect(product).toEqual(existingProduct);
    });

    describe("When id does not exist", () => {
      it("Should return null", async () => {
        const product = await fromSuccess(getProductById)({
          productId: uuid(),
        });
        expect(product).toBe(undefined);
      });
    });
  });

  describe("upsertProduct", () => {
    const originalEntry = {
      productId: uuid(),
      ownerId: uuid(),
      name: "My amazing t-shirt",
      description: "Some cool t-shirt",
    };

    it("Should create a product", async () => {
      const response = await upsertProduct(originalEntry);
      databaseGarbageIds.add(originalEntry.productId);
      expect(response.success).toBe(true);
    });

    describe("When only the id is different and the rest is the same", () => {
      const similarEntry = {
        ...originalEntry,
        productId: uuid(),
      };

      it("Should insert", async () => {
        const response = await upsertProduct(similarEntry);
        databaseGarbageIds.add(similarEntry.productId);
        expect(response.success).toBe(true);
        const newEntry = await fromSuccess(getProductById)({
          productId: similarEntry.productId,
        });
        expect(newEntry).toEqual(similarEntry);
      });
    });

    describe("When id is the same", () => {
      const newNameEntry = {
        ...originalEntry,
        name: "Some new name to my t-shirt",
      };

      it("Should update", async () => {
        const response = await upsertProduct(newNameEntry);
        databaseGarbageIds.add(newNameEntry.productId);
        expect(response.success).toBe(true);
        const newEntry = await fromSuccess(getProductById)({
          productId: newNameEntry.productId,
        });
        expect(newEntry).toEqual({
          ...newNameEntry,
          productId: originalEntry.productId,
        });
      });
    });
  });

  describe("getProducts", () => {
    const shirt1 = {
      productId: uuid(),
      ownerId: uuid(),
      name: "T-shirt 1",
      description: "Some cool t-shirt",
    };

    const shirt2 = {
      productId: uuid(),
      ownerId: uuid(),
      name: "T-shirt 2",
      description: "Some cool t-shirt",
    };

    beforeAll(async () => {
      await db().insert(productsTable).values(shirt1);
      databaseGarbageIds.add(shirt1.productId);
      await db().insert(productsTable).values(shirt2);
      databaseGarbageIds.add(shirt2.productId);
    });

    it("Should return multiple products", async () => {
      const response = await fromSuccess(getProducts)();
      // tests run in parallel - may have other records as well
      expect(response.length).greaterThanOrEqual(2);
    });
  });

  describe("deleteProductById", () => {
    const product = {
      productId: uuid(),
      ownerId: uuid(),
      name: "T-shirt 1",
      description: "Some cool t-shirt",
    };

    it("Should delete existing product by id", async () => {
      const response = await deleteProductById({
        productId: product.productId,
      });
      expect(response.success).toBe(true);
      const existingRecord = await db()
        .select()
        .from(productsTable)
        .where(eq(productsTable.productId, product.productId));
      expect(existingRecord.length).toBe(0);
    });
  });
});
