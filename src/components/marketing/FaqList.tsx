"use client";

import Image from "next/image";
import { useState } from "react";
import { FAQS, type Faq } from "./data";

type FaqListProps = {
  eyebrow?: string;
  items?: readonly Faq[];
};

export function FaqList({ eyebrow = "Common questions", items = FAQS }: FaqListProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-border px-6 py-20 sm:px-10">
      <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-[1fr_2fr]">
        <div className="lg:sticky lg:top-12">
          <p className="text-xs font-bold tracking-[0.15em] text-ink-faint uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            Clear answers to the questions people ask first.
          </h2>
          <div className="relative mt-8 hidden aspect-4/3 w-full max-w-xs overflow-hidden rounded-md border border-border shadow-2xs lg:block">
            <Image
              src="/child-playing.png"
              alt=""
              fill
              sizes="20rem"
              className="object-cover object-[center_35%]"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="font-display text-base font-semibold text-ink">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      "shrink-0 text-ink-faint transition-transform duration-300",
                      isOpen ? "rotate-45 text-ink" : "",
                    ].join(" ")}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-relaxed text-ink-faint">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
