import { useState, useEffect } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';

interface ContentRow {
  id: string;
  page_slug: string;
  section_key: string;
  content_type: string;
  value: string;
  display_order: number;
}

interface Props {
  pageSlug: string;
  pageTitle?: string;
}

const CONTENT_TYPES = ['text', 'heading', 'link'] as const;

export function PageContentEditor({ pageSlug, pageTitle }: Props) {
  const supabase = createBrowserClient();
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const [newKey, setNewKey] = useState('');
  const [newType, setNewType] = useState<(typeof CONTENT_TYPES)[number]>('text');
  const [adding, setAdding] = useState(false);

  useEffect(() => { loadContent(); }, [pageSlug]);

  async function loadContent() {
    const { data } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_slug', pageSlug)
      .order('display_order');
    if (data) setRows(data);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function updateValue(id: string, value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, value } : r)));
  }

  async function saveAll() {
    setSaving(true);
    setError('');
    const { error: upsertError } = await supabase
      .from('page_content')
      .upsert(rows.map((r) => ({
        id: r.id,
        page_slug: r.page_slug,
        section_key: r.section_key,
        content_type: r.content_type,
        value: r.value,
        display_order: r.display_order,
      })));
    if (upsertError) { setError(upsertError.message); setSaving(false); return; }
    await loadContent();
    showToast('Content saved.');
    setSaving(false);
  }

  async function addBlock() {
    if (!newKey.trim()) {
      setError('Section key is required.');
      return;
    }
    setError('');
    const { error: insertError } = await supabase
      .from('page_content')
      .insert({
        page_slug: pageSlug,
        section_key: newKey.trim(),
        content_type: newType,
        value: '',
        display_order: rows.length,
      });
    if (insertError) { setError(insertError.message); return; }
    setNewKey('');
    setNewType('text');
    setAdding(false);
    await loadContent();
    showToast('Content block added.');
  }

  async function removeBlock(row: ContentRow) {
    if (!confirm(`Delete content block "${row.section_key}"?`)) return;
    await supabase.from('page_content').delete().eq('id', row.id);
    await loadContent();
    showToast('Content block deleted.');
  }

  return (
    <div>
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-asu-espresso text-asu-cream font-ui text-sm px-4 py-2.5 rounded shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <a href="/admin/pages" className="font-ui text-xs text-asu-muted hover:text-asu-dark transition-colors">← Back to Pages</a>
          <h1 className="font-display text-3xl text-asu-dark mt-1">{pageTitle ?? pageSlug}</h1>
          <p className="font-body text-sm text-asu-muted mt-1">{rows.length} content blocks</p>
        </div>
        <button
          onClick={saveAll}
          disabled={saving}
          className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save all'}
        </button>
      </div>

      {error && <p className="font-ui text-xs text-asu-red mb-4">{error}</p>}

      <div className="space-y-3 mb-8">
        {rows.map((row) => (
          <div key={row.id} className="bg-asu-card border border-asu-beige rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="font-ui text-xs font-bold text-asu-dark">
                {row.section_key} <span className="font-body font-normal text-asu-muted">({row.content_type})</span>
              </label>
              <button
                onClick={() => removeBlock(row)}
                className="font-ui text-[11px] text-asu-red hover:underline"
              >Delete</button>
            </div>
            {row.content_type === 'text' && (
              <textarea
                value={row.value}
                onChange={(e) => updateValue(row.id, e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red resize-y"
              />
            )}
            {row.content_type === 'heading' && (
              <input
                type="text"
                value={row.value}
                onChange={(e) => updateValue(row.id, e.target.value)}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            )}
            {row.content_type === 'link' && (
              <input
                type="url"
                value={row.value}
                onChange={(e) => updateValue(row.id, e.target.value)}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            )}
            {row.content_type !== 'text' && row.content_type !== 'heading' && row.content_type !== 'link' && (
              <input
                type="text"
                value={row.value}
                onChange={(e) => updateValue(row.id, e.target.value)}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            )}
          </div>
        ))}
      </div>

      {adding ? (
        <div className="bg-asu-card border border-asu-beige rounded-lg p-4">
          <h2 className="font-ui text-sm font-bold text-asu-dark mb-3">Add content block</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Section key</label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="hero_title"
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as (typeof CONTENT_TYPES)[number])}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              >
                {CONTENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={addBlock}
              className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => { setAdding(false); setNewKey(''); setError(''); }}
              className="px-4 py-2 border border-asu-beige text-asu-dark font-ui text-sm rounded hover:bg-asu-beige/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="px-4 py-2 border border-asu-beige text-asu-dark font-ui text-sm rounded hover:border-asu-red/30 transition-colors"
        >
          + Add content block
        </button>
      )}
    </div>
  );
}
