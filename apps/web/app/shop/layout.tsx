import Image from "next/image";
import type { Metadata } from "next";
import { getCompanyData } from "cms";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

const companyData = getCompanyData();

export const metadata: Metadata = {
  title: `${companyData.name} - Shop`,
  description: "Let your shirts do the talking",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ClerkProvider>
      <main>
        <header className="p-6 bg-secondary text-secondary-foreground flex justify-between items-center">
          <Image alt="logo" height={0} src="/logo.svg" width={75} />
          <UserButton />
        </header>
        <section className="p-6">{children}</section>
      </main>
    </ClerkProvider>
  );
}
