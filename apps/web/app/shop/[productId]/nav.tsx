import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { HeartIcon, Undo2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { OwnerMeasuresButtonWithDialog } from "../owner-measures-dialog";
import type { data } from "../data";
import type { User } from "@clerk/backend";

type Props = {
  layout: "mobile" | "desktop";
  product: (typeof data)[number];
  user: User | null;
};

function Nav(props: Props) {
  return (
    <nav
      className={cn(
        props.layout === "mobile" ? "flex lg:hidden" : "hidden lg:flex",
        "justify-between mb-3",
      )}
    >
      <Link
        className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
        href="/shop"
      >
        <Undo2Icon className="h-6 w-6" />
      </Link>
      <aside className="flex justify-end">
        <OwnerMeasuresButtonWithDialog measures={props.product.owner} />
        {props.user ? (
          <Button size="icon" variant="ghost">
            <HeartIcon
              className={cn(
                "h-6 w-6",
                props.product.liked === "yes" &&
                  "fill-foreground text-foreground",
              )}
            />
          </Button>
        ) : null}
      </aside>
    </nav>
  );
}

export { Nav };
