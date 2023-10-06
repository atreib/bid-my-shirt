import { mdf } from "domain-functions";
import { eq } from "drizzle-orm";
import { db } from "./helpers";
import { newProfileSchema, profileSchema, profilesTable } from "./types";

const getProfile = mdf(profileSchema.pick({ userId: true }))(async (props) => {
  const users = await db()
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, props.userId));
  return users.at(0);
});

const upsertProfile = mdf(newProfileSchema)(async (user) => {
  await db()
    .insert(profilesTable)
    .values(user)
    .onDuplicateKeyUpdate({ set: user });
});

export { getProfile, upsertProfile };
