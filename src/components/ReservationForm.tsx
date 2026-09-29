"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { info } from "@/lib/content";
import { ease } from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[10px] border border-olive/15 bg-cream px-4 py-3 text-olive outline-none transition-colors placeholder:text-bark/50 focus:border-clay";
const label = "mb-1.5 block text-xs tracking-[0.15em] text-bark uppercase";

export default function ReservationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-[18px] bg-sand p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="py-10 text-center"
          >
            <p className="font-serif text-4xl">Merci !</p>
            <p className="mt-3 text-bark">
              Votre demande est bien partie. Nous vous rappelons rapidement pour la confirmer.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            exit={{ opacity: 0, y: -8 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label htmlFor="name" className={label}>
                Nom
              </label>
              <input id="name" name="name" required autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="phone" className={label}>
                Téléphone
              </label>
              <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
            </div>
            <div>
              <label htmlFor="guests" className={label}>
                Couverts
              </label>
              <select id="guests" name="guests" required defaultValue="" className={field}>
                <option value="" disabled>
                  Choisir…
                </option>
                {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === "1" ? "personne" : "personnes"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className={label}>
                Date
              </label>
              <input id="date" name="date" type="date" min={today} required className={field} />
            </div>
            <div>
              <label htmlFor="service" className={label}>
                Service
              </label>
              <select id="service" name="service" required defaultValue="" className={field}>
                <option value="" disabled>
                  Choisir…
                </option>
                <option>Brunch / déjeuner</option>
                <option>Dîner (ven. & sam.)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className={label}>
                Un mot ? <span className="normal-case tracking-normal text-bark/60">(facultatif)</span>
              </label>
              <textarea id="message" name="message" rows={3} className={field} />
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-olive px-8 py-4 text-cream transition-colors hover:bg-clay disabled:opacity-60"
              >
                {status === "sending" ? "Envoi…" : "Demander une table"}
              </button>
              <p className="text-sm text-bark">
                ou appelez le{" "}
                <a href={info.phoneHref} className="underline underline-offset-4 hover:text-clay">
                  {info.phone}
                </a>
              </p>
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm text-carrot sm:col-span-2">
                La demande n&apos;a pas pu être envoyée. Appelez-nous directement au {info.phone}, on vous
                trouve une place.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
