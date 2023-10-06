import Image from "next/image";
import {
  ShirtIcon,
  HeartIcon,
  ShoppingCartIcon,
  RulerIcon,
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
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
          <CardDescription className="flex flex-row space-x-1 justify-end">
            <Button size="icon" variant="ghost">
              <RulerIcon className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="ghost">
              <HeartIcon
                className={cn(
                  "h-6 w-6",
                  product.liked === "yes" && "fill-foreground text-foreground",
                )}
              />
            </Button>
            <Button size="icon" variant="ghost">
              <ShoppingCartIcon className="h-6 w-6" />
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
        <Button className="w-full">
          <ShirtIcon className="mr-2 h-4 w-4" /> Check it out
        </Button>
      </CardFooter>
    </Card>
  );
}

export { ProductCard };
