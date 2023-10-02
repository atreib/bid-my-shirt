import { currentUser } from "@clerk/nextjs";

export async function getAuthUser() {
  const user = await currentUser();
  if (user === null) throw new Error("You must be authenticated");
  return user;
}
