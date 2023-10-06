"use client";

import * as React from "react";
import { Ruler } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Profile } from "profile/src/types";
import { Button } from "@/components/ui/button";
import { upserProfileAndRevalidate } from "./server-actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function MeasuresButtonWithDialog({
  profile,
  userId,
}: {
  profile?: Profile;
  userId: Profile["userId"];
}) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { pending } = useFormStatus();

  async function handleProfileCreation(formData: FormData) {
    /* TODO: Success toast */

    const response = await upserProfileAndRevalidate({
      userId,
      weightInKilos: Number(formData.get("weight")),
      heightInCentimeters: Number(formData.get("height")),
      bodyType: formData.get("bodyType"),
    });

    if (!response.success) {
      /* TODO: Handle errors */
      return;
    }

    setIsDialogOpen(false);
  }

  return (
    <Dialog
      onOpenChange={(value) => setIsDialogOpen(value)}
      open={isDialogOpen}
    >
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Ruler className="text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%] md:max-w-md">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises -- RSC vs ESLint
          action={handleProfileCreation}
          className="space-y-3"
          id="measures-form"
        >
          <DialogHeader>
            <DialogTitle className="text-left">Your measures</DialogTitle>
            <DialogDescription className="text-justify py-3 text-base">
              Providing your info will help other people to shop your clothes.
            </DialogDescription>
          </DialogHeader>
          <div>
            <label htmlFor="weight">Weight (kgs)</label>
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
            <label htmlFor="bodyType">Body type</label>
            <input
              defaultValue={profile?.bodyType ?? undefined}
              id="bodyType"
              name="bodyType"
              type="text"
            />
          </div>
          <DialogFooter className="flex items-end pt-6">
            <Button
              aria-disabled={pending}
              className="w-max"
              disabled={pending}
              form="measures-form"
              type="submit"
              variant="outline"
            >
              {pending ? "Loading..." : "Save your measures"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
