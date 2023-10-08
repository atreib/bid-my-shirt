import { mdf } from "domain-functions";
import { eq } from "drizzle-orm";
import { db } from "../helpers";
import { newPictureSchema, picturesTable, pictureSchema } from "../types";

const upsertPicture = mdf(newPictureSchema)(async (picture) => {
  await db()
    .insert(picturesTable)
    .values(picture)
    .onDuplicateKeyUpdate({ set: picture });
});

const getPicturesByProduct = mdf(pictureSchema.pick({ productId: true }))(
  async ({ productId }) => {
    return db()
      .select()
      .from(picturesTable)
      .where(eq(picturesTable.productId, productId));
  },
);

const deletePictureById = mdf(pictureSchema.pick({ pictureId: true }))(async ({
  pictureId,
}) => {
  return db()
    .delete(picturesTable)
    .where(eq(picturesTable.pictureId, pictureId));
});

const deletePicturesByProduct = mdf(pictureSchema.pick({ productId: true }))(
  async ({ productId }) => {
    return db()
      .delete(picturesTable)
      .where(eq(picturesTable.productId, productId));
  },
);

export {
  upsertPicture,
  getPicturesByProduct,
  deletePictureById,
  deletePicturesByProduct,
};
