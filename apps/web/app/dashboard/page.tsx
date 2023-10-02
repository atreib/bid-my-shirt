import { getAuthUser } from "@/lib/auth-server";
import { getProfile } from "profile";

export default async function Page() {
  const user = await getAuthUser();
  const profile = await getProfile({ userId: user.id });

  return (
    <article>
      <h1>Bids (To-do)</h1>
      <section>
        <h2>
          While we don&apos;t have the bids, just show the measures for debug :D
        </h2>
        <p>Body type: {profile?.bodyType}</p>
        <p>Height: {profile?.heightInCentimeters}</p>
        <p>Weight: {profile?.weightInKilos}</p>
      </section>
    </article>
  );
}
