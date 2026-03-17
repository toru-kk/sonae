import { createClient } from "@/lib/supabase/client";

const MAX_SIZE = 800;
const QUALITY = 0.75;

/**
 * 画像を指定サイズ以下にリサイズし、JPEG で圧縮して Blob を返す
 */
function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > MAX_SIZE || height > MAX_SIZE) {
        const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      // 透過PNGの背景を白にする（JPEG変換時に黒くなるのを防止）
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Blob conversion failed"))),
        "image/jpeg",
        QUALITY
      );
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * 装備写真をアップロードし、公開URLを返す
 */
export async function uploadGearPhoto(
  userId: string,
  gearItemId: string,
  file: File
): Promise<string> {
  const blob = await resizeImage(file);
  const path = `${userId}/${gearItemId}.jpg`;

  const supabase = createClient();
  const { error } = await supabase.storage
    .from("gear-photos")
    .upload(path, blob, { upsert: true, contentType: "image/jpeg" });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from("gear-photos")
    .getPublicUrl(path);

  return `${publicUrl}?t=${Date.now()}`;
}

/**
 * 装備写真を削除
 */
export async function deleteGearPhoto(
  userId: string,
  gearItemId: string
): Promise<void> {
  const supabase = createClient();
  const path = `${userId}/${gearItemId}.jpg`;
  await supabase.storage.from("gear-photos").remove([path]);
}
