import BottomBar from "@/components/BottomBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Image from "next/image";
import ImagePanel, { InlinePhoto } from "@/components/ImagePanel";
import Reveal, { SplitTitle } from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import {
  bookingHref,
  cartes,
  coffeeMenu,
  external,
  hours,
  info,
  annualClosure,
  services,
} from "@/lib/content";

const eyebrow = "text-xs tracking-[0.25em] text-clay uppercase";
const title = "font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-tight";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <ImagePanel />
      <BottomBar />

      <main className="px-5 sm:px-8 lg:w-1/2 lg:px-14">
        <Hero />

        {/* La maison */}
        <section id="maison" data-panel="maison" className="py-10 lg:py-14">
          <Reveal>
            <p className={eyebrow}>La maison</p>
          </Reveal>
          <SplitTitle lines={["Restaurant", "& cave à vin"]} className={`${title} mt-5`} />
          <Reveal delay={0.2} className="mt-8 max-w-lg space-y-5 text-lg leading-relaxed text-bark">
            <p>
              Au cœur de Saint-Gervais, on s&apos;installe ici comme chez des amis, entre la cuisine
              ouverte et les étagères de la cave.
            </p>
            <p>
              On y vient pour un brunch qui s&apos;étire, un déjeuner de saison, un café l&apos;après-midi
              ou une bonne bouteille.
            </p>
          </Reveal>
          <InlinePhoto panel="maison" className="mt-12" />
        </section>

        {/* La carte */}
        <section id="carte" data-panel="carte" className="py-10 lg:py-14">
          <Reveal>
            <p className={eyebrow}>À table</p>
          </Reveal>
          <SplitTitle lines={["Nos cartes"]} className={`${title} mt-5 mb-10`} />
          <Reveal delay={0.15}>
            <ul className="border-t border-olive/15">
              {cartes.map((c) => (
                <li key={c.id} className="border-b border-olive/15">
                  {c.pdf ? (
                    <a
                      href={c.pdf}
                      {...external(c.pdf)}
                      className="group flex items-center justify-between gap-6 py-7"
                    >
                      <span>
                        <span className="block font-serif text-4xl transition-colors group-hover:text-clay sm:text-5xl">
                          {c.label}
                        </span>
                        <span className="mt-1 block text-sm text-bark">{c.when}</span>
                      </span>
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-olive/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-olive group-hover:bg-olive group-hover:text-cream">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-6 py-7 text-olive/50">
                      <span>
                        <span className="block font-serif text-4xl sm:text-5xl">{c.label}</span>
                        <span className="mt-1 block text-sm">{c.when}</span>
                      </span>
                      <span className="shrink-0 rounded-full border border-olive/15 px-4 py-2 text-xs">
                        Bientôt en ligne
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-10 text-sm text-bark/70">
            La carte change au fil des saisons et du marché. Plats végétariens et sans gluten sur demande.
          </Reveal>
          <InlinePhoto panel="carte" className="mt-12" />
        </section>

        {/* Coffee shop */}
        <section id="coffee" data-panel="coffee" className="py-10 lg:py-14">
          <Reveal>
            <p className={eyebrow}>Toute la journée · 9h – 18h</p>
          </Reveal>
          <SplitTitle lines={["Coffee shop"]} className={`${title} mt-5`} />
          <Reveal delay={0.2} className="mt-8 max-w-lg text-lg leading-relaxed text-bark">
            <p>
              De 9h à 18h, la maison fait aussi coffee shop : cafés de spécialité, pâtisseries maison et,
              l&apos;après-midi, une carte réduite, sur place ou à emporter.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-10 max-w-lg divide-y divide-olive/10 border-y border-olive/10">
              {coffeeMenu.map((item) => (
                <li key={item.name} className="flex items-center gap-4 py-4">
                  <span className="size-1.5 rounded-full bg-clay" aria-hidden />
                  {item.name}
                </li>
              ))}
            </ul>
          </Reveal>
          <InlinePhoto panel="coffee" className="mt-12" />
        </section>

        {/* Cave à vin */}
        <section id="cave" data-panel="cave" className="py-10 lg:py-14">
          <Reveal>
            <p className={eyebrow}>Cave à vin</p>
          </Reveal>
          <SplitTitle lines={["500 vins,", "à boire ici", "ou à emporter"]} className={`${title} mt-5`} />
          <Reveal delay={0.2} className="mt-8 max-w-lg text-lg leading-relaxed text-bark">
            <p>
              Des vins naturels de vignerons de toute la France. La sélection évolue au fil des arrivages
              et des coups de cœur : demandez-nous conseil, on adore en parler.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {[
              { n: "500+", l: "références" },
              { n: "France", l: "vignerons de toute la France" },
              { n: "Nature", l: "vins vivants" },
            ].map((s) => (
              <div key={s.n} className="rounded-[18px] bg-sand p-4">
                <p className="font-serif text-3xl">{s.n}</p>
                <p className="mt-1 text-xs text-bark">{s.l}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.35}>
            <a
              href={info.raisinHref}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-olive/15 px-5 py-2.5 text-sm transition-colors hover:border-olive"
            >
              <span className="size-2 rounded-full bg-carrot" aria-hidden />
              Référencé sur Raisin, l&apos;appli des vins naturels ↗
            </a>
          </Reveal>
          <InlinePhoto panel="cave" className="mt-12" />
        </section>

        {/* Réservation & infos */}
        <section id="reservation" data-panel="reservation" className="py-10 lg:py-14">
          <Reveal>
            <p className={eyebrow}>Réservation</p>
          </Reveal>
          <SplitTitle lines={["Réserver", "une table"]} className={`${title} mt-5`} />
          <Reveal delay={0.15} className="mt-8 max-w-lg text-lg leading-relaxed text-bark">
            <p>Réservez votre table en ligne en quelques clics, ou appelez-nous directement.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-8 max-w-lg divide-y divide-olive/10 border-y border-olive/10">
              {[
                { k: "Brunch & déjeuner", v: "Lundi, jeudi, vendredi, samedi · 9h – 14h" },
                { k: "Brunch uniquement", v: "Dimanche · 9h – 14h" },
                { k: "Dîner", v: "Vendredi & samedi soir" },
                { k: "Fermé", v: "Mardi & mercredi" },
                { k: "Fermeture annuelle", v: "Du 18 octobre au 11 novembre inclus" },
              ].map((r) => (
                <div key={r.k} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="font-medium">{r.k}</dt>
                  <dd className="text-bark">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={bookingHref}
              {...external(bookingHref)}
              className="group inline-flex items-center gap-3 rounded-full bg-olive py-4 pr-4 pl-8 text-lg text-cream transition-colors hover:bg-clay"
            >
              Réserver une table
              <span className="flex size-9 items-center justify-center rounded-full bg-cream/15 transition-transform duration-500 group-hover:rotate-45">
                ↗
              </span>
            </a>
            <a href={info.phoneHref} className="text-bark underline-offset-4 hover:text-clay hover:underline">
              {info.phone}
            </a>
          </Reveal>

          <div id="infos" className="mt-14 grid gap-12 sm:grid-cols-2">
            <Reveal>
              <h3 className="font-serif text-3xl">Horaires</h3>
              <ul className="mt-5 space-y-2 text-sm">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-bark">{h.day}</span>
                    <span className={`text-right ${h.closed ? "text-bark/50" : ""}`}>
                      {h.hours}
                      {h.note && <span className="block text-xs text-clay">{h.note}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 space-y-1 border-t border-olive/10 pt-4 text-xs text-bark">
                {services.map((s) => (
                  <li key={s.label} className="flex justify-between gap-4">
                    <span>{s.label}</span>
                    <span>{s.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-clay">{annualClosure}.</p>
              <p className="mt-1 text-xs text-bark/60">Horaires susceptibles de varier selon la saison.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="font-serif text-3xl">Nous trouver</h3>
              <address className="mt-5 space-y-1 text-sm not-italic">
                <p>{info.address}</p>
                <p>{info.city}</p>
              </address>
              <div className="mt-5 space-y-1 text-sm">
                <a href={info.phoneHref} className="block hover:text-clay">
                  {info.phone}
                </a>
                <a href={info.instagramHref} target="_blank" rel="noreferrer" className="block hover:text-clay">
                  {info.instagram}
                </a>
              </div>
              <a
                href={info.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-full border border-olive/25 px-5 py-2.5 text-sm transition-colors hover:border-olive"
              >
                Itinéraire →
              </a>
            </Reveal>
          </div>
          <InlinePhoto panel="reservation" className="mt-12" />
        </section>

        <footer className="border-t border-olive/10 pt-10 pb-28 text-xs text-bark/70">
          <Image src="/logo.png" alt="Rond de Carotte" width={1000} height={353} className="h-24 w-auto" />
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Rond de Carotte · Saint-Gervais-les-Bains</p>
            <a href="#top" className="hover:text-olive">
              Haut de page ↑
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
