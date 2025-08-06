// RankingForm component for TopSpace
// Allows users to drag and drop items to create their Top 5 ranking

'use client';

import { useState } from 'react';

interface RankingItem {
  id: string;
  name: string;
}

interface RankingFormProps {
  topicTitle: string;
  items: RankingItem[];
  onSubmit: (ranking: string[]) => void;
  loading?: boolean;
}

export default function RankingForm({ topicTitle, items, onSubmit, loading = false }: RankingFormProps) {
  const [ranking, setRanking] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetRank: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    // Remove item from current position if it exists
    const newRanking = ranking.filter(id => id !== draggedItem);
    
    // Insert at new position
    newRanking.splice(targetRank, 0, draggedItem);
    
    setRanking(newRanking);
    setDraggedItem(null);
  };

  // Handle item click to add to ranking
  const handleItemClick = (itemId: string) => {
    if (ranking.includes(itemId)) {
      // Remove if already in ranking
      setRanking(ranking.filter(id => id !== itemId));
    } else if (ranking.length < 5) {
      // Add to ranking if space available
      setRanking([...ranking, itemId]);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (ranking.length < 2) {
      alert('Please rank at least 2 items');
      return;
    }
    onSubmit(ranking);
  };

  // Get item name by ID
  const getItemName = (itemId: string) => {
    return items.find(item => item.id === itemId)?.name || '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">
          Rank: {topicTitle}
        </h2>
        <p className="text-gray-400">
          Drag and drop items to create your Top 5 ranking
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Items */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-4">
            Available Items
          </h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onClick={() => handleItemClick(item.id)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  ranking.includes(item.id)
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-gray-600 bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Ranking Slots */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-4">
            Your Ranking
          </h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((rank) => (
              <div
                key={rank}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, rank - 1)}
                className={`p-4 border-2 border-dashed rounded-lg min-h-[60px] flex items-center ${
                  ranking[rank - 1]
                    ? 'border-yellow-400 bg-yellow-400/10'
                    : 'border-gray-600 bg-gray-800'
                }`}
              >
                <span className="text-yellow-400 font-bold mr-3">
                  #{rank}
                </span>
                {ranking[rank - 1] ? (
                  <span className="text-gray-200">
                    {getItemName(ranking[rank - 1])}
                  </span>
                ) : (
                  <span className="text-gray-500">
                    Drop item here
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={loading || ranking.length < 2}
          className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Ranking'}
        </button>
        
        {ranking.length > 0 && (
          <p className="text-sm text-gray-400 mt-2">
            Ranked {ranking.length} of 5 items
          </p>
        )}
      </div>
    </div>
  );
} 