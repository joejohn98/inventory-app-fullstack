export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
        <div className="h-4 w-72 bg-gray-200 rounded"></div>
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="h-28 bg-gray-200 rounded-xl"></div>
        <div className="h-28 bg-gray-200 rounded-xl"></div>
        <div className="h-28 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="h-96 bg-gray-200 rounded-xl mt-6"></div>
    </div>
  );
}
