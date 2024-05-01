import { NextRequest, NextResponse } from "next/server";

import {
  ROUTES,
  ROUTES_GUEST_ONLY,
  ROUTES_PROTECTED,
} from "@/shared/lib/routes";
import { requestHasValidToken } from "./shared/lib";

export default async function middleware(req: NextRequest) {
  /**
   *  Protection middleware
   *  Handles cases where user is not authenticated or already authenticated
   */
  const path = req.nextUrl.pathname;
  const isProtected = ROUTES_PROTECTED.includes(path);
  const isPublic = ROUTES_GUEST_ONLY.includes(path);
  const isAuthenticated = requestHasValidToken();

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, req.nextUrl));
  }

  if (
    isPublic &&
    isAuthenticated &&
    !req.nextUrl.pathname.startsWith(ROUTES.DASHBOARD)
  ) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
