"use server";

import { cookies } from "next/headers";
import { decodeToken } from "./jwt";
import { AUTH_COOKIE } from "./config";

export const requestHasValidToken = () => {
  /**
   * Returns request has valid token or no
   */
  const cookie = cookies().get(AUTH_COOKIE.ACCESS_TOKEN)?.value;
  const session = decodeToken(cookie);

  if (session === undefined) {
    return;
  }

  const now = Date.now();
  const exp = session.exp || 0;

  // Token should not be expired
  return now > exp;
};
