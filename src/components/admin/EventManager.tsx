import { useState, useEffect } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';
import { replaceImage, deleteImage, validateImageFile } from '../../lib/supabase/storage';

interface EventRow {
  id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string | null;
  location: string;
  description: string;
  image_url: string;
  image_storage_path: string;
  collab: string | null;
  rsvp_url: string | null;
  tags: string[];
  is_visible: boolean;
  display_order: number;
}

interface EventForm {
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  description: string;
  image_url: string;
  image_storage_path: string;
  collab: string;
  rsvp_url: string;
  tags: string;
  is_visible: boolean;
}

const EMPTY_EVENT: EventForm = {
  title: '', date: '', start_time: '', end_time: '', location: '', description: '',
  image_url: '', image_storage_path: '', collab: '', rsvp_url: '', tags: '', is_visible: true,
};

function toForm(event: EventRow): EventForm {
  return {
    title: event.title,
    date: event.date,
    start_time: event.start_time,
    end_time: event.end_time ?? '',
    location: event.location,
    description: event.description,
    image_url: event.image_url,
    image_storage_path: event.image_storage_path,
    collab: event.collab ?? '',
    rsvp_url: event.rsvp_url ?? '',
    tags: (event.tags ?? []).join(', '),
    is_visible: event.is_visible,
  };
}

export function EventManager() {
  const supabase = createBrowserClient();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<EventForm>(EMPTY_EVENT);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => { loadEvents(); }, []);

  async function loadEvents() {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('display_order');
    if (data) setEvents(data);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function startEdit(event: EventRow) {
    setEditing(event.id);
    setForm(toForm(event));
    setImageFile(null);
    setAdding(false);
    setError('');
  }

  function startAdd() {
    setAdding(true);
    setEditing(null);
    setForm(EMPTY_EVENT);
    setImageFile(null);
    setError('');
  }

  function cancel() {
    setEditing(null);
    setAdding(false);
    setForm(EMPTY_EVENT);
    setImageFile(null);
    setError('');
  }

  async function save() {
    if (!form.title || !form.date || !form.start_time) {
      setError('Title, date, and start time are required.');
      return;
    }
    setSaving(true);
    setError('');

    let imageUrl = form.image_url;
    let imagePath = form.image_storage_path;

    if (imageFile) {
      const validationError = validateImageFile(imageFile);
      if (validationError) { setError(validationError); setSaving(false); return; }
      const result = await replaceImage(supabase, 'images', imagePath || null, imageFile, 'events');
      imageUrl = result.url;
      imagePath = result.path;
    }

    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
    const payload = {
      title: form.title,
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time || null,
      location: form.location,
      description: form.description,
      image_url: imageUrl,
      image_storage_path: imagePath,
      collab: form.collab || null,
      rsvp_url: form.rsvp_url || null,
      tags,
      is_visible: form.is_visible,
    };

    if (editing) {
      const { error: updateError } = await supabase
        .from('events')
        .update(payload)
        .eq('id', editing);
      if (updateError) { setError(updateError.message); setSaving(false); return; }
      showToast('Event updated.');
    } else {
      const { error: insertError } = await supabase
        .from('events')
        .insert({ ...payload, display_order: events.length });
      if (insertError) { setError(insertError.message); setSaving(false); return; }
      showToast('Event added.');
    }

    await loadEvents();
    cancel();
    setSaving(false);
  }

  async function remove(event: EventRow) {
    if (!confirm(`Delete ${event.title}?`)) return;
    if (event.image_storage_path) {
      await deleteImage(supabase, 'images', event.image_storage_path);
    }
    await supabase.from('events').delete().eq('id', event.id);
    await loadEvents();
    showToast('Event deleted.');
  }

  async function moveOrder(id: string, direction: -1 | 1) {
    const idx = events.findIndex((e) => e.id === id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= events.length) return;

    const updates = [
      { id: events[idx].id, display_order: events[swapIdx].display_order },
      { id: events[swapIdx].id, display_order: events[idx].display_order },
    ];

    for (const u of updates) {
      await supabase.from('events').update({ display_order: u.display_order }).eq('id', u.id);
    }
    await loadEvents();
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
          <h1 className="font-display text-3xl text-asu-dark">Events</h1>
          <p className="font-body text-sm text-asu-muted mt-1">{events.length} events</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={startAdd}
            className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors"
          >
            + Add Event
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-asu-card border border-asu-beige rounded-lg p-6 mb-8">
          <h2 className="font-ui text-sm font-bold text-asu-dark mb-4">
            {editing ? 'Edit Event' : 'Add Event'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Start time</label>
                <input
                  type="time"
                  value={form.start_time}
                  onChange={(e) => setForm({ ...form, start_time: e.target.value })}
                  className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
                />
              </div>
              <div>
                <label className="block font-ui text-xs font-medium text-asu-dark mb-1">End time</label>
                <input
                  type="time"
                  value={form.end_time}
                  onChange={(e) => setForm({ ...form, end_time: e.target.value })}
                  className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
                />
              </div>
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Collab (optional)</label>
              <input
                type="text"
                value={form.collab}
                onChange={(e) => setForm({ ...form, collab: e.target.value })}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">RSVP URL (optional)</label>
              <input
                type="url"
                value={form.rsvp_url}
                onChange={(e) => setForm({ ...form, rsvp_url: e.target.value })}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="social, cultural, food"
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Image</label>
              <input
                type="file"
                accept="image/webp,image/jpeg,image/png"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="w-full font-body text-sm text-asu-dark"
              />
              {form.image_url && !imageFile && (
                <img src={form.image_url} alt="" className="mt-2 h-20 w-auto rounded" />
              )}
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="event-visible"
                checked={form.is_visible}
                onChange={(e) => setForm({ ...form, is_visible: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="event-visible" className="font-ui text-xs font-medium text-asu-dark">Visible</label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
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
        {events.map((event, idx) => (
          <div
            key={event.id}
            className="flex items-center gap-4 p-4 bg-asu-card border border-asu-beige rounded-lg"
          >
            {event.image_url ? (
              <img src={event.image_url} alt="" className="w-12 h-12 rounded object-cover shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded bg-asu-beige shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-ui text-sm font-semibold text-asu-dark truncate">
                {event.title}
                {!event.is_visible && (
                  <span className="ml-2 font-ui text-[10px] uppercase text-asu-muted">Hidden</span>
                )}
              </p>
              <p className="font-body text-xs text-asu-muted truncate">{event.date} · {event.location}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => moveOrder(event.id, -1)}
                disabled={idx === 0}
                className="p-1.5 text-asu-muted hover:text-asu-dark disabled:opacity-30 transition-colors"
                aria-label="Move up"
              >↑</button>
              <button
                onClick={() => moveOrder(event.id, 1)}
                disabled={idx === events.length - 1}
                className="p-1.5 text-asu-muted hover:text-asu-dark disabled:opacity-30 transition-colors"
                aria-label="Move down"
              >↓</button>
              <button
                onClick={() => startEdit(event)}
                className="px-3 py-1.5 font-ui text-xs text-asu-dark border border-asu-beige rounded hover:border-asu-red/30 transition-colors"
              >Edit</button>
              <button
                onClick={() => remove(event)}
                className="px-3 py-1.5 font-ui text-xs text-asu-red border border-asu-red/30 rounded hover:bg-asu-red hover:text-asu-cream transition-colors"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
