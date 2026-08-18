import type { HTMLAttributes } from "react";

type LogoProps = HTMLAttributes<HTMLSpanElement> & {
  size?: "sm" | "md" | "lg";
};

const SIZE_CLASSES = {
  sm: "h-7 w-7",
  md: "h-8 w-8",
  lg: "h-10 w-10",
} as const;

export function Logo({ size = "md", className, ...rest }: LogoProps) {
  return (
    <span
      {...rest}
      className={["inline-flex items-center gap-2.5", className ?? ""].join(" ")}
    >
      <span className={["shrink-0", SIZE_CLASSES[size]].join(" ")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="NIVA"
          width={40}
          height={40}
          className="h-full w-full"
        />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-ink">
        N<span className="text-brand">IVA</span>
      </span>
    </span>
  );
}

export function LogoMark({ size = "md", className, ...rest }: LogoProps) {
  return (
    <span
      {...rest}
      className={["inline-block shrink-0", SIZE_CLASSES[size], className ?? ""].join(
        " ",
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.svg"
        alt="NIVA"
        width={40}
        height={40}
        className="h-full w-full"
      />
    </span>
  );
}
