"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "./Reveal";

export const panels = {
  hero: { src: "/images/poulpe.jpg", caption: "Poulpe grillé, roquette" },
  maison: { src: "/images/carpaccio.jpg", caption: "Cuisine de saison" },
  carte: { src: "/images/risotto-girolles.jpg", caption: "Risotto crémeux aux girolles" },
  coffee: { src: "/images/coffee.jpg", caption: "Le coffee shop" },
  cave: { src: "/images/cave-a-vin.jpg", caption: "Plus de 500 références" },
  reservation: { src: "/images/poisson-du-lac.jpg", caption: "À très vite à table" },
} as const;

export type PanelKey = keyof typeof panels;

// Grande photo fixe à droite (desktop) qui change selon la section visible.
export default function ImagePanel() {
  const [active, setActive] = useState<PanelKey>("hero");

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-panel]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.getAttribute("data-panel") as PanelKey);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const panel = panels[active];

  return (
    <div className="fixed inset-y-0 right-0 hidden w-1/2 p-3 lg:block">
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-sand">
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease }}
          >
            <Image
              src={panel.src}
              alt={panel.caption}
              fill
              priority={active === "hero"}
              sizes="50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            className="absolute bottom-6 left-6 font-serif text-2xl text-cream"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease }}
          >
            {panel.caption}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Version mobile : la photo s'affiche dans le flux de la section.
export function InlinePhoto({ panel, className = "" }: { panel: PanelKey; className?: string }) {
  const { src, caption } = panels[panel];
  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-[18px] lg:hidden ${className}`}>
      <Image src={src} alt={caption} fill sizes="100vw" className="object-cover" />
    </div>
  );
}
