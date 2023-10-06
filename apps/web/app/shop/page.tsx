import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { ProductCard } from "./product-card";
import { data } from "./data";

export default function Page() {
  return (
    <main>
      <nav className="flex justify-end items-center mb-6">
        <Button size="icon" variant="link">
          <FilterIcon className="h-8 w-8 text-muted-foreground" />
        </Button>
      </nav>
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {data.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </section>
    </main>
  );
}
