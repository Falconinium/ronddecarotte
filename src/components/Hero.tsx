"use client";

import { motion } from "motion/react";
import { bookingHref, external, hours, info } from "@/lib/content";
import { InlinePhoto } from "./ImagePanel";
import { ease } from "./Reveal";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

export default function Hero() {
  return (
    <section
      id="top"
      data-panel="hero"
      className="flex min-h-svh flex-col justify-end gap-8 pt-20 pb-10 lg:gap-10 lg:pt-28 lg:pb-16"
    >
      <InlinePhoto panel="hero" className="aspect-[16/10]!" />

      <div>
        <motion.p {...fade(0.1)} className="mb-6 text-xs tracking-[0.25em] text-clay uppercase">
          {info.tagline}
        </motion.p>
        <h1 className="font-serif text-[clamp(4.5rem,10vw,10rem)] leading-[0.9] tracking-tight">
          {["Cuisine", "& Vins"].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.2 + i * 0.14 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p {...fade(0.55)} className="mt-8 max-w-md text-lg leading-relaxed text-bark">
          Un restaurant de saison au cœur de Saint-Gervais : une cuisine qui suit le marché et les
          producteurs de la vallée, et une cave de plus de 500 vins.
        </motion.p>
        <motion.div {...fade(0.7)} className="mt-10 flex flex-wrap gap-3">
          <a
            href={bookingHref}
            {...external(bookingHref)}
            className="rounded-full bg-olive px-7 py-4 text-cream transition-colors hover:bg-clay"
          >
            Réserver une table
          </a>
          <a
            href="#carte"
            className="rounded-full border border-olive/25 px-7 py-4 transition-colors hover:border-olive"
          >
            Voir la carte
          </a>
        </motion.div>
      </div>

      <motion.dl
        {...fade(0.85)}
        className="grid grid-cols-1 gap-4 border-t border-olive/10 pt-6 text-sm sm:grid-cols-3"
      >
        {[
          { k: "Appeler", v: info.phone, href: info.phoneHref },
          { k: "Instagram", v: info.instagram, href: info.instagramHref },
          { k: "Adresse", v: info.address, href: info.mapsHref },
        ].map((c) => (
          <div key={c.k}>
            <dt className="text-xs text-bark/60">{c.k}</dt>
            <dd>
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="transition-colors hover:text-clay">
                {c.v}
              </a>
            </dd>
          </div>
        ))}
      </motion.dl>

      <motion.ul
        {...fade(0.95)}
        className="-mt-2 grid grid-cols-4 gap-x-4 gap-y-3 border-t border-olive/10 pt-5 text-xs sm:grid-cols-7 lg:-mt-4"
        aria-label="Horaires d'ouverture"
      >
        {hours.map((h) => (
          <li key={h.day}>
            <span className="block text-bark/60">{h.short}</span>
            <span className={h.closed ? "text-bark/50" : ""}>{h.hours}</span>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
