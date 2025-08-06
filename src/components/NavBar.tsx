// NavBar component for TopSpace
// This is the main navigation bar that appears on all pages

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  // Helper function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-yellow-400">TopSpace</span>
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-yellow-400 bg-gray-800' 
                  : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
              }`}
            >
              Home
            </Link>
            
            <Link 
              href="/browse" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/browse') 
                  ? 'text-yellow-400 bg-gray-800' 
                  : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
              }`}
            >
              Browse
            </Link>
            
            <Link 
              href="/login" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/login') 
                  ? 'text-yellow-400 bg-gray-800' 
                  : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800'
              }`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 