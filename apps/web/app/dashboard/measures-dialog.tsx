"use client";

import * as React from "react";
import { RulerIcon, CheckCircleIcon, Loader2Icon } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";

export function MeasuresButtonWithDialog({
  profile,
  userId,
}: {
  profile?: Profile;
  userId: Profile["userId"];
}) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isFormLoading, setIsFormLoading] = React.useState(false);

  async function handleProfileCreation(formData: FormData) {
    const response = await upserProfileAndRevalidate({
      userId,
      weightInKilos: Number(formData.get("weight")),
      heightInCentimeters: Number(formData.get("height")),
      bodyType: formData.get("bodyType"),
    });

    setIsFormLoading(false);

    if (!response.success) {
      /* TODO: Handle errors */
      return;
    }

    setIsDialogOpen(false);
    toast({
      description: (
        <div className="flex space-x-3 items-center justify-start text-foreground/60">
          <CheckCircleIcon />
          <p className="font-semibold">Your measures have been saved</p>
        </div>
      ),
    });
  }

  return (
    <Dialog
      onOpenChange={(value) => setIsDialogOpen(value)}
      open={isDialogOpen}
    >
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <RulerIcon className="text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%] md:max-w-md">
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises -- RSC vs ESLint
          action={handleProfileCreation}
          className="space-y-3"
          id="measures-form"
          onSubmit={() => setIsFormLoading(true)}
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
              aria-disabled={isFormLoading}
              className="w-max"
              disabled={isFormLoading}
              form="measures-form"
              type="submit"
              variant="outline"
            >
              {isFormLoading ? (
                <Loader2Icon className="animate-spin h-6 w-6" />
              ) : (
                "Save your measures"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
