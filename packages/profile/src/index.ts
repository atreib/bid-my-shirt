import { getDB } from "./helpers";
import type { NewProfile } from "./schemas";
import { profiles } from "./schemas";

async function getProfiles(_: string) {
  const db = getDB();
  return db.select().from(profiles);
}

async function insertProfile(user: NewProfile) {
  const db = getDB();
  return db.insert(profiles).values(user);
}

export { getProfiles, insertProfile };
