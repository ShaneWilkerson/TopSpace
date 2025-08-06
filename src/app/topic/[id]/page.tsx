// Topic page for TopSpace
// Shows topic details and allows users to vote using the RankingForm

'use client';

import { useState } from 'react';
import RankingForm from '@/components/RankingForm';

// Mock data - this will come from Firebase
const mockTopic = {
  id: '1',
  title: 'Top 5 NBA Players of All Time',
  description: 'Who are the greatest basketball players ever? Vote for your top 5!',
  items: [
    { id: '1', name: 'Michael Jordan' },
    { id: '2', name: 'LeBron James' },
    { id: '3', name: 'Kareem Abdul-Jabbar' },
    { id: '4', name: 'Magic Johnson' },
    { id: '5', name: 'Larry Bird' },
    { id: '6', name: 'Kobe Bryant' },
    { id: '7', name: 'Shaquille O\'Neal' },
    { id: '8', name: 'Tim Duncan' }
  ],
  consensus: [
    { rank: 1, name: 'Michael Jordan', points: 5234 },
    { rank: 2, name: 'LeBron James', points: 4891 },
    { rank: 3, name: 'Kareem Abdul-Jabbar', points: 4123 },
    { rank: 4, name: 'Magic Johnson', points: 3456 },
    { rank: 5, name: 'Larry Bird', points: 2987 }
  ],
  totalVotes: 1247
};

export default function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  // TODO: Use params.id when implementing real data fetching
  const topicId = '1'; // Mock ID for now
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Handle ranking submission
  const handleSubmitRanking = async (ranking: string[]) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Submitted ranking:', ranking);
    
    setLoading(false);
    setShowResults(true);
    alert('Your ranking has been submitted!');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Topic Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">
            {mockTopic.title}
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            {mockTopic.description}
          </p>
          <div className="text-sm text-gray-400">
            {mockTopic.totalVotes} total votes
          </div>
        </div>

        {/* Toggle between voting and results */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setShowResults(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !showResults 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              Vote
            </button>
            <button
              onClick={() => setShowResults(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                showResults 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              Results
            </button>
          </div>
        </div>

        {!showResults ? (
          /* Voting Form */
          <RankingForm
            topicTitle={mockTopic.title}
            items={mockTopic.items}
            onSubmit={handleSubmitRanking}
            loading={loading}
          />
        ) : (
          /* Results Display */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                Community Consensus
              </h2>
              <p className="text-gray-400">
                Based on {mockTopic.totalVotes} votes
              </p>
            </div>

            <div className="space-y-4">
              {mockTopic.consensus.map((item) => (
                <div key={item.rank} className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-yellow-400 font-bold text-2xl">
                      #{item.rank}
                    </span>
                    <span className="text-xl text-gray-200">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">
                      {item.points} pts
                    </div>
                    <div className="text-sm text-gray-400">
                      {Math.round((item.points / mockTopic.totalVotes) * 100)}% of max
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setShowResults(false)}
                className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                Vote Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 