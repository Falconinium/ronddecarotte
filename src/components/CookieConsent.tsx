"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ease } from "./Reveal";

// Consentement à la mesure d'audience (Vercel Analytics & Speed Insights).
// Le choix est conservé 6 mois, puis redemandé (recommandation CNIL).
const STORAGE_KEY = "rdc-consent";
const MAX_AGE = 1000 * 60 * 60 * 24 * 182;
export const OPEN_EVENT = "rdc:open-consent";
const CHANGE_EVENT = "rdc:consent-change";

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (saved && Date.now() - saved.date < MAX_AGE) return saved.value;
  } catch {}
  return null;
}

function saveChoice(value: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, date: Date.now() }));
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// "unset" : aucun choix valide enregistré ; "ssr" : rendu serveur, on n'affiche rien.
const getSnapshot = () => readChoice() ?? "unset";
const getServerSnapshot = () => "ssr" as const;

export default function CookieConsent() {
  const choice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);
  const open = choice === "unset" || reopened;

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function decide(value: Choice) {
    const previous = choice;
    saveChoice(value);
    setReopened(false);
    // Les scripts déjà chargés ne peuvent pas être retirés : on recharge pour appliquer un retrait.
    if (previous === "granted" && value === "denied") window.location.reload();
  }

  return (
    <>
      {choice === "granted" && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-labelledby="consent-title"
            aria-describedby="consent-text"
            className="fixed inset-x-3 bottom-3 z-[60] rounded-[18px] bg-cream p-5 shadow-2xl shadow-olive/20 ring-1 ring-olive/10 sm:right-auto sm:max-w-md lg:left-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease }}
          >
            <p id="consent-title" className="font-serif text-2xl">
              Un petit cookie ?
            </p>
            <p id="consent-text" className="mt-2 text-sm leading-relaxed text-bark">
              Nous utilisons des cookies et traceurs pour mesurer l&apos;audience de notre site et
              améliorer votre expérience de navigation. Vous pouvez les accepter ou les refuser, et
              modifier votre choix à tout moment depuis « Gestion des cookies » en bas de page.{" "}
              <Link href="/mentions-legales#cookies" className="text-olive underline underline-offset-4 hover:text-clay">
                En savoir plus
              </Link>
            </p>
            {/* Même style pour les deux choix : refuser doit être aussi simple qu'accepter (CNIL). */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => decide("denied")}
                className="rounded-full bg-olive px-5 py-3 text-sm text-cream transition-colors hover:bg-clay"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => decide("granted")}
                className="rounded-full bg-olive px-5 py-3 text-sm text-cream transition-colors hover:bg-clay"
              >
                Accepter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ConsentLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Gestion des cookies
    </button>
  );
}
