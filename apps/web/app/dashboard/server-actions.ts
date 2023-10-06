"use server";

import { revalidatePath } from "next/cache";
import { upsertProfile } from "profile";
import { mdf, sequence } from "domain-functions";

const upserProfileAndRevalidate = sequence(
  upsertProfile,
  mdf()(() => revalidatePath("/dashboard")),
);

export { upserProfileAndRevalidate };
