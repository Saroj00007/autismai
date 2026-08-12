import Image from "next/image";
import { ButtonLink } from "@/src/components/ui/Button";
import { GlowBackdrop } from "@/src/components/ui/Card";
import type { ReactNode } from "react";

type LandingHeroProps = {
  chip?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  cta: { href: string; label: string };
  secondaryLink?: { href: string; label: string };
};

export function LandingHero({
  chip,
  title,
  subtitle,
  cta,
  secondaryLink,
}: LandingHeroProps) {
  return (
    <main className="px-6 pt-12 pb-20 sm:pt-16 sm:px-10 sm:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          {chip && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-1.5 text-xs font-medium text-ink-muted shadow-2xs backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-success" />
              {chip}
            </span>
          )}

          <h1 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl sm:leading-tight lg:max-w-xl">
            {title}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-faint sm:text-lg lg:max-w-md">
            {subtitle}
          </p>

          <div className="relative mt-10 flex items-center justify-center lg:justify-start">
            <GlowBackdrop className="rounded-2xl blur-xl" />
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          </div>

          {secondaryLink && (
            <a
              href={secondaryLink.href}
              className="mt-6 inline-block cursor-pointer text-xs font-medium text-ink-faint underline decoration-border-strong underline-offset-4 transition-colors hover:text-ink"
            >
              {secondaryLink.label}
            </a>
          )}
        </div>

        <div className="relative">
          <div className="group relative aspect-4/5 w-full max-w-md mx-auto overflow-hidden rounded-3xl border border-border bg-white shadow-2xl shadow-slate-900/10 sm:aspect-square">
            <Image
              src="/child-puzzle.png"
              alt="A child sitting in front of a giant, colorful puzzle — a quiet moment of focus and discovery"
              fill
              priority
              quality={95}
              sizes="(min-width: 1024px) 32rem, (min-width: 640px) 28rem, 100vw"
              className="hero-photo object-cover object-[center_45%] transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-ink/55 via-ink/5 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 ring-1 ring-inset ring-white/20"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 hidden -rotate-3 overflow-hidden rounded-2xl border border-border bg-white shadow-xl shadow-slate-900/10 sm:block w-44">
            <div className="relative aspect-square">
              <Image
                src="/rainbow-drawing.png"
                alt="A child drawing a vibrant rainbow with a marker"
                fill
                quality={95}
                sizes="11rem"
                className="object-cover object-[center_45%]"
              />
            </div>
          </div>

          <div className="absolute -top-4 -right-2 hidden sm:block">
            <div className="rounded-2xl border border-border bg-white/90 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-md">
              <p className="text-[10px] font-bold tracking-[0.15em] text-ink-faint uppercase">
                Private
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-ink">
                Your space, your words
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
