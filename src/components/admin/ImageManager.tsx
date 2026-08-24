import { useState, useEffect } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';
import { replaceImage, validateImageFile } from '../../lib/supabase/storage';

interface ImageRow {
  id: string;
  url: string;
  storage_path: string;
  alt_text: string;
  caption: string;
  category: string;
  location_key: string | null;
  display_order: number;
  is_visible: boolean;
}

const SECTION_CONFIG = [
  {
    key: 'polaroid',
    title: 'Home — Polaroid Grid',
    description: 'The scattered photo cards on the homepage hero section. Each card shows an image, title, and date.',
    filterFn: (img: ImageRow) => img.location_key?.startsWith('polaroid-'),
    showCaption: true,
    captionLabel: 'Date text',
    altLabel: 'Title',
  },
  {
    key: 'about',
    title: 'About Page',
    description: 'Images used on the About Us page.',
    filterFn: (img: ImageRow) => img.location_key?.startsWith('about-'),
    showCaption: false,
    captionLabel: '',
    altLabel: 'Label',
  },
  {
    key: 'board',
    title: 'Board Page',
    description: 'Team photo shown on the Executive Board page hero. Individual officer photos are managed in the Officers section.',
    filterFn: (img: ImageRow) => img.location_key === 'board-hero',
    showCaption: false,
    captionLabel: '',
    altLabel: 'Label',
  },
  {
    key: 'newsletter',
    title: 'Newsletter Page',
    description: 'Hero image on the Newsletter signup page.',
    filterFn: (img: ImageRow) => img.location_key === 'newsletter-hero',
    showCaption: false,
    captionLabel: '',
    altLabel: 'Label',
  },
  {
    key: 'feedback',
    title: 'Feedback Page',
    description: 'Hero image on the Feedback page.',
    filterFn: (img: ImageRow) => img.location_key === 'feedback-hero',
    showCaption: false,
    captionLabel: '',
    altLabel: 'Label',
  },
] as const;

const LOCATION_LABELS: Record<string, string> = {
  'polaroid-1': 'Polaroid #1 — Top left',
  'polaroid-2': 'Polaroid #2 — Upper left',
  'polaroid-3': 'Polaroid #3 — Middle left',
  'polaroid-4': 'Polaroid #4 — Mid-lower left',
  'polaroid-5': 'Polaroid #5 — Bottom left',
  'polaroid-6': 'Polaroid #6 — Lower left',
  'polaroid-7': 'Polaroid #7 — Top center-left',
  'polaroid-8': 'Polaroid #8 — Top center-right',
  'polaroid-9': 'Polaroid #9 — Upper right',
  'polaroid-10': 'Polaroid #10 — Top right',
  'polaroid-11': 'Polaroid #11 — Mid right',
  'polaroid-12': 'Polaroid #12 — Middle right',
  'polaroid-13': 'Polaroid #13 — Bottom right',
  'polaroid-14': 'Polaroid #14 — Lower right',
  'about-hero': 'About — Hero Image',
  'about-portrait': 'About — Who We Are Portrait (3:4)',
  'about-landscape': 'About — Who We Are Landscape (4:3)',
  'board-hero': 'Board — Team Photo',
  'newsletter-hero': 'Newsletter — Hero Image',
  'feedback-hero': 'Feedback — Hero Image',
};

