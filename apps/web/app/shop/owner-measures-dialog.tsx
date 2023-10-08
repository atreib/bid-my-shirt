import * as React from "react";
import { RulerIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Profile } from "profile/src/types";
import { Button } from "@/components/ui/button";

type Props = {
  measures: Pick<Profile, "bodyType" | "heightInCentimeters" | "weightInKilos">;
};

export function OwnerMeasuresButtonWithDialog({ measures }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <RulerIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%] md:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left">Owner measures</DialogTitle>
          <DialogDescription className="text-justify py-3 text-base">
            These are the owner&apos;s measures. Use it as a guideline to know
            if it will fit you.
          </DialogDescription>
        </DialogHeader>
        <div>
          <label htmlFor="weight">Weight (kgs)</label>
          <input
            defaultValue={measures.weightInKilos ?? undefined}
            disabled
            id="weight"
            name="weight"
            readOnly
            type="number"
          />
        </div>
        <div>
          <label htmlFor="height">Height (cm)</label>
          <input
            defaultValue={measures.heightInCentimeters ?? undefined}
            disabled
            id="heigh"
            name="height"
            readOnly
            type="number"
          />
        </div>
        <div>
          <label htmlFor="bodyType">Body type</label>
          <input
            defaultValue={measures.bodyType ?? undefined}
            disabled
            id="bodyType"
            name="bodyType"
            readOnly
            type="text"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
