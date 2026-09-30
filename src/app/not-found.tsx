import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bookingHref, external } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page introuvable — Rond de Carotte",
};

export default function NotFound() {
  return (
    <div className="lg:grid lg:min-h-svh lg:grid-cols-2">
      <main className="flex min-h-svh flex-col px-5 py-6 sm:px-8 lg:px-14">
        <Link href="/" aria-label="Rond de Carotte — accueil" className="self-center lg:self-start">
          <Image
            src="/logo.png"
            alt="Rond de Carotte — Café, Cuisine, Caviste"
            width={1000}
            height={353}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <div className="my-auto py-16">
          <p className="text-xs tracking-[0.25em] text-clay uppercase">Erreur 404</p>
          <h1 className="mt-5 font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-tight">
            Page
            <br />
            introuvable
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-bark">
            Cette page s&apos;est perdue quelque part entre la cuisine et la cave. Revenez à
            l&apos;accueil, on vous garde une place.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-full bg-olive py-4 pr-4 pl-8 text-cream transition-colors hover:bg-clay"
            >
              Retour à l&apos;accueil
              <span className="flex size-8 items-center justify-center rounded-full bg-cream/15 transition-transform duration-500 group-hover:-translate-x-0.5">
                ←
              </span>
            </Link>
            <a
              href={bookingHref}
              {...external(bookingHref)}
              className="rounded-full border border-olive/25 px-7 py-4 transition-colors hover:border-olive"
            >
              Réserver une table
            </a>
          </div>
        </div>
      </main>

      <div className="fixed inset-y-0 right-0 hidden w-1/2 p-3 lg:block">
        <div className="relative h-full overflow-hidden rounded-[18px] bg-sand">
          <Image src="/images/salle.jpg" alt="La salle du Rond de Carotte" fill sizes="50vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
