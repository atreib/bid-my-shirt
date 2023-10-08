import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { findProductById } from "./server-actions";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth-server";
import { Bid } from "./bid";
import { Nav } from "./nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

/* TODO: Success feedback */
/* TODO: Error handling */

type Props = {
  params: {
    productId: string;
  };
};

export default async function Page({ params }: Props) {
  const user = await getUser();
  const product = findProductById(params.productId);
  if (!product) redirect("/shop");

  return (
    <div className="lg:flex lg:space-x-12">
      <main className="mb-6 grow lg:max-w-lg lg:border lg:border-border lg:p-6 lg:rounded lg:mb-0">
        <Nav layout="mobile" product={product} user={user} />
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
        <Nav layout="desktop" product={product} user={user} />
        {user ? <Bid productId={params.productId} user={user} /> : null}

        <article className="dark text-center p-6 rounded-lg bg-background text-foreground space-y-6 py-12">
          <h1 className="">Do you like what you see? 😮‍💨</h1>
          <h2 className="">Sign up now and place your bid!</h2>
          <h3 className="">It won&apos;t take a minute </h3>
          <Link
            className={cn(
              buttonVariants({ size: "lg", variant: "default" }),
              "my-6",
            )}
            href="/dashboard"
          >
            Get started
          </Link>
        </article>
      </section>
    </div>
  );
}
