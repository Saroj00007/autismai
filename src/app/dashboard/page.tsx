// "use client";

// import { signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleLogout = async () => {
//     try {
//       setLoading(true);
//       await signOut({ redirect: false });
//       router.push("/login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (status === "unauthenticated") {
//     router.push("/login");
//     return null;
//   }

//   return (
//     <>
//       Dashboard
//       <p>username : {session?.user?.name}</p>
//       <p>user_email : {session?.user?.email}</p>

//       <button onClick={handleLogout} disabled={loading}>
//         {loading ? "Logging out..." : "Logout"}
//       </button>
//     </>
//   );
// }

// --------------------------------------------------------------------------------------------------------------------
"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EXPECTATIONS = [
  {
    title: "No small talk required",
    body: "Ask directly if you want to. You don't have to warm up to it first.",
  },
  {
    title: "Answers you can sit with",
    body: "Plain language, said once and said clearly. No jargon, no padding.",
  },
  {
    title: "Private, by default",
    body: "What you write here stays tied to your account. It isn't shared or scored.",
  },
];

const FAQS = [
  {
    q: "Is this therapy?",
    a: "No. AutismAI is a place to think things through and get grounded answers. It doesn't replace a clinician, therapist, or doctor.",
  },
  {
    q: "Who is this for?",
    a: "Autistic people, and the parents, caregivers, or family members supporting them, looking for clear answers without a lot of searching.",
  },
  {
    q: "What if I don't like an answer?",
    a: "Ask again, ask differently, or stop. There's no pressure to keep going once you have what you need.",
  },
  {
    q: "Can I trust what it tells me?",
    a: "It's built to be careful and specific rather than confident for its own sake. If something needs a professional, it will say so plainly.",
  },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut({ redirect: false });
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <p className="font-[Lexend] text-[#6B7280]">Getting things ready…</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-[Lexend] text-[#1E293B]">
      {/* Nav */}
      <header className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5 sm:px-10">
        <span className="font-[Atkinson_Hyperlegible] text-xl font-semibold tracking-tight text-[#0F172A]">
          AutismAI
        </span>
        <nav className="flex items-center gap-6">
          <a
            href="#expect"
            className="hidden cursor-pointer text-sm font-medium text-[#64748B] transition-colors hover:text-[#0F172A] sm:inline"
          >
            How it works
          </a>
          <a
            href="#faq"
            className="hidden cursor-pointer text-sm font-medium text-[#64748B] transition-colors hover:text-[#0F172A] sm:inline"
          >
            FAQ
          </a>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="cursor-pointer rounded-xl border border-[#CBD5E1] bg-white px-4 py-1.5 text-sm font-medium text-[#475569] shadow-xs transition-all hover:bg-[#F1F5F9] hover:text-[#0F172A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing out…" : "Log out"}
          </button>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center px-6 pt-16 pb-24 text-center sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white/80 px-4 py-1.5 text-xs font-medium text-[#475569] shadow-2xs backdrop-blur-xs">
          <span className="h-2 w-2 rounded-full bg-[#10B981]"></span>
          Welcome back, {firstName}
        </span>

        <h1 className="mt-8 max-w-2xl font-[Atkinson_Hyperlegible] text-3xl font-semibold leading-tight text-[#0F172A] sm:text-5xl sm:leading-tight">
          A calm space to ask, without needing to explain yourself first.
        </h1>

        <p className="mt-5 max-w-lg text-base leading-relaxed text-[#64748B] sm:text-lg">
          AutismAI listens first and answers in plain, steady language — for
          autistic people, and for the people who support them.
        </p>

        {/* Primary Action Button */}
        <div className="relative mt-12 flex items-center justify-center">
          {/* Subtle Glow backdrop */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-[#3B82F6]/15 blur-xl transition-all duration-500 motion-safe:animate-pulse" />

          <button
            onClick={() => router.push("/chatui")}
            className="group cursor-pointer relative flex items-center gap-3.5 rounded-2xl bg-[#0F172A] px-8 py-4 text-white shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1E293B] hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#93C5FD]"
            aria-label="Start a chat"
          >
            <span className="font-[Lexend] text-base font-medium tracking-wide">
              Start a conversation
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
              <svg
                className="h-4 w-4 stroke-current text-white"
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
          </button>
        </div>

        <a
          href="#expect"
          className="mt-8 cursor-pointer text-xs font-medium text-[#64748B] underline decoration-[#CBD5E1] underline-offset-4 transition-colors hover:text-[#0F172A]"
        >
          See what to expect
        </a>
      </main>

      {/* What to expect */}
      <section
        id="expect"
        className="border-t border-[#E2E8F0] bg-white/60 px-6 py-20 sm:px-10"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold tracking-[0.15em] text-[#64748B] uppercase">
            WHAT TO EXPECT
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {EXPECTATIONS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E2E8F0] bg-[#FAF8F5]/80 p-6 shadow-2xs transition-shadow hover:shadow-md"
              >
                <h3 className="font-[Atkinson_Hyperlegible] text-lg font-bold text-[#0F172A]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[#E2E8F0] px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold tracking-[0.15em] text-[#64748B] uppercase">
            COMMON QUESTIONS
          </p>
          <div className="mt-6 divide-y divide-[#E2E8F0]">
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  >
                    <span className="font-[Atkinson_Hyperlegible] text-base font-semibold text-[#0F172A]">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-[#64748B] transition-transform duration-300 ${
                        open ? "rotate-45 text-[#0F172A]" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {open && (
                    <p className="pb-5 text-sm leading-relaxed text-[#64748B]">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white/40 px-6 py-10 text-center sm:px-10">
        <p className="mx-auto max-w-md text-xs leading-relaxed text-[#94A3B8]">
          AutismAI is a support tool, not a medical or diagnostic service. In
          a crisis, please contact a professional or local emergency
          services.
        </p>
      </footer>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;600;700&family=Lexend:wght@400;500;600&display=swap");
      `}</style>
    </div>
  );
}