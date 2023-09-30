import Link from "next/link";
import { BackButton } from "./back-button";
import { buttonVariants } from "@/components/ui/button";

export function Menu() {
  return (
    <nav className="space-x-3 py-3 w-full overflow-auto whitespace-nowrap">
      <BackButton />

      <Link
        className={buttonVariants({ variant: "default", size: "lg" })}
        href="/shop"
        target="_blank"
      >
        Shop products
      </Link>

      <Link
        className={buttonVariants({ variant: "default", size: "lg" })}
        href="/dashboard/products"
      >
        List your products
      </Link>
    </nav>
  );
}
