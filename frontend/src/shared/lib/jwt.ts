import { JwtPayload, jwtDecode } from "jwt-decode";

function decodeToken(token: string | undefined): JwtPayload | undefined {
  /**
   * Decodes token and returns information, or undefined if it is not valid
   */
  if (!token) return undefined;

  try {
    const payload = jwtDecode(token);
    return payload;
  } catch {}

  return undefined;
}

export { decodeToken };
