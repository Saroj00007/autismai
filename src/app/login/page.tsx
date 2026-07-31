// "use client";

// import React from "react";
// import { useState } from "react";
// import { signIn } from "next-auth/react";

// export default function Login() {
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [loading, setloading] = useState(false);

  

//   async function login_handler(e: React.FormEvent) {
//     e.preventDefault();

//     setloading(true);

//     const result = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });
    
//     setloading(false);
    
//     if (result?.error) {
//       console.log(result.error);
//       return;
//     }

//     window.location.href = "/dashboard";
//     // router.push("/dashboard")
//   }

//   return (
//     <form onSubmit={login_handler}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setemail(e.target.value)}
//         placeholder="Email"
//       />

//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setpassword(e.target.value)}
//         placeholder="Password"
//       />

//       <button type="submit" disabled={loading}>
//         {loading ? "loagging in ..." : "log in"}
//       </button>
//     </form>
//   );
// }


"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  async function login_handler(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setloading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        console.log(result.error);
        return;
      }

      window.location.href = "/dashboard";
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] font-[Lexend] text-[#1E293B]">
      {/* Top Navbar */}
      <header className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5 sm:px-10">
        <a
          href="/"
          className="cursor-pointer font-[Atkinson_Hyperlegible] text-xl font-semibold tracking-tight text-[#0F172A]"
        >
          AutismAI
        </a>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-medium text-[#64748B] sm:inline">
            Don't have an account?
          </span>
          <a
            href="/register"
            className="cursor-pointer rounded-xl border border-[#CBD5E1] bg-white px-4 py-1.5 text-sm font-medium text-[#475569] shadow-xs transition-all hover:bg-[#F1F5F9] hover:text-[#0F172A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          >
            Sign up
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex flex-1 items-center justify-center px-6 py-12 sm:py-20">
        <div className="relative w-full max-w-md">
          {/* Subtle Glow backdrop */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-[#3B82F6]/15 blur-2xl transition-all duration-500 motion-safe:animate-pulse" />

          {/* Form Card */}
          <div className="rounded-3xl border border-[#E2E8F0] bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-md sm:p-10">
            <div className="text-center">
              <h1 className="font-[Atkinson_Hyperlegible] text-2xl font-semibold leading-tight text-[#0F172A] sm:text-3xl">
                Welcome back
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                Sign in to return to your calm, quiet space.
              </p>
            </div>

            <form onSubmit={login_handler} className="mt-8 space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold tracking-[0.1em] text-[#64748B] uppercase"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#FAF8F5]/80 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all focus:border-[#3B82F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold tracking-[0.1em] text-[#64748B] uppercase"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#FAF8F5]/80 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all focus:border-[#3B82F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-center text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group cursor-pointer relative flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0F172A] py-3.5 font-[Lexend] text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1E293B] hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#93C5FD] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span>Logging in…</span>
                ) : (
                  <>
                    <span className="tracking-wide">Log in</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 transition-transform duration-300 group-hover:translate-x-1">
                      <svg
                        className="h-3.5 w-3.5 stroke-current text-white"
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
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-[#64748B]">
              Your input and conversations remain private and secure by default.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white/40 px-6 py-6 text-center">
        <p className="text-xs text-[#94A3B8]">
          AutismAI is a support tool, not a medical or diagnostic service.
        </p>
      </footer>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;600;700&family=Lexend:wght@400;500;600&display=swap");
      `}</style>
    </div>
  );
}