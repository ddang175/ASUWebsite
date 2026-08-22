import { useState, useEffect } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';
import { replaceImage, deleteImage, validateImageFile } from '../../lib/supabase/storage';

interface ImageRow {
  id: string;
  url: string;
  storage_path: string;
  alt_text: string;
  category: string;
  display_order: number;
  is_visible: boolean;
}

interface ImageForm {
  url: string;
  storage_path: string;
  alt_text: string;
  category: string;
  is_visible: boolean;
}

const CATEGORIES = ['polaroid', 'about', 'hero', 'newsletter', 'board', 'general'] as const;

const EMPTY_IMAGE: ImageForm = {
  url: '', storage_path: '', alt_text: '', category: 'general', is_visible: true,
};

export function ImageManager() {
  const supabase = createBrowserClient();
  const [images, setImages] = useState<ImageRow[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<ImageForm>(EMPTY_IMAGE);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => { loadImages(); }, []);

  async function loadImages() {
    const { data } = await supabase
      .from('images')
      .select('*')
      .order('display_order');
    if (data) setImages(data);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function startEdit(image: ImageRow) {
    setEditing(image.id);
    setForm({
      url: image.url,
      storage_path: image.storage_path,
      alt_text: image.alt_text,
      category: image.category,
      is_visible: image.is_visible,
    });
    setImageFile(null);
    setAdding(false);
    setError('');
  }

  function startAdd() {
    setAdding(true);
    setEditing(null);
    setForm(EMPTY_IMAGE);
    setImageFile(null);
    setError('');
  }

  function cancel() {
    setEditing(null);
    setAdding(false);
    setForm(EMPTY_IMAGE);
    setImageFile(null);
    setError('');
  }

  async function save() {
    if (!editing && !imageFile) {
      setError('An image file is required.');
      return;
    }
    setSaving(true);
    setError('');

    let url = form.url;
    let storagePath = form.storage_path;

    if (imageFile) {
      const validationError = validateImageFile(imageFile);
      if (validationError) { setError(validationError); setSaving(false); return; }
      const result = await replaceImage(supabase, 'images', storagePath || null, imageFile, form.category);
      url = result.url;
      storagePath = result.path;
    }

    const payload = {
      url,
      storage_path: storagePath,
      alt_text: form.alt_text,
      category: form.category,
      is_visible: form.is_visible,
    };

    if (editing) {
      const { error: updateError } = await supabase
        .from('images')
        .update(payload)
        .eq('id', editing);
      if (updateError) { setError(updateError.message); setSaving(false); return; }
      showToast('Image updated.');
    } else {
      const { error: insertError } = await supabase
        .from('images')
        .insert({ ...payload, display_order: images.length });
      if (insertError) { setError(insertError.message); setSaving(false); return; }
      showToast('Image added.');
    }

    await loadImages();
    cancel();
    setSaving(false);
  }

  async function remove(image: ImageRow) {
    if (!confirm(`Delete this image?`)) return;
    if (image.storage_path) {
      await deleteImage(supabase, 'images', image.storage_path);
    }
    await supabase.from('images').delete().eq('id', image.id);
    await loadImages();
    showToast('Image deleted.');
  }

  async function moveOrder(id: string, direction: -1 | 1) {
    const idx = images.findIndex((i) => i.id === id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= images.length) return;

    const updates = [
      { id: images[idx].id, display_order: images[swapIdx].display_order },
      { id: images[swapIdx].id, display_order: images[idx].display_order },
    ];

    for (const u of updates) {
      await supabase.from('images').update({ display_order: u.display_order }).eq('id', u.id);
    }
    await loadImages();
  }

  const isFormOpen = editing !== null || adding;

  return (
    <div>
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-asu-espresso text-asu-cream font-ui text-sm px-4 py-2.5 rounded shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-asu-dark">Images</h1>
          <p className="font-body text-sm text-asu-muted mt-1">{images.length} images</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={startAdd}
            className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors"
          >
            + Add Image
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-asu-card border border-asu-beige rounded-lg p-6 mb-8">
          <h2 className="font-ui text-sm font-bold text-asu-dark mb-4">
            {editing ? 'Edit Image' : 'Add Image'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Image file</label>
              <input
                type="file"
                accept="image/webp,image/jpeg,image/png"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="w-full font-body text-sm text-asu-dark"
              />
              {form.url && !imageFile && (
                <img src={form.url} alt="" className="mt-2 h-20 w-auto rounded" />
              )}
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Alt text</label>
              <input
                type="text"
                value={form.alt_text}
                onChange={(e) => setForm({ ...form, alt_text: e.target.value })}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="image-visible"
                checked={form.is_visible}
                onChange={(e) => setForm({ ...form, is_visible: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="image-visible" className="font-ui text-xs font-medium text-asu-dark">Visible</label>
            </div>
          </div>
          {error && <p className="font-ui text-xs text-asu-red mt-2">{error}</p>}
          <div className="flex gap-3 mt-4">
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={cancel}
              className="px-4 py-2 border border-asu-beige text-asu-dark font-ui text-sm rounded hover:bg-asu-beige/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, idx) => (
          <div
            key={image.id}
            className="bg-asu-card border border-asu-beige rounded-lg overflow-hidden"
          >
            <div className="aspect-square bg-asu-beige">
              {image.url && (
                <img src={image.url} alt={image.alt_text} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-3">
              <p className="font-ui text-xs font-semibold text-asu-dark truncate">{image.alt_text || '(no alt text)'}</p>
              <p className="font-body text-[11px] text-asu-muted truncate">
                {image.category}
                {!image.is_visible && <span className="ml-2 uppercase">Hidden</span>}
              </p>
              <div className="flex items-center gap-1 mt-2 flex-wrap">
                <button
                  onClick={() => moveOrder(image.id, -1)}
                  disabled={idx === 0}
                  className="p-1 text-asu-muted hover:text-asu-dark disabled:opacity-30 transition-colors"
                  aria-label="Move up"
                >↑</button>
                <button
                  onClick={() => moveOrder(image.id, 1)}
                  disabled={idx === images.length - 1}
                  className="p-1 text-asu-muted hover:text-asu-dark disabled:opacity-30 transition-colors"
                  aria-label="Move down"
                >↓</button>
                <button
                  onClick={() => startEdit(image)}
                  className="px-2 py-1 font-ui text-[11px] text-asu-dark border border-asu-beige rounded hover:border-asu-red/30 transition-colors"
                >Edit</button>
                <button
                  onClick={() => remove(image)}
                  className="px-2 py-1 font-ui text-[11px] text-asu-red border border-asu-red/30 rounded hover:bg-asu-red hover:text-asu-cream transition-colors"
                >Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
