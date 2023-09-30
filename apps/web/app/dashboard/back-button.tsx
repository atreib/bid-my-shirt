"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BackButton() {
  const pathname = usePathname();

  return pathname !== "/dashboard" ? (
    <Link
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "mr-3")}
      href="/dashboard"
    >
      &nbsp;
      <ChevronLeft className="h-min stroke-foreground/40" />
    </Link>
  ) : null;
}
