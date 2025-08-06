// Create Topic page for TopSpace
// Allows users to create new ranking topics with up to 5 items

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreateTopicPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  // Handle adding/removing items (max 5)
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!title.trim()) {
      alert('Please enter a topic title');
      setLoading(false);
      return;
    }

    const validItems = items.filter(item => item.trim() !== '');
    if (validItems.length < 2) {
      alert('Please enter at least 2 items to rank');
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Creating topic:', {
      title,
      description,
      items: validItems
    });

    setLoading(false);
    // In a real app, we'd redirect to the new topic page
    alert('Topic created successfully!');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">
            Create New Topic
          </h1>
          <p className="text-gray-300">
            Start a new Top 5 ranking and let the community vote
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Topic Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="e.g., Top 5 NBA Players of All Time"
            />
          </div>

          {/* Topic Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Describe what you want people to rank..."
            />
          </div>

          {/* Ranking Items */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Items to Rank (2-5 items) *
            </label>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-yellow-400 font-bold text-lg w-8">
                    #{index + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder={`Item ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Enter at least 2 items for people to rank
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Topic'}
            </button>
            
            <Link
              href="/browse"
              className="flex-1 border border-gray-600 text-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Example topics */}
        <div className="mt-12 p-6 bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Popular Topic Ideas
          </h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• Top 5 NBA Players of All Time</p>
            <p>• Best Pizza Toppings</p>
            <p>• Greatest Rock Bands</p>
            <p>• Most Iconic Movie Characters</p>
            <p>• Best Video Game Consoles</p>
          </div>
        </div>
      </div>
    </div>
  );
} 