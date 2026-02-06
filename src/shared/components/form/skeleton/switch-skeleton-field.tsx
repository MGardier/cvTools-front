export const SwitchSkeletonField = () => {
  return (
    <div className="grid gap-3">
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
        </div>
        <div className="h-5 w-8 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
};
