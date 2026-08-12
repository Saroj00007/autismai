import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

type NavbarProps = {
  /** Slot for sign-in/up/CTA links on the right. */
  rightSlot?: ReactNode;
  /** Whether the brand should be a link (default true). */
  brandHref?: string;
};

export function Navbar({ rightSlot, brandHref = "/" }: NavbarProps) {
  const brand = <Logo size="md" />;

  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-10">
      {brandHref ? (
        <Link href={brandHref} className="cursor-pointer">
          {brand}
        </Link>
      ) : (
        brand
      )}
      {rightSlot && <div className="flex items-center gap-4">{rightSlot}</div>}
    </header>
  );
}
