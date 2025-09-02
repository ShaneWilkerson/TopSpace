// Browse page for TopSpace
// Shows trending topics and their current consensus Top 5 rankings

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';

interface Topic {
  id: string;
  title: string;
  description: string;
  items: string[];
  itemCount: number;
  createdBy: string;
  createdAt: any;
  totalVotes?: number;
}

export default function BrowsePage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsRef = collection(db, 'topics');
        const q = query(topicsRef, orderBy('createdAt', 'desc'), limit(20));
        const querySnapshot = await getDocs(q);
        
        const topicsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Topic[];
        
        setTopics(topicsData);
      } catch (error) {
        console.error('Error fetching topics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
              Browse Topics
            </h1>
            <p className="text-xl text-gray-300">
              Discover trending rankings and see what the community thinks
            </p>
          </div>
          <div className="text-center py-16">
            <p className="text-gray-400">Loading topics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
            Browse Topics
          </h1>
          <p className="text-xl text-gray-300">
            Discover trending rankings and see what the community thinks
          </p>
        </div>

        {topics.length === 0 ? (
          /* Empty state */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-gray-300 mb-4">
                No topics yet
              </h3>
              <p className="text-gray-400 mb-8">
                Be the first to create a ranking topic and start the conversation!
              </p>
              <Link href="/create">
                <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                  Create New Topic
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* Topics grid */
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {topics.map((topic) => (
                <div key={topic.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {topic.description || 'No description provided'}
                    </p>
                    <div className="text-sm text-gray-500">
                      {topic.totalVotes || 0} votes • {topic.itemCount} items
                    </div>
                  </div>

                  {/* Suggested items */}
                  {topic.items && topic.items.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">
                        Suggested Items:
                      </h4>
                      <div className="space-y-1">
                        {topic.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="text-sm text-gray-400">
                            • {item}
                          </div>
                        ))}
                        {topic.items.length > 3 && (
                          <div className="text-sm text-gray-500">
                            +{topic.items.length - 3} more...
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action button */}
                  <Link href={`/topic/${topic.id}`}>
                    <button className="w-full bg-yellow-400 text-gray-900 py-2 px-4 rounded font-semibold hover:bg-yellow-300 transition-colors">
                      Vote Now
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Create new topic CTA */}
            <div className="text-center mt-16">
              <p className="text-gray-400 mb-4">
                Don&apos;t see a topic you like?
              </p>
              <Link href="/create">
                <button className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                  Create New Topic
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
