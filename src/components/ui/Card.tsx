import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...rest }: CardProps) {
  const base =
    "rounded-3xl border border-border bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-md sm:p-10";
  return (
    <div {...rest} className={[base, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export function GlowBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={[
        "absolute inset-0 -z-10 rounded-3xl bg-brand/15 blur-2xl transition-all duration-500 motion-safe:animate-pulse",
        className ?? "",
      ].join(" ")}
    />
  );
}
