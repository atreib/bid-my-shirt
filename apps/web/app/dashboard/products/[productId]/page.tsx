import { requireUser } from "@/lib/auth-server";
import { getProductTypes } from "@packages/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "./form-submit-button";
import { fromSuccess } from "domain-functions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProduct } from "./server-actions";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Undo2Icon } from "lucide-react";

/* TODO: Success feedback */
/* TODO: Error handling */

type Props = {
  params: {
    productId: string;
  };
};

export default async function Page({ params }: Props) {
  const user = await requireUser();
  const productTypes = await fromSuccess(getProductTypes)();

  async function handleSubmit(formData: FormData) {
    "use server";

    const input = {
      productId: params.productId,
      ownerId: user.id,
      name: String(formData.get("title")?.valueOf()),
      description: String(formData.get("description")?.valueOf()),
      typeId: String(formData.get("productType")?.valueOf()),
    };
    await fromSuccess(createProduct)(input);

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  }

  return (
    <>
      <nav className="flex items-center justify-between mb-3">
        <Link
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "mr-3",
          )}
          href="/dashboard/products"
        >
          <Undo2Icon className="h-min stroke-foreground/40" />
        </Link>
      </nav>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- ServerActions vs ESLint */}
      <form action={handleSubmit} className="lg:flex lg:space-x-6">
        <div className="mb-3 lg:max-w-lg">
          <h1 className="mb-3">Add new product</h1>
          <p className="text-muted-foreground">
            List a new amazing product so people can place their bids!
          </p>
        </div>
        <main className="mb-6 grow text-destructive">
          TODO: Allow adding pics to product
        </main>
        <article className="grow">
          <section className="space-y-3 mb-3">
            <div>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                placeholder="The coolest name ever"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                className="min-h-[100px]"
                id="description"
                name="description"
                placeholder="Describe how amazing your product is"
              />
            </div>
            <div>
              <label htmlFor="productType">Type</label>
              <Select name="productType">
                <SelectTrigger>
                  <SelectValue placeholder="Choose a type" />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((productType) => (
                    <SelectItem
                      key={productType.typeId}
                      value={productType.typeId}
                    >
                      {productType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>
          <footer className="flex justify-end">
            <SubmitButton>Create product</SubmitButton>
          </footer>
        </article>
      </form>
    </>
  );
}