export function ImageManager() {
  const supabase = createBrowserClient();
  const [images, setImages] = useState<ImageRow[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ alt_text: '', caption: '' });
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
    setEditingId(image.id);
    setForm({ alt_text: image.alt_text, caption: image.caption });
    setImageFile(null);
    setError('');
  }

  function cancel() {
    setEditingId(null);
    setForm({ alt_text: '', caption: '' });
    setImageFile(null);
    setError('');
  }

  async function save(image: ImageRow) {
    setSaving(true);
    setError('');

    let url = image.url;
    let storagePath = image.storage_path;

    if (imageFile) {
      const validationError = validateImageFile(imageFile);
      if (validationError) { setError(validationError); setSaving(false); return; }
      const result = await replaceImage(
        supabase, 'images', storagePath || null, imageFile,
        image.location_key?.startsWith('polaroid') ? 'polaroids' : 'pages'
      );
      url = result.url;
      storagePath = result.path;
    }

    const { error: updateError } = await supabase
      .from('images')
      .update({
        url,
        storage_path: storagePath,
        alt_text: form.alt_text,
        caption: form.caption,
      })
      .eq('id', image.id);

    if (updateError) { setError(updateError.message); setSaving(false); return; }

    await loadImages();
    cancel();
    setSaving(false);
    showToast('Image updated.');
  }

  return (
    <div>
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-asu-espresso text-asu-cream font-ui text-sm px-4 py-2.5 rounded shadow-lg">
          {toast}
        </div>
      )}

      <div className="mb-8">
        <h1 className="font-display text-3xl text-asu-dark">Site Images</h1>
        <p className="font-body text-sm text-asu-muted mt-1">
          Edit images across the website. Each image is labeled with where it appears on the site.
        </p>
      </div>

      {SECTION_CONFIG.map((section) => {
        const sectionImages = images.filter(section.filterFn);
        if (sectionImages.length === 0) return null;

        return (
          <div key={section.key} className="mb-10">
            <div className="mb-4 border-b border-asu-beige pb-2">
              <h2 className="font-display text-xl text-asu-dark">{section.title}</h2>
              <p className="font-body text-xs text-asu-muted mt-0.5">{section.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectionImages.map((image) => {
                const isEditing = editingId === image.id;
                const locationLabel = LOCATION_LABELS[image.location_key ?? ''] ?? image.location_key ?? '';

                return (
                  <div
                    key={image.id}
                    className="bg-asu-card border border-asu-beige rounded-lg overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video bg-asu-beige relative">
                      {image.url && (
                        <img src={image.url} alt={image.alt_text} className="w-full h-full object-cover" />
                      )}
                      <span className="absolute bottom-1 left-1 bg-asu-espresso/80 text-asu-cream font-ui text-[10px] px-2 py-0.5 rounded">
                        {locationLabel}
                      </span>
                    </div>

                    <div className="p-3">
                      {isEditing ? (
                        /* Edit form */
                        <div className="space-y-3">
                          <div>
                            <label className="block font-ui text-[11px] font-medium text-asu-dark mb-0.5">
                              Replace image
                            </label>
                            <input
                              type="file"
                              accept="image/webp,image/jpeg,image/png"
                              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                              className="w-full font-body text-xs text-asu-dark"
                            />
                          </div>
                          <div>
                            <label className="block font-ui text-[11px] font-medium text-asu-dark mb-0.5">
                              {section.altLabel}
                            </label>
                            <input
                              type="text"
                              value={form.alt_text}
                              onChange={(e) => setForm({ ...form, alt_text: e.target.value })}
                              className="w-full px-2 py-1.5 border border-asu-beige rounded bg-asu-ivory font-body text-xs text-asu-dark focus:outline-none focus:border-asu-red"
                            />
                          </div>
                          {section.showCaption && (
                            <div>
                              <label className="block font-ui text-[11px] font-medium text-asu-dark mb-0.5">
                                {section.captionLabel}
                              </label>
                              <input
                                type="text"
                                value={form.caption}
                                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                                className="w-full px-2 py-1.5 border border-asu-beige rounded bg-asu-ivory font-body text-xs text-asu-dark focus:outline-none focus:border-asu-red"
                              />
                            </div>
                          )}
                          {error && <p className="font-ui text-[11px] text-asu-red">{error}</p>}
                          <div className="flex gap-2">
                            <button
                              onClick={() => save(image)}
                              disabled={saving}
                              className="px-3 py-1.5 bg-asu-red text-asu-cream font-ui text-[11px] font-semibold rounded hover:bg-asu-red-hover transition-colors disabled:opacity-50"
                            >
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={cancel}
                              className="px-3 py-1.5 border border-asu-beige text-asu-dark font-ui text-[11px] rounded hover:bg-asu-beige/50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Display mode */
                        <div>
                          <p className="font-ui text-xs font-semibold text-asu-dark truncate">
                            {image.alt_text || '(no label)'}
                          </p>
                          {section.showCaption && image.caption && (
                            <p className="font-body text-[11px] text-asu-muted truncate">{image.caption}</p>
                          )}
                          <button
                            onClick={() => startEdit(image)}
                            className="mt-2 px-3 py-1 font-ui text-[11px] text-asu-dark border border-asu-beige rounded hover:border-asu-red/30 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
