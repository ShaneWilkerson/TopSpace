import { doc, runTransaction, serverTimestamp, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function sanitizeUsername(raw: string): { original: string; lower: string } {
  const original = raw.trim();
  const lower = original.toLowerCase();
  return { original, lower };
}

export async function claimUsernameForUser(userId: string, username: string): Promise<void> {
  const { original, lower } = sanitizeUsername(username);
  if (!/^[a-z0-9_.-]{3,20}$/i.test(original)) {
    throw new Error('invalid-username');
  }
  const usernameRef = doc(db, 'usernames', lower);
  const userRef = doc(db, 'users', userId);

  await runTransaction(db, async (tx) => {
    const unameSnap = await tx.get(usernameRef);
    if (unameSnap.exists() && unameSnap.data()?.uid !== userId) {
      throw new Error('username-taken');
    }
    tx.set(usernameRef, { uid: userId, updatedAt: serverTimestamp() });
    tx.set(userRef, { username: original, usernameLower: lower, updatedAt: serverTimestamp() }, { merge: true });
  });
}

export async function changeUsernameForUser(userId: string, newUsername: string): Promise<void> {
  const { original, lower } = sanitizeUsername(newUsername);
  if (!/^[a-z0-9_.-]{3,20}$/i.test(original)) {
    throw new Error('invalid-username');
  }
  const userRef = doc(db, 'users', userId);

  await runTransaction(db, async (tx) => {
    const userSnap = await tx.get(userRef);
    const currentLower: string | undefined = userSnap.exists() ? userSnap.data()?.usernameLower : undefined;

    const newUnameRef = doc(db, 'usernames', lower);
    const newUnameSnap = await tx.get(newUnameRef);
    if (newUnameSnap.exists() && newUnameSnap.data()?.uid !== userId) {
      throw new Error('username-taken');
    }

    // Reserve new username
    tx.set(newUnameRef, { uid: userId, updatedAt: serverTimestamp() });

    // Release old username mapping if it exists and belongs to the user
    if (currentLower && currentLower !== lower) {
      const oldUnameRef = doc(db, 'usernames', currentLower);
      const oldUnameSnap = await tx.get(oldUnameRef);
      if (oldUnameSnap.exists() && oldUnameSnap.data()?.uid === userId) {
        tx.delete(oldUnameRef);
      }
    }

    // Update user profile
    tx.set(userRef, { username: original, usernameLower: lower, updatedAt: serverTimestamp() }, { merge: true });
  });
}

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const { lower } = sanitizeUsername(username);
  const ref = doc(db, 'usernames', lower);
  const snap = await getDoc(ref);
  return !snap.exists();
} 