// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/router";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // yo success vaneko chai success message ho hai
//   const [success, setSuccess] = useState("");

//   const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     try {
//       e.preventDefault();

//       console.log("handel sumbit called");

//       setError("");
//       setSuccess("");

//       setLoading(true);

//       console.log(name + email + password);

//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data?.error || "Something went wrong");
//       } else {
//         setSuccess(data?.message || "Registered successfully");
//         setTimeout(() => {
//           // router.push("/login");

//           window.location.href = "/dashboard";
//         }, 1500);

//         setName("");
//         setEmail("");
//         setPassword("");
//       }
//     } catch (error) {
//       setError("something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handelSubmit}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         {error && <p className="text-sm text-red-500">{error}</p>}

//         {success && <p className="text-sm text-green-600">{success}</p>}
//         <button type="submit" disabled={loading}>
//           {loading ? "Creating account..." : "Register"}
//         </button>
//       </form>
//     </>
//   );
// }

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      setError("");
      setSuccess("");
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Something went wrong");
      } else {
        setSuccess(data?.message || "Registered successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);

        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            Already have an account?
          </span>
          <a
            href="/login"
            className="cursor-pointer rounded-xl border border-[#CBD5E1] bg-white px-4 py-1.5 text-sm font-medium text-[#475569] shadow-xs transition-all hover:bg-[#F1F5F9] hover:text-[#0F172A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          >
            Log in
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex flex-1 items-center justify-center px-6 py-12 sm:py-20">
        <div className="relative w-full max-w-md">
          {/* Subtle Glow backdrop (identical to Dashboard button glow) */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-[#3B82F6]/15 blur-2xl transition-all duration-500 motion-safe:animate-pulse" />

          {/* Form Card */}
          <div className="rounded-3xl border border-[#E2E8F0] bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-md sm:p-10">
            <div className="text-center">
              <h1 className="font-[Atkinson_Hyperlegible] text-2xl font-semibold leading-tight text-[#0F172A] sm:text-3xl">
                Create an account
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                Join AutismAI for a calm, quiet space to get clear answers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold tracking-[0.1em] text-[#64748B] uppercase"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#FAF8F5]/80 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all focus:border-[#3B82F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>

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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#FAF8F5]/80 px-4 py-3 text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all focus:border-[#3B82F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
                />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-center text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* Success Alert */}
              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-center text-xs font-medium text-emerald-700">
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group cursor-pointer relative flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0F172A] py-3.5 font-[Lexend] text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1E293B] hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#93C5FD] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span>Creating account…</span>
                ) : (
                  <>
                    <span className="tracking-wide">Create account</span>
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
              By signing up, you agree to our privacy policy. Your input is
              private and secure by default.
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
