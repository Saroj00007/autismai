import Image from "next/image";
import { EXPECTATIONS, type Expectation } from "./data";

type ExpectationsGridProps = {
  eyebrow?: string;
  items?: readonly Expectation[];
};

export function ExpectationsGrid({
  eyebrow = "What to expect",
  items = EXPECTATIONS,
}: ExpectationsGridProps) {
  return (
    <section
      id="expect"
      className="border-t border-border bg-white/60 px-6 py-20 sm:px-10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-ink-faint uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-md font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              A steady, predictable experience — every time.
            </h2>
          </div>
          <div className="relative hidden h-20 w-32 shrink-0 overflow-hidden rounded-md border border-border shadow-2xs sm:block">
            <Image
              src="/child-therapist.png"
              alt=""
              fill
              sizes="8rem"
              className="object-cover object-[center_35%]"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className="group relative rounded-md border border-border bg-canvas/80 p-6 shadow-2xs transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="absolute right-5 top-5 font-display text-xs font-semibold text-ink-fainter">
                0{idx + 1}
              </span>
              <h3 className="font-display text-lg font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-faint">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
