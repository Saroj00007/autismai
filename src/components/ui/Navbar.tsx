import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type NavbarProps = {
  /** Slot for sign-in/up/CTA links on the right. */
  rightSlot?: ReactNode;
  /** Whether the brand should be a link (default true). */
  brandHref?: string;
  /** Optional horizontal navigation shown on larger screens. */
  links?: { href: string; label: string }[];
};

export function Navbar({ rightSlot, brandHref = "/", links = [] }: NavbarProps) {
  const brand = <Logo size="md" />;

  return (
    <header className="mx-3 mt-3 flex min-h-18 items-center justify-between gap-6 border border-border bg-surface px-6 py-5 shadow-sm sm:mx-5 sm:px-10">
      {brandHref ? (
        <Link href={brandHref} className="cursor-pointer">
          {brand}
        </Link>
      ) : (
        brand
      )}
      {links.length > 0 && (
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-faint transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
      <div className="flex items-center gap-3">{rightSlot}<ThemeToggle /></div>
    </header>
  );
}
