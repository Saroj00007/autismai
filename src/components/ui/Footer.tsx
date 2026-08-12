import type { ReactNode } from "react";

type FooterTone = "calm" | "warning";

type FooterProps = {
  tone?: FooterTone;
  children?: ReactNode;
};

const COPY = {
  calm:
    "AutismAI is a support tool, not a medical or diagnostic service.",
  warning:
    "AutismAI is a support tool, not a medical or diagnostic service. In a crisis, please contact a professional or local emergency services.",
} as const;

export function Footer({ tone = "calm", children }: FooterProps) {
  const isWarning = tone === "warning";
  return (
    <footer
      className={[
        "border-t border-border bg-white/40 px-6 py-6 text-center sm:px-10",
        isWarning ? "sm:py-10" : "",
      ].join(" ")}
    >
      <p
        className={[
          "text-xs text-ink-fainter",
          isWarning ? "mx-auto max-w-md leading-relaxed" : "",
        ].join(" ")}
      >
        {children ?? COPY[tone]}
      </p>
    </footer>
  );
}
