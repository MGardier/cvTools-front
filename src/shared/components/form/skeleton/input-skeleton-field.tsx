export const InputSkeletonField = () => {
  return (
    <div className="space-y-3">
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
        </div>
        <div className="h-8 md:h-12 lg:h-12 bg-gray-200 rounded-lg md:rounded-2xl animate-pulse" />
      </div>
    </div>
  );
};
