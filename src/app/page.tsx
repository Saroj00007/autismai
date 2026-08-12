import { SecondaryLink } from "@/src/components/ui/Button";
import { Footer } from "@/src/components/ui/Footer";
import { Navbar } from "@/src/components/ui/Navbar";
import { ExpectationsGrid } from "@/src/components/marketing/ExpectationsGrid";
import { FaqList } from "@/src/components/marketing/FaqList";
import { LandingHero } from "@/src/components/marketing/LandingHero";
import { auth } from "@/src/auth";
import { signOutAction } from "@/src/auth-actions";

const HERO_TITLE =
  "A calm space to ask, without needing to explain yourself first.";
const HERO_SUBTITLE =
  "AutismAI listens first and answers in plain, steady language — for autistic people, and for the people who support them.";

const logOutButtonClass =
  "cursor-pointer rounded-xl border border-border-strong bg-white px-4 py-1.5 text-sm font-medium text-ink-muted shadow-xs transition-all hover:bg-canvas-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-60";

export default async function HomePage() {
  const session = await auth();
  const loggedIn = !!session?.user;
  const firstName = session?.user?.name?.split(" ")[0] ?? null;

  return (
    <div className="min-h-screen bg-canvas text-ink-2">
      <Navbar
        rightSlot={
          loggedIn ? (
            <form action={signOutAction}>
              <button type="submit" className={logOutButtonClass}>
                Log out
              </button>
            </form>
          ) : (
            <SecondaryLink href="/login">Log in</SecondaryLink>
          )
        }
      />

      <LandingHero
        chip={
          loggedIn
            ? `Welcome back, ${firstName ?? "there"}`
            : "Quiet, clear, and built for the way you think"
        }
        title={HERO_TITLE}
        subtitle={HERO_SUBTITLE}
        cta={
          loggedIn
            ? { href: "/chatui", label: "Open chat" }
            : { href: "/register", label: "Create your account" }
        }
        secondaryLink={{ href: "#expect", label: "See what to expect" }}
      />

      <ExpectationsGrid />
      <FaqList />
      <Footer tone="warning" />
    </div>
  );
}
