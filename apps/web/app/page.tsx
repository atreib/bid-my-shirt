import Link from "next/link";
import Image from "next/image";
import { getLandingPageContent } from "cms";
import { Menu } from "./menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Page(): JSX.Element {
  const content = getLandingPageContent("homepage");
  return (
    <main>
      <header className="p-6 bg-primary text-primary-foreground flex justify-between items-center">
        <div>
          {/* TODO: Create a logo */}
          <Image alt="logo" height={0} src="/logo.svg" width={75} />
        </div>

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
          <h1 className="text-primary mb-4">{content.title}</h1>
          <p className="text-2xl mb-4 bg-primary text-primary-foreground">
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
      <section className="bg-background min-h-[calc(300px+30vh)] p-6 text-foreground">
        reasons with app preview
      </section>
      <section className="bg-secondary min-h-[calc(300px+30vh)] p-6 text-secondary-foreground">
        feedback
      </section>
      <footer className="min-h-[calc(300px+15vh)] p-6 bg-primary text-primary-foreground">
        footer
      </footer>
    </main>
  );
}
