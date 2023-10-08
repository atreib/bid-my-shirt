"use client";

import * as React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SubmitButton({ children }: React.PropsWithChildren) {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} disabled={pending} type="submit">
      {pending ? <Loader2Icon className="w-6 h-6 animate-spin" /> : children}
    </Button>
  );
}
