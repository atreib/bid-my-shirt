import Image from "next/image";
import { ShirtIcon, HeartIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { data } from "./data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { OwnerMeasuresButtonWithDialog } from "./owner-measures-dialog";

type Props = {
  product: (typeof data)[number];
};

function ProductCard({ product }: Props) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription className="underline text-sm">
          @{product.owner.name}
        </CardDescription>
        <CardDescription>{product.description}</CardDescription>
        <aside>
          <Badge>{product.type}</Badge>
        </aside>
      </CardHeader>
      <CardContent>
        <aside className="mb-3">
          <CardDescription className="flex flex-row space-x-1 justify-end text-foreground">
            <OwnerMeasuresButtonWithDialog measures={product.owner} />
            <Button size="icon" variant="ghost">
              <HeartIcon
                className={cn(
                  "h-6 w-6",
                  product.liked === "yes" && "fill-foreground text-foreground",
                )}
              />
            </Button>
          </CardDescription>
        </aside>
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
          href={`/shop/${product.productId}`}
        >
          <ShirtIcon className="mr-2 h-4 w-4" /> Check it out
        </Link>
      </CardFooter>
    </Card>
  );
}

export { ProductCard };
