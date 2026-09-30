import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { studioMiddleware } from "@/lib/cms-middleware";
import { SITE } from "@/lib/site";

const KINDS = ["boarding", "house_visit"] as const;

const FIELD_KEYS = [
  "service",
  "start_date",
  "end_date",
  "days",
  "dogs",
  "dog_name",
  "breed",
  "weight",
  "message",
  "area",
  "preferred_date",
  "dogs_details",
  "agreed_to_house_rules",
] as const;

const payloadSchema = z.record(z.string(), z.string().max(2000));

export type StayRequest = {
  id: number;
  kind: string;
  name: string;
  phone: string;
  email: string;
  payload: Record<string, string>;
  createdAt: string;
};

function cleanFields(raw: Record<string, string>): Record<string, string> {
  const allowed = new Set<string>(FIELD_KEYS);
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!allowed.has(key)) continue;
    const trimmed = value.trim();
    if (trimmed) fields[key] = trimmed;
  }
  return fields;
}

async function notifyByEmail(input: {
  kind: (typeof KINDS)[number];
  name: string;
  phone: string;
  email: string;
  fields: Record<string, string>;
}) {
  const body = new FormData();
  body.set(
    "_subject",
    input.kind === "boarding"
      ? "Barkly's boarding / daycare request"
      : "Barkly's house visit request",
  );
  body.set("_template", "table");
  body.set("_captcha", "false");
  body.set("_replyto", input.email);
  body.set(
    "_url",
    input.kind === "boarding"
      ? "https://www.barklysclt.com/boarding"
      : "https://www.barklysclt.com/grooming",
  );
  body.set("name", input.name);
  body.set("phone", input.phone);
  body.set("email", input.email);
  for (const [key, value] of Object.entries(input.fields)) body.set(key, value);

  const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Origin: "https://www.barklysclt.com",
      Referer:
        input.kind === "boarding"
          ? "https://www.barklysclt.com/boarding"
          : "https://www.barklysclt.com/grooming",
    },
    body,
  });
  if (!res.ok) {
    console.error("[request] email notify failed", res.status);
  }
}

export const submitStayRequest = createServerFn({ method: "POST" })
  .validator(
    z.object({
      kind: z.enum(KINDS),
      name: z.string().trim().min(1).max(120),
      phone: z.string().trim().min(7).max(40),
      email: z.string().trim().email().max(200),
      company: z.string().max(200).optional(),
      fields: payloadSchema,
    }),
  )
  .handler(async ({ data }): Promise<{ ok: true } | { ok: false; error: string }> => {
    if (data.company?.trim()) return { ok: true };
    const fields = cleanFields(data.fields);
    try {
      const { getSql } = await import("./db");
      const sql = await getSql();
      await sql.query(
        "insert into stay_requests (kind, name, phone, email, payload) values ($1, $2, $3, $4, $5)",
        [data.kind, data.name.trim(), data.phone.trim(), data.email.trim(), JSON.stringify(fields)],
      );
    } catch (err) {
      console.error("[request] save failed", err);
      return {
        ok: false,
        error: `We couldn’t save that just now. Call ${SITE.phoneDisplay} or email ${SITE.email}, then try again.`,
      };
    }
    try {
      await notifyByEmail({
        kind: data.kind,
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        fields,
      });
    } catch (err) {
      console.error("[request] email notify failed", err);
    }
    return { ok: true };
  });

export const getStayRequests = createServerFn({ method: "GET" })
  .middleware([studioMiddleware])
  .handler(async (): Promise<StayRequest[]> => {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql.query<{
      id: number;
      kind: string;
      name: string;
      phone: string;
      email: string;
      payload: string;
      created_at: string | Date;
    }>(
      "select id, kind, name, phone, email, payload, created_at from stay_requests order by created_at desc limit 40",
    );
    return rows.map((row) => {
      let payload: Record<string, string> = {};
      try {
        const parsed = JSON.parse(row.payload) as unknown;
        if (parsed && typeof parsed === "object") {
          payload = Object.fromEntries(
            Object.entries(parsed as Record<string, unknown>).map(([key, value]) => [
              key,
              String(value),
            ]),
          );
        }
      } catch {
        payload = {};
      }
      return {
        id: Number(row.id),
        kind: row.kind,
        name: row.name,
        phone: row.phone,
        email: row.email,
        payload,
        createdAt: new Date(row.created_at).toISOString(),
      };
    });
  });
