"use client";

import { jwtDecode } from "jwt-decode";

export const decryptToken = (token: string | undefined) => {
  if (!token) {
    return;
  }
  try {
    return jwtDecode(token);
  } catch {
    return;
  }
};
