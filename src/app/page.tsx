import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Hero section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-6">
          TopSpace
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Create and vote on Top 5 rankings for any topic. 
          From NBA players to pizza toppings, discover what the community thinks.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/browse"
            className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors"
          >
            Start Ranking
          </Link>
          
          <Link 
            href="/create"
            className="border border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors"
          >
            Create Topic
          </Link>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center p-6 bg-gray-800 rounded-lg">
          <div className="text-3xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">Create Rankings</h3>
          <p className="text-gray-400">Start a new Top 5 topic and let the community vote</p>
        </div>
        
        <div className="text-center p-6 bg-gray-800 rounded-lg">
          <div className="text-3xl mb-4">🗳️</div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">Vote & Rank</h3>
          <p className="text-gray-400">Submit your Top 5 and see how it affects the consensus</p>
        </div>
        
        <div className="text-center p-6 bg-gray-800 rounded-lg">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">See Results</h3>
          <p className="text-gray-400">Discover the community&apos;s consensus rankings</p>
        </div>
      </div>
    </div>
  );
}
