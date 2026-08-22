import { useState, useEffect } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';

interface NavLink {
  id: string;
  label: string;
  href: string;
  is_external: boolean;
  display_order: number;
  is_visible: boolean;
  parent_group: string | null;
}

interface NavForm {
  label: string;
  href: string;
  is_external: boolean;
  is_visible: boolean;
  parent_group: string;
}

const EMPTY_LINK: NavForm = {
  label: '', href: '', is_external: false, is_visible: true, parent_group: '',
};

export function NavManager() {
  const supabase = createBrowserClient();
  const [links, setLinks] = useState<NavLink[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<NavForm>(EMPTY_LINK);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => { loadLinks(); }, []);

  async function loadLinks() {
    const { data } = await supabase
      .from('nav_links')
      .select('*')
      .order('display_order');
    if (data) setLinks(data);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function startEdit(link: NavLink) {
    setEditing(link.id);
    setForm({
      label: link.label,
      href: link.href,
      is_external: link.is_external,
      is_visible: link.is_visible,
      parent_group: link.parent_group ?? '',
    });
    setAdding(false);
    setError('');
  }

  function startAdd() {
    setAdding(true);
    setEditing(null);
    setForm(EMPTY_LINK);
    setError('');
  }

  function cancel() {
    setEditing(null);
    setAdding(false);
    setForm(EMPTY_LINK);
    setError('');
  }

  async function save() {
    if (!form.label || !form.href) {
      setError('Label and href are required.');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      label: form.label,
      href: form.href,
      is_external: form.is_external,
      is_visible: form.is_visible,
      parent_group: form.parent_group || null,
    };

    if (editing) {
      const { error: updateError } = await supabase
        .from('nav_links')
        .update(payload)
        .eq('id', editing);
      if (updateError) { setError(updateError.message); setSaving(false); return; }
      showToast('Nav link updated.');
    } else {
      const { error: insertError } = await supabase
        .from('nav_links')
        .insert({ ...payload, display_order: links.length });
      if (insertError) { setError(insertError.message); setSaving(false); return; }
      showToast('Nav link added.');
    }

    await loadLinks();
    cancel();
    setSaving(false);
  }

  async function remove(link: NavLink) {
    if (!confirm(`Delete "${link.label}"?`)) return;
    await supabase.from('nav_links').delete().eq('id', link.id);
    await loadLinks();
    showToast('Nav link deleted.');
  }

  async function moveOrder(id: string, direction: -1 | 1) {
    const idx = links.findIndex((l) => l.id === id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= links.length) return;

    const updates = [
      { id: links[idx].id, display_order: links[swapIdx].display_order },
      { id: links[swapIdx].id, display_order: links[idx].display_order },
    ];

    for (const u of updates) {
      await supabase.from('nav_links').update({ display_order: u.display_order }).eq('id', u.id);
    }
    await loadLinks();
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
          <h1 className="font-display text-3xl text-asu-dark">Navigation</h1>
          <p className="font-body text-sm text-asu-muted mt-1">{links.length} links</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={startAdd}
            className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors"
          >
            + Add Link
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-asu-card border border-asu-beige rounded-lg p-6 mb-8">
          <h2 className="font-ui text-sm font-bold text-asu-dark mb-4">
            {editing ? 'Edit Link' : 'Add Link'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Label</label>
              <input
                type="text"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Href</label>
              <input
                type="text"
                value={form.href}
                onChange={(e) => setForm({ ...form, href: e.target.value })}
                placeholder="/about or https://..."
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Parent group</label>
              <input
                type="text"
                value={form.parent_group}
                onChange={(e) => setForm({ ...form, parent_group: e.target.value })}
                placeholder="About, Join, Connect (or empty)"
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div className="flex items-center gap-6 pt-6">
              <label className="flex items-center gap-2 font-ui text-xs font-medium text-asu-dark">
                <input
                  type="checkbox"
                  checked={form.is_external}
                  onChange={(e) => setForm({ ...form, is_external: e.target.checked })}
                  className="w-4 h-4"
                />
                External link
              </label>
              <label className="flex items-center gap-2 font-ui text-xs font-medium text-asu-dark">
                <input
                  type="checkbox"
                  checked={form.is_visible}
                  onChange={(e) => setForm({ ...form, is_visible: e.target.checked })}
                  className="w-4 h-4"
                />
                Visible
              </label>
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

      <div className="space-y-2">
        {links.map((link, idx) => (
          <div
            key={link.id}
            className="flex items-center gap-4 p-4 bg-asu-card border border-asu-beige rounded-lg"
          >
            <div className="flex-1 min-w-0">
              <p className="font-ui text-sm font-semibold text-asu-dark truncate">
                {link.label}
                {!link.is_visible && (
                  <span className="ml-2 font-ui text-[10px] uppercase text-asu-muted">Hidden</span>
                )}
              </p>
              <p className="font-body text-xs text-asu-muted truncate">
                {link.href} {link.parent_group ? `· ${link.parent_group}` : ''} {link.is_external ? '· external' : ''}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => moveOrder(link.id, -1)}
                disabled={idx === 0}
                className="p-1.5 text-asu-muted hover:text-asu-dark disabled:opacity-30 transition-colors"
                aria-label="Move up"
              >↑</button>
              <button
                onClick={() => moveOrder(link.id, 1)}
                disabled={idx === links.length - 1}
                className="p-1.5 text-asu-muted hover:text-asu-dark disabled:opacity-30 transition-colors"
                aria-label="Move down"
              >↓</button>
              <button
                onClick={() => startEdit(link)}
                className="px-3 py-1.5 font-ui text-xs text-asu-dark border border-asu-beige rounded hover:border-asu-red/30 transition-colors"
              >Edit</button>
              <button
                onClick={() => remove(link)}
                className="px-3 py-1.5 font-ui text-xs text-asu-red border border-asu-red/30 rounded hover:bg-asu-red hover:text-asu-cream transition-colors"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
