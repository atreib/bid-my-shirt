import type { Metadata } from "next";
import { getCompanyData } from "cms";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { requireUser } from "@/lib/auth-server";
import { getProfile } from "profile";
import { MeasuresButtonWithDialog } from "./measures-dialog";
import { makeErrorFromDF } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

const companyData = getCompanyData();

export const metadata: Metadata = {
  title: `${companyData.name} - Dashboard`,
  description: "Let your shirts do the talking",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const profile = await getProfile({ userId: user.id });
  if (!profile.success) throw makeErrorFromDF(profile);

  return (
    <>
      <ClerkProvider>
        <main>
          <header className="p-6 md:px-12 bg-background text-foreground flex justify-between items-center border-border border-b">
            <Link href="/dashboard">
              <Logo className="text-foreground" />
            </Link>
            <div className="flex items-center space-x-4">
              <MeasuresButtonWithDialog
                profile={profile.data}
                userId={user.id}
              />
              <div data-testid="account-button-wrapper">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </header>
          <section className="p-6 md:p-12 space-y-3">{children}</section>
        </main>
      </ClerkProvider>
      <Toaster />
    </>
  );
}
