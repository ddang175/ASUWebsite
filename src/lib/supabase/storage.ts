import type { SupabaseClient } from '@supabase/supabase-js';

const ALLOWED_TYPES = ['image/webp', 'image/jpeg', 'image/png'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const WEBP_QUALITY = 0.82;

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Only webp, jpg, and png images are allowed.';
  }
  if (file.size > MAX_SIZE) {
    return 'Image must be under 5MB.';
  }
  return null;
}

function convertToWebP(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (file.type === 'image/webp') {
      resolve(file);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas not supported')); return; }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('WebP conversion failed')),
        'image/webp',
        WEBP_QUALITY,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for conversion'));
    };

    img.src = url;
  });
}

export async function replaceImage(
  supabase: SupabaseClient,
  bucket: string,
  oldPath: string | null,
  newFile: File,
  category: string,
): Promise<{ url: string; path: string }> {
  const webpBlob = await convertToWebP(newFile);
  const newPath = `${category}/${crypto.randomUUID()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(newPath, webpBlob, { contentType: 'image/webp' });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(newPath);

  if (oldPath) {
    await supabase.storage.from(bucket).remove([oldPath]);
  }

  return { url: data.publicUrl, path: newPath };
}

export async function deleteImage(
  supabase: SupabaseClient,
  bucket: string,
  path: string,
): Promise<void> {
  if (!path) return;
  await supabase.storage.from(bucket).remove([path]);
}
