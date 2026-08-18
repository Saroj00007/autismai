import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";

const inputBase =
  "mt-2 w-full rounded-md border border-border bg-canvas/80 px-4 py-3 text-sm text-ink placeholder-ink-fainter transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function Input({ className, ...rest }: InputProps) {
  return <input {...rest} className={[inputBase, className].filter(Boolean).join(" ")} />;
}

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export function Label({ children, className, ...rest }: LabelProps) {
  return (
    <label
      {...rest}
      className={[
        "block text-xs font-bold tracking-[0.1em] text-ink-faint uppercase",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </label>
  );
}

type AlertKind = "error" | "success";

const alertBase: Record<AlertKind, string> = {
  error:
    "rounded-md border border-red-200 bg-red-50 p-3.5 text-center text-xs font-medium text-red-600",
  success:
    "rounded-md border border-emerald-200 bg-emerald-50 p-3.5 text-center text-xs font-medium text-emerald-700",
};

export function Alert({ kind, children }: { kind: AlertKind; children: ReactNode }) {
  return <div className={alertBase[kind]}>{children}</div>;
}
