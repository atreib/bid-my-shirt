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
        <NavigationMenuItem>
          <Link href="/shop">Shop</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/dashboard">Log in</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/dashboard"
          >
            Get started
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
