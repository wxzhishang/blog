export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 标题加载动画 */}
        <div className="animate-pulse mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* 分类卡片加载动画 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 8].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 