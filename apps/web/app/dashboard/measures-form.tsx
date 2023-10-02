/* eslint-disable @typescript-eslint/no-misused-promises -- eslint vs server action */

import { Button } from "@/components/ui/button";
import type { Profile } from "profile";
import { insertProfile } from "profile";
import { revalidatePath } from "next/cache";

export default function MeasuresForm({
  profile,
  userId,
}: {
  profile?: Profile;
  userId: Profile["userId"];
}) {
  async function handleProfileCreation(formData: FormData) {
    "use server";

    /* TODO: Validate form data with zod */
    /* const parsed = schema.parse({
      id: formData.get('id'),
    }) */

    /* TODO: Error labels */
    /* TODO: Loading state */
    /* TODO: Success toast */
    /* TODO: Auto-collapse on success save */

    await insertProfile({
      userId,
      weightInKilos: Number(formData.get("weight")),
      heightInCentimeters: Number(formData.get("height")),
      bodyType: formData.get("bodyType") as never,
    });

    revalidatePath("/dashboard");
  }

  return (
    <form action={handleProfileCreation} className="space-y-3">
      <p className="text-muted-foreground">
        Providing your info will help other people to shop your clothes.
      </p>
      <div>
        <label htmlFor="height">Weight (kgs)</label>
        <input
          defaultValue={profile?.weightInKilos ?? undefined}
          id="weight"
          name="weight"
          type="number"
        />
      </div>
      <div>
        <label htmlFor="height">Height (cm)</label>
        <input
          defaultValue={profile?.heightInCentimeters ?? undefined}
          id="heigh"
          name="height"
          type="number"
        />
      </div>
      <div>
        <label htmlFor="height">Body type</label>
        <input
          defaultValue={profile?.bodyType ?? undefined}
          id="bodyType"
          name="bodyType"
          type="text"
        />
      </div>
      <footer className="text-right">
        <Button type="submit" variant="outline">
          Save your measures
        </Button>
      </footer>
    </form>
  );
}
