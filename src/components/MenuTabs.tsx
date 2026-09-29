"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { menus } from "@/lib/content";
import { ease } from "./Reveal";

export default function MenuTabs() {
  const [activeId, setActiveId] = useState(menus[0].id);
  const menu = menus.find((m) => m.id === activeId)!;

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {menus.map((m) => {
          const selected = m.id === activeId;
          return (
            <button
              key={m.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(m.id)}
              className={`relative rounded-full border px-5 py-2.5 text-sm transition-colors ${
                selected ? "border-olive text-cream" : "border-olive/20 text-bark hover:border-olive/50"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="menu-tab"
                  className="absolute inset-0 rounded-full bg-olive"
                  transition={{ duration: 0.5, ease }}
                />
              )}
              <span className="relative">{m.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={menu.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease }}
          className="mt-10"
        >
          <p className="text-xs tracking-[0.2em] text-clay uppercase">{menu.when}</p>
          <p className="mt-3 max-w-md text-bark">{menu.intro}</p>

          <div className="mt-10 space-y-10">
            {menu.sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-serif text-3xl">{section.title}</h3>
                <ul className="mt-4 divide-y divide-olive/10 border-t border-olive/10">
                  {section.items.map((item) => (
                    <li key={item.name} className="flex items-baseline justify-between gap-6 py-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.desc && <p className="mt-0.5 text-sm text-bark/80">{item.desc}</p>}
                      </div>
                      {item.price && <span className="shrink-0 font-serif text-xl">{item.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
