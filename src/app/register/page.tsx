"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/src/components/ui/AuthShell";
import { Button, SecondaryLink } from "@/src/components/ui/Button";
import { Alert, Input, Label } from "@/src/components/ui/Input";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        setError(data?.error || "Something went wrong");
        return;
      }

      setSuccess(data?.message || "Registered successfully! Redirecting…");
      setTimeout(() => router.push("/"), 1500);

      setName("");                                                                                                                      
      setEmail("");
      setPassword("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      image="child-therapist"
      imageEyebrow="Start your calm space"
      imageTitle="A space tuned to the way you think"
      imageSubtitle="Private by default, gentle by design, and ready whenever you need a steady, clear answer."
      navbarRight={
        <>
          <span className="hidden text-sm font-medium text-ink-faint sm:inline">
            Already have an account?
          </span>
          <SecondaryLink href="/login">Log in</SecondaryLink>
        </>
      }
    >
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          Create an account
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-faint">
          Join AutismAI for a calm, quiet space to get clear answers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            required
            placeholder="e.g. Alex Morgan"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <Alert kind="error">{error}</Alert>}
        {success && <Alert kind="success">{success}</Alert>}

        <Button type="submit" disabled={loading} loading={loading}>
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-8 text-center text-xs text-ink-faint">
        By signing up, you agree to our privacy policy. Your input is private
        and secure by default.
      </p>
    </AuthShell>
  );
}
