import type { Metadata } from "next";
import { getCompanyData } from "cms";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Menu } from "./menu";
import { requireUser } from "@/lib/auth-server";
import { getProfile } from "profile";
import { MeasuresButtonWithDialog } from "./measures-dialog";
import { makeErrorFromDF } from "@/lib/utils";
import { Logo } from "@/components/logo";

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
    <ClerkProvider>
      <main>
        <header className="p-6 bg-secondary text-secondary-foreground flex justify-between items-center">
          <Logo className="text-black" />
          <div className="flex items-center space-x-4">
            <MeasuresButtonWithDialog profile={profile.data} userId={user.id} />
            <div data-testid="account-button-wrapper">
              <UserButton afterSignOutUrl="/" />
            </div>
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
