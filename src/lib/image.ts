/** ย่อรูปฝั่ง client ให้ด้านยาวสุด ≤ maxSide และแปลงเป็น JPEG base64 (ไม่มี data: prefix) */
export async function fileToResizedBase64(file: File, maxSide = 1280, quality = 0.85): Promise<{ base64: string; mediaType: "image/jpeg"; previewUrl: string }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unsupported");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  return { base64: dataUrl.split(",")[1], mediaType: "image/jpeg", previewUrl: dataUrl };
}
