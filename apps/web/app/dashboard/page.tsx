import { requireUser } from "@/lib/auth-server";
import { makeErrorFromDF } from "@/lib/utils";
import { getProfile } from "profile";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Page() {
  const user = await requireUser();
  const profile = await getProfile({ userId: user.id });
  if (!profile.success) throw makeErrorFromDF(profile);

  return (
    <article>
      <nav className="space-x-3 py-3 w-full overflow-auto whitespace-nowrap">
        <Link
          className={buttonVariants({ variant: "default", size: "lg" })}
          href="/shop"
          target="_blank"
        >
          Shop
        </Link>

        <Link
          className={buttonVariants({ variant: "default", size: "lg" })}
          href="/dashboard/products"
        >
          List your products
        </Link>
      </nav>
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
