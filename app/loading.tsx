export default function Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-pulse space-y-12">
      {/* Hero Skeleton */}
      <div className="h-64 md:h-80 w-full bg-gray-200 dark:bg-gray-800/60 rounded-3xl"></div>

      {/* Categories Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800/60 rounded-lg"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-800/60 rounded-xl"></div>
          ))}
        </div>
      </div>

      {/* Main Content & Sidebar Skeleton */}
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800/60 rounded-lg"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="w-full md:w-64 h-48 bg-gray-200 dark:bg-gray-800/60 rounded-xl"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800/60 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800/60 rounded"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-[300px] space-y-6">
          <div className="h-48 bg-gray-200 dark:bg-gray-800/60 rounded-2xl"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-800/60 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
