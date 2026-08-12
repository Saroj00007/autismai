import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Lexend } from "next/font/google";
import "./globals.css";
import AuthProvider from "../providers/session-provider";

const display = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

const body = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "AutismAI — A calm space to ask",
  description:
    "AutismAI listens first and answers in plain, steady language — for autistic people, and for the people who support them.",
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <AuthProvider>
        <body className="min-h-full flex flex-col bg-canvas text-ink-faint font-sans">
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
