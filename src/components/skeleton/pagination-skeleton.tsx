interface PaginationSkeletonProps {
  length  : number
}

export const PaginationSkeleton = ({length}: PaginationSkeletonProps) => {
  const steps = Array.from({length})
  return (
    <nav className="mx-auto flex w-full justify-center">
      <ul className="flex flex-row items-center gap-1 md:gap-2">
        <li>
          <div className="h-6 md:h-9 w-16 md:w-20 bg-gray-200 rounded-md animate-pulse" />
        </li>
        {steps.map((_, index, ) => (
          <li key={index}>
            <div
              className={`h-6 w-6 md:h-9 md:w-9 rounded-md animate-pulse ${
                index === 0 ? "bg-blue-200" : "bg-gray-200"
              }`}
            />
          </li>
        ))}
        <li>
          <div className="h-9 w-16 md:w-20 bg-gray-200 rounded-md animate-pulse" />
        </li>
      </ul>
    </nav>
  );
};
