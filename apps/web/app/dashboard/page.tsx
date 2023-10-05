import { requireUser } from "@/lib/auth-server";
import { makeErrorFromDF } from "@/lib/utils";
import { getProfile } from "profile";

export default async function Page() {
  const user = await requireUser();
  const profile = await getProfile({ userId: user.id });
  if (!profile.success) throw makeErrorFromDF(profile);

  return (
    <article>
      <h1>Bids (To-do)</h1>
      <section>
        <p className="my-3">
          While we don&apos;t have the bids, just show the measures to debug 🙂
        </p>
        <p>Body type: {profile.data?.bodyType}</p>
        <p>Height: {profile.data?.heightInCentimeters}</p>
        <p>Weight: {profile.data?.weightInKilos}</p>
      </section>
    </article>
  );
}
