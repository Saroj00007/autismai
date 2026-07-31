import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
