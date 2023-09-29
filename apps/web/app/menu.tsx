"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "@/components/ui/button";

export function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-6">
        <NavigationMenuItem className="text-primary-foreground">
          <Link href="/docs">Log in</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href="/login"
          >
            Get started
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
