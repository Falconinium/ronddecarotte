import BottomBar from "@/components/BottomBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImagePanel, { InlinePhoto } from "@/components/ImagePanel";
import MenuTabs from "@/components/MenuTabs";
import ReservationForm from "@/components/ReservationForm";
import Reveal, { SplitTitle } from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import { coffeeMenu, hours, info, services } from "@/lib/content";

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
        <section id="maison" data-panel="maison" className="py-24 lg:py-40">
          <Reveal>
            <p className={eyebrow}>La maison</p>
          </Reveal>
          <SplitTitle lines={["Restaurant", "& cave à vin"]} className={`${title} mt-5`} />
          <Reveal delay={0.2} className="mt-8 max-w-lg space-y-5 text-lg leading-relaxed text-bark">
            <p>
              Au cœur de Saint-Gervais, une salle aux allures de chalet coupée en deux par une petite
              cuisine ouverte, et des étagères chargées de bouteilles.
            </p>
            <p>
              On y vient pour un brunch qui s&apos;étire, un déjeuner de saison, un café l&apos;après-midi
              ou une bonne bouteille le vendredi soir.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 inline-flex items-center gap-3 rounded-full border border-olive/15 px-5 py-2.5 text-sm">
            <span className="size-2 rounded-full bg-carrot" aria-hidden />
            Sélectionné par le Guide MICHELIN
          </Reveal>
          <InlinePhoto panel="maison" className="mt-12" />
        </section>

        {/* La carte */}
        <section id="carte" data-panel="carte" className="py-24 lg:py-40">
          <Reveal>
            <p className={eyebrow}>À table</p>
          </Reveal>
          <SplitTitle lines={["La carte"]} className={`${title} mt-5 mb-10`} />
          <Reveal delay={0.15}>
            <MenuTabs />
          </Reveal>
          <Reveal className="mt-10 text-sm text-bark/70">
            La carte change au fil des saisons et du marché. Plats végétariens et sans gluten sur demande.
          </Reveal>
          <InlinePhoto panel="carte" className="mt-12" />
        </section>

        {/* Coffee shop */}
        <section id="coffee" data-panel="coffee" className="py-24 lg:py-40">
          <Reveal>
            <p className={eyebrow}>L&apos;après-midi · 14h – 19h</p>
          </Reveal>
          <SplitTitle lines={["Coffee shop"]} className={`${title} mt-5`} />
          <Reveal delay={0.2} className="mt-8 max-w-lg text-lg leading-relaxed text-bark">
            <p>
              Entre deux services, la maison reste ouverte : cafés de spécialité, pâtisseries maison et
              une carte réduite, sur place ou à emporter.
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
        <section id="cave" data-panel="cave" className="py-24 lg:py-40">
          <Reveal>
            <p className={eyebrow}>Cave à vin</p>
          </Reveal>
          <SplitTitle lines={["500 vins,", "à boire ici", "ou à emporter"]} className={`${title} mt-5`} />
          <Reveal delay={0.2} className="mt-8 max-w-lg text-lg leading-relaxed text-bark">
            <p>
              Des vignerons de Savoie, du Jura et d&apos;ailleurs, souvent en bio ou en nature. Choisissez
              une bouteille sur les étagères pour l&apos;ouvrir à table, ou repartez avec.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {[
              { n: "500+", l: "références" },
              { n: "Savoie", l: "& vignerons voisins" },
              { n: "Cave", l: "vente à emporter" },
            ].map((s) => (
              <div key={s.n} className="rounded-[18px] bg-sand p-4">
                <p className="font-serif text-3xl">{s.n}</p>
                <p className="mt-1 text-xs text-bark">{s.l}</p>
              </div>
            ))}
          </Reveal>
          <InlinePhoto panel="cave" className="mt-12" />
        </section>

        {/* Réservation & infos */}
        <section id="reservation" data-panel="reservation" className="py-24 lg:py-40">
          <Reveal>
            <p className={eyebrow}>Réservation</p>
          </Reveal>
          <SplitTitle lines={["Réserver", "une table"]} className={`${title} mt-5 mb-10`} />
          <Reveal delay={0.15}>
            <ReservationForm />
          </Reveal>

          <div id="infos" className="mt-20 grid gap-12 sm:grid-cols-2">
            <Reveal>
              <h3 className="font-serif text-3xl">Horaires</h3>
              <ul className="mt-5 space-y-2 text-sm">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-bark">{h.day}</span>
                    <span className={h.closed ? "text-bark/50" : ""}>{h.hours}</span>
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
              <p className="mt-4 text-xs text-bark/60">Horaires susceptibles de varier selon la saison.</p>
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

        <footer className="flex flex-col gap-2 border-t border-olive/10 pt-8 pb-28 text-xs text-bark/70 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Rond de Carotte · Saint-Gervais-les-Bains</p>
          <a href="#top" className="hover:text-olive">
            Haut de page ↑
          </a>
        </footer>
      </main>
    </>
  );
}
