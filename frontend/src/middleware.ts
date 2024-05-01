"use client";

import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/shared/constants/cookies";
import { decryptToken } from "@/shared/lib/auth";
import { ROUTES } from "@/shared/constants/routes";

const PROTECTED = ["/dashboard"];
const PUBLIC = ["/auth/signin", "/auth/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = PROTECTED.includes(path);
  const isPublic = PUBLIC.includes(path);
  const cookie = cookies().get(AUTH_COOKIE)?.value;
  const session = decryptToken(cookie);

  if (isProtected && session === undefined) {
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublic &&
    session &&
    !req.nextUrl.pathname.startsWith(ROUTES.DASHBOARD)
  ) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
