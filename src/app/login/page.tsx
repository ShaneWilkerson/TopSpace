// Login page for TopSpace
// Handles user authentication with Firebase

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, deleteUser } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { claimUsernameForUser, sanitizeUsername } from '@/lib/username';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const mapAuthErrorToMessage = (code: string, isSignUpFlow: boolean) => {
    if (!isSignUpFlow) {
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        return 'This email and password do not match.';
      }
      if (code === 'auth/user-not-found') {
        return 'No account found with this email.';
      }
      if (code === 'auth/too-many-requests') {
        return 'Too many attempts. Please try again later.';
      }
    } else {
      if (code === 'auth/email-already-in-use') {
        return 'An account with this email already exists. Please sign in or reset your password.';
      }
      if (code === 'username-taken') {
        return 'That username is already taken. Please choose another.';
      }
      if (code === 'invalid-username') {
        return 'Usernames must be 3-20 characters, letters/numbers/._- only.';
      }
    }
    if (code === 'auth/invalid-email') return 'Please enter a valid email address.';
    return 'Something went wrong. Please try again.';
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      if (isSignUp) {
        const trimmed = username.trim();
        if (!trimmed) {
          throw { code: 'invalid-username' };
        }
        const { original } = sanitizeUsername(trimmed);
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        try {
          await claimUsernameForUser(cred.user.uid, original);
        } catch (claimErr: any) {
          // Roll back created auth user if username claim fails
          try { await deleteUser(cred.user); } catch {}
          throw claimErr;
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/profile');
    } catch (err: any) {
      const code = err?.code as string | undefined;
      setErrorMessage(mapAuthErrorToMessage(code ?? '', isSignUp));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push('/profile');
    } catch (err: any) {
      setErrorMessage('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-400">
            {isSignUp 
              ? 'Join TopSpace to create and vote on rankings' 
              : 'Sign in to continue ranking'
            }
          </p>
        </div>

        {/* Google Auth Button */}
        <div>
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18 v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">Or continue with email</span>
          </div>
        </div>

        {/* Email/Password/Username Form */}
        <form onSubmit={handleEmailAuth} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Choose a username"
              />
              <p className="mt-1 text-xs text-gray-500">3–20 chars. Letters, numbers, period, dash, underscore.</p>
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Enter your password"
            />
            {!isSignUp && (
              <div className="mt-2 flex items-center justify-between">
                {errorMessage && (
                  <p className="text-sm text-red-400" role="alert">{errorMessage}</p>
                )}
                <Link href="/forgot-password" className="text-sm text-yellow-400 hover:text-yellow-300 ml-auto">
                  Forgot password?
                </Link>
              </div>
            )}
            {isSignUp && errorMessage && (
              <p className="mt-2 text-sm text-red-400" role="alert">{errorMessage}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </div>
        </form>

        {/* Toggle between sign in and sign up */}
        <div className="text-center">
          <p className="text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setErrorMessage(null); }}
              className="ml-1 text-yellow-400 hover:text-yellow-300 font-medium"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link href="/" className="text-gray-400 hover:text-yellow-400 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 