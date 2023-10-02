import { eq } from "drizzle-orm";
import { getDB } from "./helpers";
import type { NewProfile, Profile } from "./schemas";
import { profilesTable } from "./schemas";

async function getProfile(props: { userId: Profile["userId"] }) {
  const db = getDB();
  const users = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, props.userId));
  return users.at(0);
}

async function insertProfile(user: NewProfile) {
  const db = getDB();
  return db
    .insert(profilesTable)
    .values(user)
    .onDuplicateKeyUpdate({ set: user });
}

export { getProfile, insertProfile };
export type { Profile, NewProfile };
