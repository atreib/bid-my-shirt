import Link from "next/link";
import { getLandingPageContent } from "cms";
import { Menu } from "./menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

export default function Page(): JSX.Element {
  const content = getLandingPageContent("homepage");
  return (
    <main>
      <header className="p-6 bg-slate-900 text-white flex justify-between items-center">
        <Logo />
        <Menu />
      </header>
      <section
        className="bg-cover bg-center bg-no-repeat"
        /* Cant use URL as arbitrary value (bg-[...]) */
        style={{
          backgroundImage: `url(${content.hero.backgroundURL})`,
        }}
      >
        <div className="min-h-[calc(300px+30vh)] backdrop-blur-sm p-6 flex flex-col justify-center">
          <h1 className="text-slate-900 mb-4">{content.title}</h1>
          <p className="text-2xl mb-4 bg-slate-900 text-white">
            {content.subtitle}
          </p>
          <Link
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-max",
            )}
            href="/dashboard"
          >
            Get started
          </Link>
        </div>
      </section>
      <section className="bg-slate-900 min-h-[calc(300px+30vh)] p-6 text-white">
        reasons with app preview
      </section>
      <section className="bg-slate-700 min-h-[calc(300px+30vh)] p-6 text-white">
        feedback
      </section>
      <footer className="min-h-[calc(300px+15vh)] p-6 bg-slate-900 text-white">
        footer
      </footer>
    </main>
  );
}
