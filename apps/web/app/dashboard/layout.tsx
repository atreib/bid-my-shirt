import Image from "next/image";
import type { Metadata } from "next";
import { getCompanyData } from "cms";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Menu } from "./menu";
import { requireUser } from "@/lib/auth-server";
import { getProfile } from "profile";
import MeasuresForm from "./measures-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { makeErrorFromDF } from "@/lib/utils";

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
          <Image alt="logo" height={0} src="/logo.svg" width={75} />
          <div data-testid="account-button-wrapper">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <section className="p-6 space-y-3">
          <div className="bg-secondary px-3 rounded shadow">
            <Accordion collapsible type="single">
              <AccordionItem className="border-b-0" value="measures">
                <AccordionTrigger className="!no-underline text-base text-secondary-foreground font-normal">
                  Your measures
                </AccordionTrigger>
                <AccordionContent>
                  <MeasuresForm profile={profile.data} userId={user.id} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Menu />
          {children}
        </section>
      </main>
    </ClerkProvider>
  );
}
