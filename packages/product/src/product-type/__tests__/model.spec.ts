import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { v4 as uuid } from "uuid";
import { fromSuccess } from "domain-functions";
import { inArray } from "drizzle-orm";
import { getProductTypeById, upsertProductType } from "../model";
import { db } from "../../helpers";
import { productTypesTable } from "../../types";

const databaseGarbageIds = new Set<string>();

describe("Product Type Model Test Suite", () => {
  afterAll(async () => {
    await db()
      .delete(productTypesTable)
      .where(inArray(productTypesTable.typeId, [...databaseGarbageIds]));
  });

  describe("getProductTypeById", () => {
    const existingProductType = {
      typeId: uuid(),
      name: uuid(),
    };

    beforeAll(async () => {
      await db().insert(productTypesTable).values(existingProductType);
      databaseGarbageIds.add(existingProductType.typeId);
    });

    it("Should find the product type by id", async () => {
      const productType = await fromSuccess(getProductTypeById)({
        typeId: existingProductType.typeId,
      });
      expect(productType).toEqual(existingProductType);
    });

    describe("When id does not exist", () => {
      it("Should return null", async () => {
        const productType = await fromSuccess(getProductTypeById)({
          typeId: uuid(),
        });

        expect(productType).toBe(undefined);
      });
    });
  });

  describe("upsertProductType", () => {
    const originalEntry = {
      typeId: uuid(),
      name: uuid(),
    };

    it("Should create a product type", async () => {
      const response = await upsertProductType(originalEntry);
      databaseGarbageIds.add(originalEntry.typeId);
      expect(response.success).toBe(true);
    });

    describe("When only id is different", () => {
      const duplicatedLabelEntry = {
        ...originalEntry,
        typeId: uuid(),
      };

      it("Should do nothing", async () => {
        const response = await upsertProductType(duplicatedLabelEntry);
        databaseGarbageIds.add(duplicatedLabelEntry.typeId);
        expect(response.success).toBe(true);
        const newEntry = await fromSuccess(getProductTypeById)({
          typeId: duplicatedLabelEntry.typeId,
        });
        expect(newEntry).toEqual(undefined);
        const existingEntry = await fromSuccess(getProductTypeById)({
          typeId: originalEntry.typeId,
        });
        expect(existingEntry).toEqual(originalEntry);
      });
    });

    describe("When only name is different", () => {
      const newNameEntry = {
        ...originalEntry,
        name: uuid(),
      };

      it("Should update name", async () => {
        const response = await upsertProductType(newNameEntry);
        databaseGarbageIds.add(newNameEntry.typeId);
        expect(response.success).toBe(true);
        const newEntry = await fromSuccess(getProductTypeById)({
          typeId: newNameEntry.typeId,
        });
        expect(newEntry).toEqual({
          typeId: originalEntry.typeId,
          name: newNameEntry.name,
        });
      });
    });
  });
});
