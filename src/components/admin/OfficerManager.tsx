import { useState, useEffect } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';
import { replaceImage, deleteImage, validateImageFile } from '../../lib/supabase/storage';

interface Officer {
  id: string;
  name: string;
  role: string;
  photo_url: string;
  photo_storage_path: string;
  country: string;
  country_label: string;
  major: string;
  hometown: string;
  year: string;
  blurb: string;
  display_order: number;
}

const EMPTY_OFFICER: Omit<Officer, 'id' | 'display_order'> = {
  name: '', role: '', photo_url: '', photo_storage_path: '',
  country: '', country_label: '', major: '', hometown: '', year: '', blurb: '',
};

export function OfficerManager() {
  const supabase = createBrowserClient();
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY_OFFICER);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => { loadOfficers(); }, []);

  async function loadOfficers() {
    const { data } = await supabase
      .from('officers')
      .select('*')
      .order('display_order');
    if (data) setOfficers(data);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function startEdit(officer: Officer) {
    setEditing(officer.id);
    setForm(officer);
    setPhotoFile(null);
    setAdding(false);
    setError('');
  }

  function startAdd() {
    setAdding(true);
    setEditing(null);
    setForm(EMPTY_OFFICER);
    setPhotoFile(null);
    setError('');
  }

  function cancel() {
    setEditing(null);
    setAdding(false);
    setForm(EMPTY_OFFICER);
    setPhotoFile(null);
    setError('');
  }

  async function save() {
    if (!form.name || !form.role) {
      setError('Name and role are required.');
      return;
    }
    setSaving(true);
    setError('');

    let photoUrl = form.photo_url;
    let photoPath = form.photo_storage_path;

    if (photoFile) {
      const validationError = validateImageFile(photoFile);
      if (validationError) { setError(validationError); setSaving(false); return; }
      const result = await replaceImage(supabase, 'images', photoPath || null, photoFile, 'officers');
      photoUrl = result.url;
      photoPath = result.path;
    }

    if (editing) {
      const { error: updateError } = await supabase
        .from('officers')
        .update({ ...form, photo_url: photoUrl, photo_storage_path: photoPath })
        .eq('id', editing);
      if (updateError) { setError(updateError.message); setSaving(false); return; }
      showToast('Officer updated.');
    } else {
      const { error: insertError } = await supabase
        .from('officers')
        .insert({ ...form, photo_url: photoUrl, photo_storage_path: photoPath, display_order: officers.length });
      if (insertError) { setError(insertError.message); setSaving(false); return; }
      showToast('Officer added.');
    }

    await loadOfficers();
    cancel();
    setSaving(false);
  }

  async function remove(officer: Officer) {
    if (!confirm(`Delete ${officer.name}?`)) return;
    if (officer.photo_storage_path) {
      await deleteImage(supabase, 'images', officer.photo_storage_path);
    }
    await supabase.from('officers').delete().eq('id', officer.id);
    await loadOfficers();
    showToast('Officer deleted.');
  }

  async function moveOrder(id: string, direction: -1 | 1) {
    const idx = officers.findIndex((o) => o.id === id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= officers.length) return;

    const updates = [
      { id: officers[idx].id, display_order: officers[swapIdx].display_order },
      { id: officers[swapIdx].id, display_order: officers[idx].display_order },
    ];

    for (const u of updates) {
      await supabase.from('officers').update({ display_order: u.display_order }).eq('id', u.id);
    }
    await loadOfficers();
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
          <h1 className="font-display text-3xl text-asu-dark">Officers</h1>
          <p className="font-body text-sm text-asu-muted mt-1">{officers.length} officers</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={startAdd}
            className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors"
          >
            + Add Officer
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-asu-card border border-asu-beige rounded-lg p-6 mb-8">
          <h2 className="font-ui text-sm font-bold text-asu-dark mb-4">
            {editing ? 'Edit Officer' : 'Add Officer'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['name', 'role', 'country', 'country_label', 'major', 'hometown', 'year'] as const).map((field) => (
              <div key={field}>
                <label className="block font-ui text-xs font-medium text-asu-dark mb-1 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  type="text"
                  value={(form as Record<string, string>)[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
                />
              </div>
            ))}
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Photo</label>
              <input
                type="file"
                accept="image/webp,image/jpeg,image/png"
                onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                className="w-full font-body text-sm text-asu-dark"
              />
              {form.photo_url && !photoFile && (
                <img src={form.photo_url} alt="" className="mt-2 h-20 w-auto rounded" />
              )}
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Bio</label>
            <textarea
              value={form.blurb}
              onChange={(e) => setForm({ ...form, blurb: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red resize-y"
            />
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
        {officers.map((officer, idx) => (
          <div
            key={officer.id}
            className="flex items-center gap-4 p-4 bg-asu-card border border-asu-beige rounded-lg"
          >
            {officer.photo_url ? (
              <img src={officer.photo_url} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-asu-beige shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-ui text-sm font-semibold text-asu-dark truncate">{officer.name}</p>
              <p className="font-body text-xs text-asu-muted truncate">{officer.role} · {officer.major}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => moveOrder(officer.id, -1)}
                disabled={idx === 0}
                className="p-1.5 text-asu-muted hover:text-asu-dark disabled:opacity-30 transition-colors"
                aria-label="Move up"
              >↑</button>
              <button
                onClick={() => moveOrder(officer.id, 1)}
                disabled={idx === officers.length - 1}
                className="p-1.5 text-asu-muted hover:text-asu-dark disabled:opacity-30 transition-colors"
                aria-label="Move down"
              >↓</button>
              <button
                onClick={() => startEdit(officer)}
                className="px-3 py-1.5 font-ui text-xs text-asu-dark border border-asu-beige rounded hover:border-asu-red/30 transition-colors"
              >Edit</button>
              <button
                onClick={() => remove(officer)}
                className="px-3 py-1.5 font-ui text-xs text-asu-red border border-asu-red/30 rounded hover:bg-asu-red hover:text-asu-cream transition-colors"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
