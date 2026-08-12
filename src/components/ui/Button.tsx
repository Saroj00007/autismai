import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: Variant;
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className"> & {
    href: string;
  };

const basePrimary =
  "group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-ink px-8 py-4 font-sans text-base font-medium tracking-wide text-white shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-2 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-soft disabled:cursor-not-allowed disabled:opacity-60";

const baseSecondary =
  "cursor-pointer rounded-xl border border-border-strong bg-white px-4 py-1.5 text-sm font-medium text-ink-muted shadow-xs transition-all hover:bg-canvas-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-60";

const baseGhost =
  "cursor-pointer font-medium text-ink-faint underline decoration-border-strong underline-offset-4 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand";

const arrow =
  "flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 transition-transform duration-300 group-hover:translate-x-1 sm:h-7 sm:w-7";

function classesFor(variant: Variant, extra?: string) {
  const base =
    variant === "primary" ? basePrimary : variant === "secondary" ? baseSecondary : baseGhost;
  return [base, extra].filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  loading,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={loading || disabled}
      className={classesFor(variant, className)}
    >
      {loading ? (
        <span>{variant === "primary" ? "…" : "Working…"}</span>
      ) : (
        <>
          {children}
          {variant === "primary" && (
            <div className={arrow}>
              <svg
                className="h-3.5 w-3.5 stroke-current text-white sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          )}
        </>
      )}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  loading,
  className,
  children,
  ...rest
}: AnchorProps) {
  return (
    <Link
      {...rest}
      className={classesFor(variant, className)}
      aria-busy={loading || undefined}
    >
      {children}
    </Link>
  );
}

export function SecondaryLink(props: AnchorProps) {
  return <Link {...props} className={classesFor("secondary", props.className)} />;
}
