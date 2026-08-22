import { useState } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    window.location.href = '/admin';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-asu-ivory px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/images/asu-logo.webp"
            alt="ASU"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="font-display text-2xl text-asu-dark">Admin Login</h1>
          <p className="font-body text-sm text-asu-muted mt-1">
            Sign in with your admin account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-ui text-xs font-medium text-asu-dark mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-asu-beige rounded bg-asu-card font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-ui text-xs font-medium text-asu-dark mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-asu-beige rounded bg-asu-card font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red transition-colors"
            />
          </div>

          {error && (
            <p className="font-ui text-xs text-asu-red">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-asu-red text-asu-cream font-ui font-semibold text-sm rounded hover:bg-asu-red-hover transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
