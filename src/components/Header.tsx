"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { info } from "@/lib/content";
import { ease } from "./Reveal";

const links = [
  { href: "#carte", label: "La carte" },
  { href: "#coffee", label: "Coffee shop" },
  { href: "#cave", label: "Cave à vin" },
  { href: "#infos", label: "Infos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 lg:right-1/2 ${
          scrolled || open ? "bg-cream/85 backdrop-blur-md" : ""
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:px-8 lg:px-14">
          <a href="#top" className="flex items-center gap-2 font-serif text-2xl tracking-tight">
            <span className="inline-block size-2.5 rounded-full bg-carrot" aria-hidden />
            Rond de Carotte
          </a>
          <nav className="hidden items-center gap-7 text-sm xl:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-bark transition-colors hover:text-olive">
                {l.label}
              </a>
            ))}
            <a
              href="#reservation"
              className="rounded-full bg-olive px-5 py-2.5 text-cream transition-colors hover:bg-clay"
            >
              Réserver
            </a>
          </nav>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="relative z-50 flex size-10 flex-col items-center justify-center gap-1.5 xl:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <motion.span
              className="h-px w-6 bg-olive"
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="h-px w-6 bg-olive"
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col justify-between bg-cream px-5 pt-24 pb-10 sm:px-8 lg:right-1/2 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <nav className="flex flex-col gap-2">
              {[...links, { href: "#reservation", label: "Réserver" }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-5xl"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.05 + i * 0.06 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="text-sm text-bark">
              <a href={info.phoneHref} className="block">
                {info.phone}
              </a>
              <p>
                {info.address}, {info.city}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
