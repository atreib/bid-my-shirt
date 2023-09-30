import type { Metadata } from "next";
import { getCompanyData } from "cms";
import { ClerkProvider } from "@clerk/nextjs";

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
      <main>{children}</main>
    </ClerkProvider>
  );
}
