"use client";

import React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const router = useRouter()

  async function login_handler(e: React.FormEvent) {
    e.preventDefault();

    setloading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    setloading(false);
    
    if (result?.error) {
      console.log(result.error);
      return;
    }

    window.location.href = "/dashboard";
    // router.push("/dashboard")
  }

  return (
    <form onSubmit={login_handler}>
      <input
        type="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit" disabled={loading}>
        {loading ? "loagging in ..." : "log in"}
      </button>
    </form>
  );
}
