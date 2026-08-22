import type { SupabaseClient } from '@supabase/supabase-js';

const ALLOWED_TYPES = ['image/webp', 'image/jpeg', 'image/png'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Only webp, jpg, and png images are allowed.';
  }
  if (file.size > MAX_SIZE) {
    return 'Image must be under 5MB.';
  }
  return null;
}

export async function replaceImage(
  supabase: SupabaseClient,
  bucket: string,
  oldPath: string | null,
  newFile: File,
  category: string,
): Promise<{ url: string; path: string }> {
  const rawExt = newFile.name.split('.').pop() ?? 'webp';
  const ext = rawExt.replace(/[^a-z0-9]/gi, '').slice(0, 5) || 'webp';
  const newPath = `${category}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(newPath, newFile, { contentType: newFile.type });

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
