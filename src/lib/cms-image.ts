export async function compressImage(file: File): Promise<{
  base64: string
  mime: string
}> {
  const bitmap = await createImageBitmap(file);
  const max = 1400;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not read that photo.");
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const qualities = [0.84, 0.72, 0.58];
  let blob: Blob | null = null;
  for (const quality of qualities) {
    blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality),
    );
    if (blob && blob.size <= 280_000) break;
  }
  if (!blob) throw new Error("Could not compress that photo.");
  if (blob.size > 700_000) {
    throw new Error("That photo is still too large. Try a smaller file.");
  }

  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return { base64: btoa(binary), mime: "image/jpeg" };
}
