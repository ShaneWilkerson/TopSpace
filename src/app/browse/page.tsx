// Browse page for TopSpace
// Shows trending topics and their current consensus Top 5 rankings

export default function BrowsePage() {
  // Mock data for now - this will come from Firebase later
  const trendingTopics = [
    {
      id: '1',
      title: 'Top 5 NBA Players of All Time',
      description: 'Who are the greatest basketball players ever?',
      votes: 1247,
      consensus: [
        { rank: 1, name: 'Michael Jordan', points: 5234 },
        { rank: 2, name: 'LeBron James', points: 4891 },
        { rank: 3, name: 'Kareem Abdul-Jabbar', points: 4123 },
        { rank: 4, name: 'Magic Johnson', points: 3456 },
        { rank: 5, name: 'Larry Bird', points: 2987 }
      ]
    },
    {
      id: '2',
      title: 'Best Pizza Toppings',
      description: 'What makes the perfect pizza?',
      votes: 892,
      consensus: [
        { rank: 1, name: 'Pepperoni', points: 3456 },
        { rank: 2, name: 'Mushrooms', points: 2987 },
        { rank: 3, name: 'Sausage', points: 2678 },
        { rank: 4, name: 'Extra Cheese', points: 2345 },
        { rank: 5, name: 'Bell Peppers', points: 1987 }
      ]
    },
    {
      id: '3',
      title: 'Greatest Rock Bands',
      description: 'The most influential rock bands in history',
      votes: 567,
      consensus: [
        { rank: 1, name: 'The Beatles', points: 4123 },
        { rank: 2, name: 'Led Zeppelin', points: 3789 },
        { rank: 3, name: 'Pink Floyd', points: 3456 },
        { rank: 4, name: 'The Rolling Stones', points: 3123 },
        { rank: 5, name: 'Queen', points: 2876 }
      ]
    }
  ];

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

        {/* Topics grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  {topic.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {topic.description}
                </p>
                <div className="text-sm text-gray-500">
                  {topic.votes} votes
                </div>
              </div>

              {/* Consensus rankings */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Community Consensus:
                </h4>
                {topic.consensus.map((item) => (
                  <div key={item.rank} className="flex items-center justify-between bg-gray-700 rounded px-3 py-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-yellow-400 font-bold text-lg">
                        #{item.rank}
                      </span>
                      <span className="text-gray-200">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {item.points} pts
                    </span>
                  </div>
                ))}
              </div>

              {/* Action button */}
              <button className="w-full mt-6 bg-yellow-400 text-gray-900 py-2 px-4 rounded font-semibold hover:bg-yellow-300 transition-colors">
                Vote Now
              </button>
            </div>
          ))}
        </div>

        {/* Create new topic CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            Don&apos;t see a topic you like?
          </p>
          <button className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-colors">
            Create New Topic
          </button>
        </div>
      </div>
    </div>
  );
} 