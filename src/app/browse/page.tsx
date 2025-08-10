// Browse page for TopSpace
// Shows trending topics and their current consensus Top 5 rankings

export default function BrowsePage() {
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

        {/* Empty state */}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-gray-300 mb-4">
              No topics yet
            </h3>
            <p className="text-gray-400 mb-8">
              Be the first to create a ranking topic and start the conversation!
            </p>
            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Create New Topic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 