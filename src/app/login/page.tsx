"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { AuthShell } from "@/src/components/ui/AuthShell";
import { Button, SecondaryLink } from "@/src/components/ui/Button";
import { Alert, Input, Label } from "@/src/components/ui/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      image="child-shadow"
      imageEyebrow="Welcome back"
      imageTitle="Pick up where you left off, in your own time"
      imageSubtitle="No rush, no pressure — your conversations stay private and ready when you are."
      navbarRight={
        <>
          <span className="hidden text-sm font-medium text-ink-faint sm:inline">
            Don&apos;t have an account?
          </span>
          <SecondaryLink href="/register">Sign up</SecondaryLink>
        </>
      }
    >
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-faint">
          Sign in to return to your calm, quiet space.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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

        <Button type="submit" disabled={loading} loading={loading}>
          {loading ? "Logging in…" : "Log in"}
        </Button>
      </form>

      <p className="mt-8 text-center text-xs text-ink-faint">
        Your input and conversations remain private and secure by default.
      </p>
    </AuthShell>
  );
}
