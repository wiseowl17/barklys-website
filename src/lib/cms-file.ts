import {
  buildPublicCms,
  builtinStudioPhotos,
  type GalleryItem,
  type MediaCollection,
  type PublicCms,
  type StudioPhoto,
} from "@/lib/cms";

export type StudioUpload = {
  id: string
  src: string
  name: string
  alt: string
}

export type StudioBucket = {
  hidden: string[]
  order: string[]
  uploads: StudioUpload[]
}

export type StudioFile = {
  copy: Record<string, string>
  gallery: StudioBucket
  hero: StudioBucket
}

export type PersistMode = "preview" | "live" | "blocked"

export function emptyBucket(): StudioBucket {
  return { hidden: [], order: [], uploads: [] };
}

export function emptyStudioFile(): StudioFile {
  return {
    copy: {},
    gallery: emptyBucket(),
    hero: emptyBucket(),
  };
}

export function parseStudioFile(raw: unknown): StudioFile {
  const value = raw && typeof raw === "object" ? (raw as Partial<StudioFile>) : {};
  return {
    copy: isStringMap(value.copy) ? value.copy : {},
    gallery: parseBucket(value.gallery),
    hero: parseBucket(value.hero),
  };
}

function isStringMap(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every((item) => typeof item === "string");
}

function parseBucket(value: unknown): StudioBucket {
  if (!value || typeof value !== "object") return emptyBucket();
  const bucket = value as Partial<StudioBucket>;
  return {
    hidden: Array.isArray(bucket.hidden)
      ? bucket.hidden.filter((item): item is string => typeof item === "string")
      : [],
    order: Array.isArray(bucket.order)
      ? bucket.order.filter((item): item is string => typeof item === "string")
      : [],
    uploads: Array.isArray(bucket.uploads) ? bucket.uploads.filter(isUpload) : [],
  };
}

function isUpload(value: unknown): value is StudioUpload {
  if (!value || typeof value !== "object") return false;
  const upload = value as Partial<StudioUpload>;
  return (
    typeof upload.id === "string" &&
    typeof upload.src === "string" &&
    typeof upload.name === "string" &&
    typeof upload.alt === "string"
  );
}

export function bucketFor(file: StudioFile, collection: MediaCollection): StudioBucket {
  return collection === "hero" ? file.hero : file.gallery;
}

export function setBucket(
  file: StudioFile,
  collection: MediaCollection,
  bucket: StudioBucket,
): StudioFile {
  return collection === "hero" ? { ...file, hero: bucket } : { ...file, gallery: bucket };
}

export function studioPhotosFromFile(
  file: StudioFile,
  collection: MediaCollection,
): StudioPhoto[] {
  const bucket = bucketFor(file, collection);
  const bySrc = new Map<string, StudioPhoto>();
  for (const [index, upload] of bucket.uploads.entries()) {
    bySrc.set(upload.src, {
      id: null,
      src: upload.src,
      name: upload.name,
      alt: upload.alt || upload.name,
      kind: "upload",
      hidden: false,
      collection,
      sort_order: index,
    });
  }
  for (const photo of builtinStudioPhotos(collection)) {
    if (bySrc.has(photo.src)) continue;
    bySrc.set(photo.src, {
      ...photo,
      hidden: bucket.hidden.includes(photo.src),
    });
  }
  const ordered: StudioPhoto[] = [];
  const seen = new Set<string>();
  for (const src of bucket.order) {
    const photo = bySrc.get(src);
    if (!photo) continue;
    ordered.push(photo);
    seen.add(src);
  }
  for (const photo of bySrc.values()) {
    if (seen.has(photo.src)) continue;
    ordered.push(photo);
  }
  return ordered.map((photo, index) => ({ ...photo, sort_order: index }));
}

export function publicFromStudioFile(file: StudioFile): PublicCms {
  const toItem = (photo: StudioPhoto): GalleryItem => ({
    src: photo.src,
    name: photo.name,
    alt: photo.alt,
  });
  return buildPublicCms(
    file.copy,
    studioPhotosFromFile(file, "gallery").filter((photo) => !photo.hidden).map(toItem),
    studioPhotosFromFile(file, "hero").filter((photo) => !photo.hidden).map(toItem),
  );
}

export function mergeStudioPhotos(
  preferred: StudioPhoto[],
  extra: StudioPhoto[],
): StudioPhoto[] {
  const bySrc = new Map<string, StudioPhoto>();
  for (const photo of extra) bySrc.set(photo.src, photo);
  for (const photo of preferred) {
    const previous = bySrc.get(photo.src);
    bySrc.set(photo.src, previous ? { ...previous, ...photo, id: photo.id ?? previous.id } : photo);
  }
  const seen = new Set<string>();
  const ordered: StudioPhoto[] = [];
  for (const photo of preferred) {
    const next = bySrc.get(photo.src);
    if (!next || seen.has(next.src)) continue;
    ordered.push(next);
    seen.add(next.src);
  }
  const prepend: StudioPhoto[] = [];
  for (const photo of extra) {
    if (seen.has(photo.src)) continue;
    prepend.push(bySrc.get(photo.src) ?? photo);
    seen.add(photo.src);
  }
  return [...prepend, ...ordered].map((photo, index) => ({ ...photo, sort_order: index }));
}

export function orderFromPhotos(photos: StudioPhoto[]): Pick<StudioBucket, "hidden" | "order"> {
  return {
    order: photos.map((photo) => photo.src),
    hidden: photos.filter((photo) => photo.hidden).map((photo) => photo.src),
  };
}
