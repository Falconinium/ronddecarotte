"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { bookingHref, external, hours, info } from "@/lib/content";
import { ease } from "./Reveal";

const ticker = hours.map((h) => `${h.day} ${h.hours}${h.note ? ` (${h.note.toLowerCase()})` : ""}`).join("   ·   ");

// Barre flottante en bas de page, comme sur La Paloma : réserver + nous trouver + horaires.
export default function BottomBar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 500));

  return (
    <motion.div
      className="fixed inset-x-3 bottom-3 z-30 lg:right-[calc(50%+0.75rem)] lg:left-3"
      initial={false}
      animate={visible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="flex items-stretch gap-2 rounded-[18px] bg-olive p-2 text-cream shadow-xl shadow-olive/20">
        <a
          href={bookingHref}
          {...external(bookingHref)}
          className="flex shrink-0 items-center rounded-[12px] bg-clay px-5 py-3 text-sm transition-colors hover:bg-carrot"
        >
          Réserver
        </a>
        <a
          href={info.mapsHref}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 flex-col justify-center px-3 text-xs sm:flex"
        >
          <span className="text-cream/60">Nous trouver</span>
          <span>{info.address}</span>
        </a>
        <div className="relative flex min-w-0 flex-1 items-center overflow-hidden text-xs text-cream/80 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="animate-marquee flex whitespace-nowrap">
            <span className="pr-12">{ticker}</span>
            <span className="pr-12" aria-hidden>
              {ticker}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
