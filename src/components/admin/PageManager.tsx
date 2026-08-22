import { useState, useEffect } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';

interface PageRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  is_visible: boolean;
  show_in_nav: boolean;
  nav_label: string;
  nav_order: number;
}

export function PageManager() {
  const supabase = createBrowserClient();
  const [pages, setPages] = useState<PageRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, PageRow>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { loadPages(); }, []);

  async function loadPages() {
    const { data } = await supabase
      .from('pages')
      .select('*')
      .order('nav_order');
    if (data) {
      setPages(data);
      const map: Record<string, PageRow> = {};
      for (const p of data) map[p.id] = p;
      setDrafts(map);
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function updateDraft(id: string, patch: Partial<PageRow>) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function save(id: string) {
    const draft = drafts[id];
    if (!draft) return;
    setSaving(id);
    setError('');
    const { error: updateError } = await supabase
      .from('pages')
      .update({
        title: draft.title,
        description: draft.description,
        is_visible: draft.is_visible,
        show_in_nav: draft.show_in_nav,
        nav_label: draft.nav_label,
        nav_order: draft.nav_order,
      })
      .eq('id', id);
    if (updateError) { setError(updateError.message); setSaving(null); return; }
    await loadPages();
    showToast('Page updated.');
    setSaving(null);
  }

  return (
    <div>
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-asu-espresso text-asu-cream font-ui text-sm px-4 py-2.5 rounded shadow-lg">
          {toast}
        </div>
      )}

      <div className="mb-6">
        <h1 className="font-display text-3xl text-asu-dark">Pages</h1>
        <p className="font-body text-sm text-asu-muted mt-1">{pages.length} pages</p>
      </div>

      {error && <p className="font-ui text-xs text-asu-red mb-4">{error}</p>}

      <div className="space-y-4">
        {pages.map((page) => {
          const draft = drafts[page.id] ?? page;
          return (
            <div
              key={page.id}
              className="bg-asu-card border border-asu-beige rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-ui text-sm font-bold text-asu-dark">/{page.slug}</h2>
                <a
                  href={`/admin/page/${page.slug}`}
                  className="px-3 py-1.5 font-ui text-xs text-asu-dark border border-asu-beige rounded hover:border-asu-red/30 transition-colors"
                >
                  Edit content →
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Title</label>
                  <input
                    type="text"
                    value={draft.title}
                    onChange={(e) => updateDraft(page.id, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
                  />
                </div>
                <div>
                  <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Nav label</label>
                  <input
                    type="text"
                    value={draft.nav_label}
                    onChange={(e) => updateDraft(page.id, { nav_label: e.target.value })}
                    className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Description</label>
                  <textarea
                    value={draft.description}
                    onChange={(e) => updateDraft(page.id, { description: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red resize-y"
                  />
                </div>
                <div>
                  <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Nav order</label>
                  <input
                    type="number"
                    value={draft.nav_order}
                    onChange={(e) => updateDraft(page.id, { nav_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
                  />
                </div>
                <div className="flex items-center gap-6 pt-6">
                  <label className="flex items-center gap-2 font-ui text-xs font-medium text-asu-dark">
                    <input
                      type="checkbox"
                      checked={draft.is_visible}
                      onChange={(e) => updateDraft(page.id, { is_visible: e.target.checked })}
                      className="w-4 h-4"
                    />
                    Visible
                  </label>
                  <label className="flex items-center gap-2 font-ui text-xs font-medium text-asu-dark">
                    <input
                      type="checkbox"
                      checked={draft.show_in_nav}
                      onChange={(e) => updateDraft(page.id, { show_in_nav: e.target.checked })}
                      className="w-4 h-4"
                    />
                    Show in nav
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => save(page.id)}
                  disabled={saving === page.id}
                  className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors disabled:opacity-50"
                >
                  {saving === page.id ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
