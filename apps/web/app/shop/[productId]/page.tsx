import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { HeartIcon, Undo2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { bid, findProductById } from "./server-actions";
import { redirect } from "next/navigation";
import { OwnerMeasuresButtonWithDialog } from "../owner-measures-dialog";
import { requireUser } from "@/lib/auth-server";
import { SubmitButton } from "./form-submit-button";
import type { data } from "../data";

/* TODO: Success feedback */
/* TODO: Error handling */

type Props = {
  params: {
    productId: string;
  };
};

function Nav(props: {
  layout: "mobile" | "desktop";
  product: (typeof data)[number];
}) {
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
        <Button size="icon" variant="ghost">
          <HeartIcon
            className={cn(
              "h-6 w-6",
              props.product.liked === "yes" &&
                "fill-foreground text-foreground",
            )}
          />
        </Button>
      </aside>
    </nav>
  );
}

export default async function Page({ params }: Props) {
  const user = await requireUser();
  const product = findProductById(params.productId);
  if (!product) redirect("/shop");

  async function handleBid(formData: FormData) {
    "use server";

    await bid({
      userId: user.id,
      productId: params.productId,
      bid: Number(formData.get("bid")),
    });
  }

  return (
    <div className="lg:flex lg:space-x-6">
      <main className="mb-6 lg:max-w-md lg:border lg:border-border lg:p-6 lg:rounded lg:mb-0">
        <Nav layout="mobile" product={product} />
        <section className="mb-3">
          <AspectRatio ratio={16 / 9}>
            <Image
              alt="Image"
              className="rounded-md object-cover"
              fill
              loading="lazy"
              priority={false}
              quality={70}
              src="/bg.avif"
            />
          </AspectRatio>
        </section>
        <section>
          <aside className="mb-3 flex ">
            <Badge>{product.type}</Badge>
          </aside>
          <h1>{product.name}</h1>
          <p className="my-3 leading-tight text-muted-foreground">
            {product.description}
          </p>
          <h2 className="underline leading-tight text-muted-foreground text-sm">
            @{product.owner.name}
          </h2>
        </section>
      </main>
      <section className="grow">
        <Nav layout="desktop" product={product} />
        <header>
          <h2>Hey, make a bid!</h2>
          <p className=" my-3">
            Send to the owner how much you would pay for his product. Give him
            your best shot!
          </p>
        </header>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- ServerActions vs ESLint */}
        <form action={handleBid}>
          <label className="text-sm text-muted-foreground" htmlFor="bid">
            Fill your bid below:
          </label>
          <div className="flex items-center space-x-3 my-1">
            <h3>$</h3>
            <input className="lg:max-w-xs" id="bid" name="bid" type="number" />
            <SubmitButton>Bid</SubmitButton>
          </div>
        </form>
      </section>
    </div>
  );
}
