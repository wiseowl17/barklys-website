import { createMiddleware } from "@tanstack/react-start";

const STORAGE_KEY = "barklys_studio_token";

export function readStudioToken(): string | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeStudioToken(token: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, token);
  } catch {
    // Private mode can block storage; the httpOnly cookie still covers first-party visits.
  }
}

export function clearStudioToken(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export const studioTokenMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    return next({ sendContext: { studioToken: readStudioToken() ?? undefined } });
  })
  .server(async ({ next, context }) => {
    return next({ context: { studioToken: context.studioToken } });
  });

export const studioMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    return next({ sendContext: { studioToken: readStudioToken() ?? undefined } });
  })
  .server(async ({ next, context }) => {
    const { requireAdmin } = await import("./cms-session.server");
    requireAdmin(context.studioToken);
    return next({ context: { studioToken: context.studioToken } });
  });
