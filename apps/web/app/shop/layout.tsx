import type { Metadata } from "next";
import { getCompanyData } from "cms";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Logo } from "@/components/logo";
import { getUser } from "@/lib/auth-server";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const companyData = getCompanyData();

export const metadata: Metadata = {
  title: `${companyData.name} - Shop`,
  description: "Let your shirts do the talking",
};

export default async function ShopLayout({
  children,
}: React.PropsWithChildren) {
  const user = await getUser();

  return (
    <ClerkProvider>
      <main>
        <header className="p-6 md:px-12 bg-background text-foreground flex justify-between items-center border-border border-b">
          <Link href="/shop">
            <Logo className="text-foreground" />
          </Link>
          <div className="flex items-center space-x-2">
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/dashboard"
            >
              {user ? "Go to dashboard" : "Log in"}
            </Link>

            {user ? (
              <div data-testid="account-button-wrapper">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : null}
          </div>
        </header>
        <section className="p-6 md:p-12">{children}</section>
      </main>
    </ClerkProvider>
  );
}
