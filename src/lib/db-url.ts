/** Neon / Vercel Marketplace connection string, read at runtime (not inlined). */
const URL_KEYS = [
  "DATABASE_URL",
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "DATABASE_URL_UNPOOLED",
  "POSTGRES_URL_NON_POOLING",
] as const;

export function readDatabaseUrl(): string | undefined {
  if (typeof process === "undefined") return undefined;
  const env = process.env as Record<string, string | undefined>;
  for (const key of URL_KEYS) {
    const value = env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

export function hasDatabaseUrl(): boolean {
  return Boolean(readDatabaseUrl());
}
