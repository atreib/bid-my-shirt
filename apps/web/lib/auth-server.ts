import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function requireUser() {
  const user = await currentUser();
  if (!user) return redirect("/");
  return user;
}

async function getUser() {
  return currentUser();
}

export { requireUser, getUser };
