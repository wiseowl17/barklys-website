import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import {
  deleteCookie,
  getCookie,
  getRequest,
  setCookie,
} from "@tanstack/react-start/server";

export const STUDIO_COOKIE = "barklys_studio";
const MAX_AGE_SEC = 60 * 60 * 24 * 14;
/** SHA-256 of the preview fallback password. Overridden by ADMIN_PASSWORD. */
const FALLBACK_PASSWORD_SHA256 =
  "84a2cb6dc8158068f7141777a458dcb20fd3de9ba04961e6ce9e40491b15bd7a";

function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function passwordDigest(): string {
  const env = process.env.ADMIN_PASSWORD?.trim();
  return env ? sha256Hex(env) : FALLBACK_PASSWORD_SHA256;
}

function signingKey(): string {
  return [
    process.env.ADMIN_SECRET?.trim() ?? "",
    process.env.ADMIN_PASSWORD?.trim() ?? "",
    process.env.DATABASE_URL?.trim() ?? "",
    passwordDigest(),
  ].join("|");
}

function equalHex(left: string, right: string): boolean {
  const a = Buffer.from(left, "hex");
  const b = Buffer.from(right, "hex");
  if (a.length !== b.length || a.length === 0) return false;
  return timingSafeEqual(a, b);
}

export function passwordMatches(input: string): boolean {
  return equalHex(sha256Hex(input), passwordDigest());
}

function sign(payload: string): string {
  return createHmac("sha256", signingKey()).update(payload).digest("hex");
}

function cookieSecure(): boolean {
  try {
    return getRequest().url.startsWith("https:");
  } catch {
    return process.env.NODE_ENV === "production";
  }
}

export function makeSessionToken(): string {
  const payload = String(Date.now() + MAX_AGE_SEC * 1000);
  return `${payload}.${sign(payload)}`;
}

export function tokenIsValid(token: string | undefined | null): boolean {
  if (!token) return false;
  const split = token.lastIndexOf(".");
  if (split <= 0) return false;
  const payload = token.slice(0, split);
  const sig = token.slice(split + 1);
  if (!equalHex(sig, sign(payload))) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() < exp;
}

export function readAdminSession(): boolean {
  return tokenIsValid(getCookie(STUDIO_COOKIE));
}

export function writeAdminSession(): string {
  const token = makeSessionToken();
  setCookie(STUDIO_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecure(),
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
  return token;
}

export function clearAdminSession(): void {
  deleteCookie(STUDIO_COOKIE, { path: "/" });
}

export function hasAdminAccess(headerToken?: string): boolean {
  return readAdminSession() || tokenIsValid(headerToken);
}

export function requireAdmin(headerToken?: string): void {
  if (!hasAdminAccess(headerToken)) {
    throw new Error("Please sign in to the studio desk.");
  }
}
