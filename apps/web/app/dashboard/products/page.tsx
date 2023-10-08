import Image from "next/image";
import { v4 as uuid } from "uuid";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fromSuccess } from "domain-functions";
import { getProductsByOwner } from "@packages/product";
import { requireUser } from "@/lib/auth-server";
import { Undo2Icon, PencilIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function Page() {
  const user = await requireUser();
  const products = await fromSuccess(getProductsByOwner)({
    ownerId: user.id,
  });

  return (
    <main>
      <nav className="flex items-center justify-between mb-3">
        <Link
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "mr-3",
          )}
          href="/dashboard"
        >
          <Undo2Icon className="h-min stroke-foreground/40" />
        </Link>
        <Link
          className={cn(buttonVariants({}))}
          href={`/dashboard/products/${uuid()}`}
        >
          <span className="lg:hidden">+</span>
          <span className="hidden lg:block">New product</span>
        </Link>
      </nav>
      <header className="mb-3">
        <h1 className="mb-1">Your products</h1>
        <aside className="text-muted-foreground">
          Wait a minute, do you really only have {products.length} product
          {products.length === 1 ? " " : "s "}
          so far?
        </aside>
      </header>
      <section>
        {products.map((product) => (
          <Card
            className="flex flex-col justify-between"
            key={product.productId}
          >
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription className="underline text-sm">
                @{user.firstName}
              </CardDescription>
              <CardDescription>{product.description}</CardDescription>
              <aside>
                {/* TODO: Load product type by product */}
                <Badge>to-do</Badge>
              </aside>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter className="text-left">
              <Link
                className={cn(buttonVariants({ variant: "default" }), "w-full")}
                href={`/dashboard/products/${product.productId}`}
              >
                <PencilIcon className="mr-2 h-4 w-4" /> Manage
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
