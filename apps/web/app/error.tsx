"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/* TODO: Create a layout for the error page */
export default function Error({ error, reset }: Props) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console -- only debug
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      <footer className="flex space-x-3">
        <Button onClick={() => reset()} type="button">
          Reload
        </Button>
        <Link
          className={cn(buttonVariants({ variant: "secondary" }), "w-max")}
          href="/"
        >
          Go home
        </Link>
      </footer>
    </div>
  );
}
