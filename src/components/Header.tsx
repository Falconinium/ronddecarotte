"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { annualClosure, bookingHref, external, hours, info } from "@/lib/content";
import { ease } from "./Reveal";
import { setScrollLocked } from "./SmoothScroll";

const links = [
  { href: "#maison", label: "La maison" },
  { href: "#carte", label: "La carte" },
  { href: "#coffee", label: "Coffee shop" },
  { href: "#cave", label: "Cave à vin" },
  { href: "#infos", label: "Infos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      setScrollLocked(false);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 p-3 lg:right-1/2">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center rounded-[18px] bg-cream/80 px-2 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-panel"
            className="group flex items-center gap-3 justify-self-start rounded-full px-3 py-2 text-sm"
          >
            <span className="relative flex h-3 w-5 flex-col justify-between" aria-hidden>
              <motion.span
                className="h-px w-full bg-olive"
                animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease }}
              />
              <motion.span
                className="h-px w-full bg-olive"
                animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease }}
              />
            </span>
            <span className="hidden sm:inline">{open ? "Fermer" : "Menu"}</span>
          </button>

          <a
            href="#top"
            onClick={() => setOpen(false)}
            aria-label="Rond de Carotte — accueil"
          >
            <Image
              src="/logo.png"
              alt="Rond de Carotte — Café, Cuisine, Caviste"
              width={1000}
              height={353}
              priority
              className="h-12 w-auto sm:h-14"
            />
          </a>

          <a
            href={bookingHref}
            {...external(bookingHref)}
            className="justify-self-end rounded-full bg-olive px-4 py-2.5 text-sm text-cream transition-colors hover:bg-clay sm:px-5"
          >
            Réserver
          </a>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-olive/20 lg:right-1/2"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              id="menu-panel"
              data-lenis-prevent
              className="fixed inset-x-3 top-3 z-40 flex max-h-[calc(100svh-1.5rem)] flex-col overflow-y-auto overscroll-contain rounded-[18px] bg-cream px-6 pt-24 pb-8 shadow-2xl shadow-olive/10 lg:right-[calc(50%+0.75rem)]"
              initial={{ clipPath: "inset(0 0 100% 0 round 18px)" }}
              animate={{ clipPath: "inset(0 0 0% 0 round 18px)" }}
              exit={{ clipPath: "inset(0 0 100% 0 round 18px)" }}
              transition={{ duration: 0.7, ease }}
            >
              <ul className="flex flex-col">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    className="border-b border-olive/10"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.06 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between py-3 font-serif text-5xl transition-colors hover:text-clay sm:text-6xl"
                    >
                      {l.label}
                      <span className="font-sans text-sm text-bark/50 transition-transform group-hover:translate-x-1">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-10 grid gap-8 text-sm sm:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="space-y-1 text-bark">
                  <p className="mb-2 text-xs tracking-[0.2em] text-clay uppercase">Nous trouver</p>
                  <p>{info.address}</p>
                  <p>{info.city}</p>
                  <a href={info.phoneHref} className="block text-olive hover:text-clay">
                    {info.phone}
                  </a>
                  <a href={info.instagramHref} target="_blank" rel="noreferrer" className="block text-olive hover:text-clay">
                    {info.instagram}
                  </a>
                </div>
                <div>
                  <p className="mb-2 text-xs tracking-[0.2em] text-clay uppercase">Horaires</p>
                  <ul className="space-y-0.5 text-bark">
                    {hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-4">
                        <span>{h.day}</span>
                        <span className={`text-right ${h.closed ? "text-bark/50" : "text-olive"}`}>
                          {h.hours}
                          {h.note && <span className="block text-xs text-clay">{h.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-clay">{annualClosure}.</p>
                </div>
              </motion.div>

              <a
                href={bookingHref}
                {...external(bookingHref)}
                className="mt-10 rounded-full bg-olive px-6 py-4 text-center text-cream transition-colors hover:bg-clay"
              >
                Réserver une table
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
