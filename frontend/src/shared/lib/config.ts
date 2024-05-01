export const AUTH_COOKIE = {
  ACCESS_TOKEN:
    process.env.NEXT_PUBLIC_AUTH_COOKIE_ACCESS_TOKEN || "access_token",
  USER: process.env.NEXT_PUBLIC_AUTH_COOKIE_USER || "user",
  // TODO: Refresh token is not used
  REFRESH_TOKEN:
    process.env.NEXT_PUBLIC_AUTH_COOKIE_REFRESH_TOKEN || "refresh_token",
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/";

export const PRODUCTION_MODE = process.env.NODE_ENV === "production";
