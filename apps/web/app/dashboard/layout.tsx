import Image from "next/image";
import type { Metadata } from "next";
import { getCompanyData } from "cms";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Menu } from "./menu";

const companyData = getCompanyData();

export const metadata: Metadata = {
  title: `${companyData.name} - Dashboard`,
  description: "Let your shirts do the talking",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ClerkProvider>
      <main>
        <header className="p-6 bg-secondary text-secondary-foreground flex justify-between items-center">
          <Image alt="logo" height={0} src="/logo.svg" width={75} />
          <div data-testid="account-button-wrapper">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <section className="p-6 space-y-3">
          <Menu />
          {children}
        </section>
      </main>
    </ClerkProvider>
  );
}
