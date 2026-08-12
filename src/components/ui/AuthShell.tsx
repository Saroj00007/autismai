import type { ReactNode } from "react";
import Image from "next/image";
import { Card, GlowBackdrop } from "./Card";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export type AuthShellImage = "child-playing" | "rainbow-drawing" | "child-shadow" | "child-therapist";

type AuthShellProps = {
  /** Right side of the top navbar: usually a "Sign up" or "Log in" link. */
  navbarRight?: ReactNode;
  children: ReactNode;
  /** Which image to show on the side panel. */
  image?: AuthShellImage;
  /** Eyebrow text shown on the image panel. */
  imageEyebrow?: string;
  /** Headline shown on the image panel. */
  imageTitle?: string;
  /** Subtitle shown on the image panel. */
  imageSubtitle?: string;
};

const IMAGE_CONFIG: Record<AuthShellImage, { src: string; alt: string; focal: string }> = {
  "child-playing": {
    src: "/child-playing.png",
    alt: "A child exploring colorful shapes on a busy board",
    focal: "object-[center_35%]",
  },
  "rainbow-drawing": {
    src: "/rainbow-drawing.png",
    alt: "A child drawing a vibrant rainbow with a marker",
    focal: "object-[center_45%]",
  },
  "child-shadow": {
    src: "/child-shadow.png",
    alt: "A child reaching toward their own shadow on a sunlit wall",
    focal: "object-[center_40%]",
  },
  "child-therapist": {
    src: "/child-therapist.png",
    alt: "A child sitting across from a calm, attentive caregiver",
    focal: "object-[center_35%]",
  },
};

export function AuthShell({
  navbarRight,
  children,
  image = "child-playing",
  imageEyebrow = "Welcome to AutismAI",
  imageTitle = "A calm space made for the way you think",
  imageSubtitle = "Listen first, answer in plain language, and never ask you to explain yourself first.",
}: AuthShellProps) {
  const img = IMAGE_CONFIG[image];

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink-2">
      <Navbar rightSlot={navbarRight} />

      <main className="flex flex-1 items-stretch">
        <div className="relative hidden flex-1 overflow-hidden bg-ink lg:block">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={["object-cover", img.focal].join(" ")}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-tr from-ink/85 via-ink/40 to-transparent"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {imageEyebrow}
            </span>
            <h2 className="mt-6 max-w-md font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {imageTitle}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
              {imageSubtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:py-20">
          <div className="relative w-full max-w-md">
            <GlowBackdrop />
            <Card>{children}</Card>
          </div>
        </div>
      </main>

      <Footer tone="calm" />
    </div>
  );
}
