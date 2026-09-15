import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ImagePlus, KeyRound, LogOut, PencilLine } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import {
  COPY_FIELDS,
  COPY_GROUPS,
  defaultCopyMap,
  parseAddonPrices,
  parseBoardingPrices,
  parseGroomPrices,
  type AddonPrice,
  type BoardingPrice,
  type GroomPrice,
} from "@/lib/cms";
import { compressImage } from "@/lib/cms-image";
import {
  adminLogin,
  adminLogout,
  deleteStudioPhoto,
  getAdminSession,
  getStudioData,
  saveStudioCopy,
  toggleBuiltinPhoto,
  uploadStudioPhoto,
} from "@/lib/cms.functions";
import { clearStudioToken, writeStudioToken } from "@/lib/cms-middleware";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Studio = Awaited<ReturnType<typeof getStudioData>>;

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () =>
    pageHead({
      title: "Studio desk | Barkly's",
      description: "Private studio desk for Barkly’s website photos and copy.",
      path: "/admin",
      noIndex: true,
    }),
  loader: async () => {
    const session = await getAdminSession();
    if (!session.ok) return { ok: false as const, studio: null };
    const studio = await getStudioData();
    return { ok: true as const, studio };
  },
});

function AdminPage() {
  const data = Route.useLoaderData();
  if (!data.ok || !data.studio) return <LoginCard />;
  return <StudioDesk studio={data.studio} />;
}

function LoginCard() {
  const router = useRouter();
  const login = useServerFn(adminLogin);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await login({ data: { password } });
      if (!result.ok) {
        setError(result.error ?? "That password does not match.");
        return;
      }
      if (result.token) writeStudioToken(result.token);
      await router.invalidate({ sync: true });
    } catch {
      setError("Could not sign in just now. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex flex-1 flex-col items-center px-4 py-16 sm:px-6">
      <BrandLogo className="h-20 w-auto" />
      <div className="mt-8 w-full max-w-md rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
          Private
        </p>
        <h1 className="mt-2 font-display text-3xl">Studio desk</h1>
        <p className="mt-2 text-sm text-muted">
          Add gallery photos and edit website copy. Visitors never see this page.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4 text-left">
          <div>
            <Label htmlFor="studio-password" className="text-left">
              Password
            </Label>
            <Input
              id="studio-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="text-left"
              required
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-red-700">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            <KeyRound className="size-4" />
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}

function StudioDesk({ studio }: { studio: Studio }) {
  const router = useRouter();
  const logout = useServerFn(adminLogout);
  const [tab, setTab] = useState<"photos" | "copy">("photos");

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal-deep uppercase">
            Barkly’s
          </p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl">Studio desk</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Changes go live on the public site as soon as you save. This page is
            not linked in the menu.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={async () => {
            clearStudioToken();
            await logout();
            await router.invalidate({ sync: true });
          }}
        >
          <LogOut className="size-4" />
          Sign out
        </Button>
      </div>

      <div className="mt-8 flex justify-center gap-2 rounded-full border border-line bg-paper p-1 sm:justify-start">
        <TabButton active={tab === "photos"} onClick={() => setTab("photos")}>
          <ImagePlus className="size-4" />
          Photos
        </TabButton>
        <TabButton active={tab === "copy"} onClick={() => setTab("copy")}>
          <PencilLine className="size-4" />
          Copy & prices
        </TabButton>
      </div>

      <div className="mt-8">
        {tab === "photos" ? (
          <PhotosPanel photos={studio.photos} />
        ) : (
          <CopyPanel initial={studio.copy} />
        )}
      </div>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors sm:flex-none",
        active ? "bg-navy text-paper" : "text-navy/70 hover:text-navy",
      )}
    >
      {children}
    </button>
  );
}

