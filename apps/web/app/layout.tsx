import "./globals.css";
import type { Metadata } from "next";
import { getCompanyData } from "cms";

const companyData = getCompanyData();

export const metadata: Metadata = {
  title: companyData.name,
  description: "Let your shirts do the talking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
