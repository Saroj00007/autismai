import { NextResponse } from "next/server";
import { auth } from "@/src/auth";

const PROTECTED = ["/chatui"];

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isProtected = PROTECTED.some(
    (p) => path === p || path.startsWith(p + "/"),
  );
  if (!isProtected) return NextResponse.next();

  if (!req.auth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/|api/|favicon|.*\\..*).*)"],
};
