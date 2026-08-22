import { useState, useEffect } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';

interface Setting {
  key: string;
  value: string;
}

export function SettingsManager() {
  const supabase = createBrowserClient();
  const [settings, setSettings] = useState<Setting[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => { loadSettings(); }, []);

  async function loadSettings() {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .order('key');
    if (data) setSettings(data);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function updateValue(key: string, value: string) {
    setSettings((prev) => prev.map((s) => (s.key === key ? { ...s, value } : s)));
  }

  async function saveAll() {
    setSaving(true);
    setError('');
    const { error: upsertError } = await supabase
      .from('site_settings')
      .upsert(settings.map((s) => ({ key: s.key, value: s.value })));
    if (upsertError) { setError(upsertError.message); setSaving(false); return; }
    await loadSettings();
    showToast('Settings saved.');
    setSaving(false);
  }

  async function addSetting() {
    if (!newKey.trim()) {
      setError('Key is required.');
      return;
    }
    if (settings.some((s) => s.key === newKey.trim())) {
      setError('A setting with this key already exists.');
      return;
    }
    setError('');
    const { error: insertError } = await supabase
      .from('site_settings')
      .insert({ key: newKey.trim(), value: newValue });
    if (insertError) { setError(insertError.message); return; }
    setNewKey('');
    setNewValue('');
    setAdding(false);
    await loadSettings();
    showToast('Setting added.');
  }

  async function removeSetting(key: string) {
    if (!confirm(`Delete setting "${key}"?`)) return;
    await supabase.from('site_settings').delete().eq('key', key);
    await loadSettings();
    showToast('Setting deleted.');
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
          <h1 className="font-display text-3xl text-asu-dark">Settings</h1>
          <p className="font-body text-sm text-asu-muted mt-1">{settings.length} settings</p>
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
        {settings.map((setting) => (
          <div key={setting.key} className="bg-asu-card border border-asu-beige rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <label className="font-ui text-xs font-bold text-asu-dark">{setting.key}</label>
              <button
                onClick={() => removeSetting(setting.key)}
                className="font-ui text-[11px] text-asu-red hover:underline"
              >Delete</button>
            </div>
            <input
              type="text"
              value={setting.value}
              onChange={(e) => updateValue(setting.key, e.target.value)}
              className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
            />
          </div>
        ))}
      </div>

      {adding ? (
        <div className="bg-asu-card border border-asu-beige rounded-lg p-4">
          <h2 className="font-ui text-sm font-bold text-asu-dark mb-3">Add setting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Key</label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="contact_email"
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Value</label>
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={addSetting}
              className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => { setAdding(false); setNewKey(''); setNewValue(''); setError(''); }}
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
          + Add setting
        </button>
      )}
    </div>
  );
}
