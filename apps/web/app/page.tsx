import Link from "next/link";
import { getLandingPageContent } from "cms";
import { Menu } from "./menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

export default function Page(): JSX.Element {
  const content = getLandingPageContent("homepage");
  return (
    <main className="dark bg-background text-foreground">
      <header className="p-6 md:px-12 flex justify-between items-center">
        <Link href="/">
          <Logo className="text-foreground" />
        </Link>
        <Menu />
      </header>
      <section
        className="bg-cover bg-center bg-no-repeat text-black"
        /* Cant use URL as arbitrary value (bg-[...]) */
        style={{
          backgroundImage: `url(${content.hero.backgroundURL})`,
        }}
      >
        <div className="min-h-[calc(300px+30vh)] backdrop-blur-sm p-6 md:px-12 flex flex-col justify-center">
          <h1 className="mb-4">{content.title}</h1>
          <p className="text-2xl mb-4 ">{content.subtitle}</p>
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
      <section className="min-h-[calc(300px+30vh)] p-6 md:px-12">
        reasons with app preview
      </section>
      <section className="bg-secondary min-h-[calc(300px+30vh)] p-6 md:px-12">
        feedback
      </section>
      <footer className="min-h-[calc(300px+15vh)] p-6 md:px-12 ">footer</footer>
    </main>
  );
}