function PhotosPanel({ photos }: { photos: Studio["photos"] }) {
  const router = useRouter();
  const upload = useServerFn(uploadStudioPhoto);
  const remove = useServerFn(deleteStudioPhoto);
  const toggle = useServerFn(toggleBuiltinPhoto);
  const [name, setName] = useState("");
  const [alt, setAlt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const uploads = photos.filter((photo) => photo.kind === "upload");
  const builtins = photos.filter((photo) => photo.kind === "builtin");

  async function onUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Choose a photo first.");
      return;
    }
    setPending(true);
    setError("");
    setStatus("Shrinking photo…");
    try {
      const compressed = await compressImage(file);
      setStatus("Saving…");
      await upload({
        data: {
          name: name.trim() || file.name.replace(/\.[^.]+$/, ""),
          alt: alt.trim(),
          mime: compressed.mime,
          dataBase64: compressed.base64,
        },
      });
      setName("");
      setAlt("");
      setFile(null);
      setStatus("Photo added to the gallery.");
      await router.invalidate({ sync: true });
    } catch (err) {
      setStatus("");
      setError(err instanceof Error ? err.message : "Could not save that photo.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-10">
      <form
        onSubmit={onUpload}
        className="rounded-2xl border border-line bg-paper p-5 text-left shadow-card sm:p-6"
      >
        <h2 className="font-display text-2xl">Add a photo</h2>
        <p className="mt-1 text-sm text-muted">
          JPEG, PNG, or HEIC from your phone is fine — we’ll shrink it before it
          saves. New photos appear first in the gallery.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="photo-file" className="text-left">
              Photo
            </Label>
            <Input
              id="photo-file"
              type="file"
              accept="image/*"
              className="text-left file:mr-3 file:rounded-md file:border-0 file:bg-sky/40 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-navy"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              required
            />
          </div>
          <div>
            <Label htmlFor="photo-name" className="text-left">
              Name on the gallery
            </Label>
            <Input
              id="photo-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="text-left"
              placeholder="Angel"
            />
          </div>
          <div>
            <Label htmlFor="photo-alt" className="text-left">
              Short description
            </Label>
            <Input
              id="photo-alt"
              value={alt}
              onChange={(event) => setAlt(event.target.value)}
              className="text-left"
              placeholder="Merle Aussie in a blue bandana"
            />
          </div>
        </div>
        {error ? (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        {status ? <p className="mt-4 text-sm text-teal-deep">{status}</p> : null}
        <Button type="submit" className="mt-5" disabled={pending}>
          {pending ? "Uploading…" : "Add to gallery"}
        </Button>
      </form>

      <section>
        <h2 className="font-display text-2xl">Your uploads</h2>
        {uploads.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No new photos yet.</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uploads.map((photo) => (
              <li
                key={photo.src}
                className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card"
              >
                <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover" />
                <div className="p-3 text-center">
                  <p className="font-display text-lg italic">{photo.name}</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={async () => {
                      if (photo.id == null) return;
                      if (!window.confirm(`Remove ${photo.name} from the gallery?`)) return;
                      await remove({ data: { id: photo.id } });
                      await router.invalidate({ sync: true });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl">Original gallery</h2>
        <p className="mt-1 text-sm text-muted">
          Hide a built-in photo if you no longer want it on the public gallery.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {builtins.map((photo) => (
            <li
              key={photo.src}
              className={cn(
                "overflow-hidden rounded-2xl border border-line bg-paper shadow-card",
                photo.hidden && "opacity-50",
              )}
            >
              <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover" />
              <div className="p-3 text-center">
                <p className="font-display text-lg italic">{photo.name}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={async () => {
                    await toggle({
                      data: { src: photo.src, hidden: !photo.hidden },
                    });
                    await router.invalidate({ sync: true });
                  }}
                >
                  {photo.hidden ? "Show again" : "Hide"}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function CopyPanel({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const save = useServerFn(saveStudioCopy);
  const defaults = useMemo(() => defaultCopyMap(), []);
  const [copy, setCopy] = useState(() => ({ ...defaults, ...initial }));
  const [groom, setGroom] = useState<GroomPrice[]>(() => parseGroomPrices(copy));
  const [addons, setAddons] = useState<AddonPrice[]>(() => parseAddonPrices(copy));
  const [boarding, setBoarding] = useState<BoardingPrice[]>(() =>
    parseBoardingPrices(copy),
  );
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function setField(key: string, value: string) {
    setCopy((current) => ({ ...current, [key]: value }));
  }

  async function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setStatus("");
    try {
      const entries = {
        ...copy,
        "prices.groom": JSON.stringify(groom),
        "prices.addons": JSON.stringify(addons),
        "prices.boarding": JSON.stringify(boarding),
      };
      await save({ data: { entries } });
      setStatus("Saved. The public pages now use this copy.");
      await router.invalidate({ sync: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save copy.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSave} className="space-y-8 text-left">
      {COPY_GROUPS.map((group) => (
        <fieldset
          key={group}
          className="rounded-2xl border border-line bg-paper p-5 shadow-card sm:p-6"
        >
          <legend className="px-2 font-display text-2xl">{group}</legend>
          <div className="mt-4 space-y-4">
            {COPY_FIELDS.filter((field) => field.group === group).map((field) => (
              <div key={field.key}>
                <Label htmlFor={field.key} className="text-left">
                  {field.label}
                </Label>
                {field.multiline ? (
                  <Textarea
                    id={field.key}
                    rows={4}
                    value={copy[field.key] ?? field.defaultValue}
                    onChange={(event) => setField(field.key, event.target.value)}
                    className="text-left"
                  />
                ) : (
                  <Input
                    id={field.key}
                    value={copy[field.key] ?? field.defaultValue}
                    onChange={(event) => setField(field.key, event.target.value)}
                    className="text-left"
                  />
                )}
              </div>
            ))}
          </div>
        </fieldset>
      ))}

      <fieldset className="rounded-2xl border border-line bg-paper p-5 shadow-card sm:p-6">
        <legend className="px-2 font-display text-2xl">Grooming prices</legend>
        <div className="mt-4 space-y-3">
          {groom.map((row, index) => (
            <div key={`groom-${index}`} className="grid gap-2 sm:grid-cols-3">
              <Input
                aria-label={`Groom size ${index + 1}`}
                value={row.size}
                className="text-left"
                onChange={(event) =>
                  setGroom((rows) =>
                    rows.map((item, i) =>
                      i === index ? { ...item, size: event.target.value } : item,
                    ),
                  )
                }
              />
              <Input
                aria-label={`Groom weight ${index + 1}`}
                value={row.range}
                className="text-left"
                onChange={(event) =>
                  setGroom((rows) =>
                    rows.map((item, i) =>
                      i === index ? { ...item, range: event.target.value } : item,
                    ),
                  )
                }
              />
              <Input
                aria-label={`Groom price ${index + 1}`}
                value={row.price}
                className="text-left"
                onChange={(event) =>
                  setGroom((rows) =>
                    rows.map((item, i) =>
                      i === index ? { ...item, price: event.target.value } : item,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-line bg-paper p-5 shadow-card sm:p-6">
        <legend className="px-2 font-display text-2xl">Add-ons</legend>
        <div className="mt-4 space-y-3">
          {addons.map((row, index) => (
            <div key={`addon-${index}`} className="grid gap-2 sm:grid-cols-2">
              <Input
                aria-label={`Add-on name ${index + 1}`}
                value={row.name}
                className="text-left"
                onChange={(event) =>
                  setAddons((rows) =>
                    rows.map((item, i) =>
                      i === index ? { ...item, name: event.target.value } : item,
                    ),
                  )
                }
              />
              <Input
                aria-label={`Add-on price ${index + 1}`}
                value={row.from}
                className="text-left"
                onChange={(event) =>
                  setAddons((rows) =>
                    rows.map((item, i) =>
                      i === index ? { ...item, from: event.target.value } : item,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-line bg-paper p-5 shadow-card sm:p-6">
        <legend className="px-2 font-display text-2xl">Boarding rates</legend>
        <div className="mt-4 space-y-3">
          {boarding.map((row, index) => (
            <div key={`board-${index}`} className="grid gap-2 sm:grid-cols-3">
              <Input
                aria-label={`Boarding name ${index + 1}`}
                value={row.name}
                className="text-left"
                onChange={(event) =>
                  setBoarding((rows) =>
                    rows.map((item, i) =>
                      i === index ? { ...item, name: event.target.value } : item,
                    ),
                  )
                }
              />
              <Input
                aria-label={`Boarding price ${index + 1}`}
                value={row.price}
                className="text-left"
                onChange={(event) =>
                  setBoarding((rows) =>
                    rows.map((item, i) =>
                      i === index ? { ...item, price: event.target.value } : item,
                    ),
                  )
                }
              />
              <Input
                aria-label={`Boarding note ${index + 1}`}
                value={row.note}
                className="text-left"
                onChange={(event) =>
                  setBoarding((rows) =>
                    rows.map((item, i) =>
                      i === index ? { ...item, note: event.target.value } : item,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </fieldset>

      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {status ? <p className="text-sm text-teal-deep">{status}</p> : null}

      <div className="sticky bottom-4 z-10">
        <Button type="submit" size="lg" className="w-full shadow-soft sm:w-auto" disabled={pending}>
          {pending ? "Saving…" : "Save copy"}
        </Button>
      </div>
    </form>
  );
}
