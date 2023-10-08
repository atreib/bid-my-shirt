import { ProductCard } from "./product-card";
import { data } from "./data";
import { getUser } from "@/lib/auth-server";

/* TODO: Server-side pagination (save state on url) */
/* TODO: Server-side filter (save state on url) */

export default async function Page() {
  const user = await getUser();

  return (
    <main>
      <header className="mb-3 lg:mb-6">
        <h1>Shop</h1>
      </header>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {data.map((product) => (
          <ProductCard key={product.productId} product={product} user={user} />
        ))}
      </section>
    </main>
  );
}
