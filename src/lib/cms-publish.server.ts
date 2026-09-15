import { execFile } from "node:child_process";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";
import { hasDatabaseUrl } from "@/lib/db-url";
import {
  emptyStudioFile,
  parseStudioFile,
  type PersistMode,
  type StudioFile,
} from "@/lib/cms-file";
import bakedStudio from "../content/studio.json";

const execFileAsync = promisify(execFile);
const STUDIO_JSON = join(process.cwd(), "src/content/studio.json");
const STUDIO_DIR = join(process.cwd(), "public/studio");

export function persistMode(): PersistMode {
  if (hasDatabaseUrl()) return "live";
  const vercel = typeof process !== "undefined" ? process.env["VERCEL"] : undefined;
  if (vercel) return "blocked";
  return "preview";
}

export function canPersist(): boolean {
  return persistMode() !== "blocked";
}

export async function readStudioFile(): Promise<StudioFile> {
  try {
    const raw = await readFile(STUDIO_JSON, "utf8");
    return parseStudioFile(JSON.parse(raw) as unknown);
  } catch {
    return parseStudioFile(bakedStudio);
  }
}

export async function writeStudioFile(file: StudioFile): Promise<void> {
  await mkdir(join(process.cwd(), "src/content"), { recursive: true });
  await writeFile(STUDIO_JSON, `${JSON.stringify(file, null, 2)}\n`, "utf8");
}

export async function writeStudioPhoto(filename: string, bytes: Buffer): Promise<string> {
  await mkdir(STUDIO_DIR, { recursive: true });
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "");
  if (!safe) throw new Error("That photo could not be saved.");
  await writeFile(join(STUDIO_DIR, safe), bytes);
  return `/studio/${safe}`;
}

export async function removeStudioPhotoFile(src: string): Promise<void> {
  const match = src.match(/^\/studio\/([a-zA-Z0-9._-]+)$/);
  if (!match?.[1]) return;
  await unlink(join(STUDIO_DIR, match[1])).catch(() => undefined);
}

export async function publishStudio(): Promise<{ pushed: boolean }> {
  const mode = persistMode();
  if (mode === "blocked") {
    throw new Error(
      "The live website cannot store copy yet. Save from this preview, or add a free database under Vercel → Storage.",
    );
  }
  if (mode === "live") return { pushed: false };
  return pushToGithub();
}

async function pushToGithub(): Promise<{ pushed: boolean }> {
  try {
    await execFileAsync(
      "git",
      ["add", "--", "src/content/studio.json", "public/studio"],
      { cwd: process.cwd(), timeout: 20_000 },
    );
    const { stdout } = await execFileAsync(
      "git",
      ["status", "--porcelain", "--", "src/content/studio.json", "public/studio"],
      { cwd: process.cwd(), timeout: 20_000 },
    );
    if (!stdout.trim()) return { pushed: false };
    await execFileAsync(
      "git",
      ["commit", "-m", "Studio desk: publish copy and photos", "--", "src/content/studio.json", "public/studio"],
      {
        cwd: process.cwd(),
        timeout: 20_000,
        env: {
          ...process.env,
          GIT_AUTHOR_NAME: "Barklys Studio Desk",
          GIT_AUTHOR_EMAIL: "barklysclt@gmail.com",
          GIT_COMMITTER_NAME: "Barklys Studio Desk",
          GIT_COMMITTER_EMAIL: "barklysclt@gmail.com",
        },
      },
    );
    await execFileAsync("git", ["push", "origin", "HEAD"], {
      cwd: process.cwd(),
      timeout: 60_000,
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
    });
    return { pushed: true };
  } catch (err) {
    console.error("[cms] publish failed", err);
    return { pushed: false };
  }
}
