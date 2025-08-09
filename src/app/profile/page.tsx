'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { changeUsernameForUser, claimUsernameForUser, sanitizeUsername } from '@/lib/username';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [usernameInput, setUsernameInput] = useState('');
  const [profileUsername, setProfileUsername] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        const userRef = doc(db, 'users', u.uid);
        const snap = await getDoc(userRef);
        const uname = snap.exists() ? (snap.data() as any)?.username ?? null : null;
        setProfileUsername(uname);
        setUsernameInput(uname ?? '');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const submitUsername = async () => {
    if (!user) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const trimmed = usernameInput.trim();
      if (!trimmed) throw new Error('invalid-username');
      const { original } = sanitizeUsername(trimmed);
      if (profileUsername) {
        await changeUsernameForUser(user.uid, original);
      } else {
        await claimUsernameForUser(user.uid, original);
      }
      setProfileUsername(original);
      setUsernameInput(original);
      setIsEditing(false);
      setMessage('Username saved.');
    } catch (err: any) {
      const code = err?.message || err?.code;
      if (code === 'username-taken') setError('That username is already taken. Please choose another.');
      else if (code === 'invalid-username') setError('Usernames must be 3-20 characters, letters/numbers/._- only.');
      else setError('Unable to save username. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-400">You are not signed in</h2>
          <Link href="/login" className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const hasUsername = Boolean(profileUsername);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-lg p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">Profile</h1>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Email</span>
            <span className="text-gray-200">{user.email ?? '—'}</span>
          </div>
        </div>

        {/* Username display or create/edit */}
        <div className="pt-4 border-t border-gray-700">
          {hasUsername && !isEditing ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-400">Username</span>
                <span className="text-gray-200">{profileUsername}</span>
              </div>
              <button
                onClick={() => { setIsEditing(true); setMessage(null); setError(null); }}
                className="border border-yellow-400 text-yellow-400 px-4 py-1 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-colors"
              >
                Edit
              </button>
            </div>
          ) : (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                {hasUsername ? 'Change username' : 'Create username'}
              </label>
              <div className="flex gap-3">
                <input
                  id="username"
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="your_username"
                />
                <button
                  onClick={submitUsername}
                  disabled={saving}
                  className="bg-yellow-400 text-gray-900 px-5 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50"
                >
                  {hasUsername ? 'Save' : 'Create'}
                </button>
                {hasUsername && (
                  <button
                    onClick={() => { setIsEditing(false); setUsernameInput(profileUsername ?? ''); setMessage(null); setError(null); }}
                    className="px-5 rounded-lg font-semibold border border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">3–20 chars. Letters, numbers, period, dash, underscore. Must be unique.</p>
              {error && <p className="mt-2 text-sm text-red-400" role="alert">{error}</p>}
              {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
            </div>
          )}
        </div>

        <div className="text-center pt-4">
          <button onClick={handleSignOut} className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
} 