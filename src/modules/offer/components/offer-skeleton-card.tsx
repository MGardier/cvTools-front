export const OfferSkeletonCard = () => (
  <article className="border border-offgreen-medium rounded-xl px-3 py-2 md:px-8 md:py-4">
    <div className="flex flex-col md:flex-row gap-3 md:gap-6">
      <div className="hidden md:block w-[100px] h-[100px] rounded bg-muted animate-pulse shrink-0" />
      <div className="flex-1 min-w-0 grid gap-2">
        {/* Mobile icon */}
        <div className="flex md:hidden items-center">
          <div className="w-20 h-20 rounded bg-muted animate-pulse shrink-0" />
        </div>
        {/* Title */}
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <div className="h-4 md:h-5 w-32 md:w-56 rounded bg-muted animate-pulse" />
        </div>
        {/* Meta */}
        <div className="flex items-center gap-3">
          <div className="h-3 md:h-4 w-24 md:w-32 rounded bg-muted animate-pulse" />
          <div className="h-3 md:h-4 w-28 md:w-36 rounded bg-muted animate-pulse shrink-0" />
        </div>
        {/* Badges */}
        <div className="flex gap-1.5 md:gap-2">
          <div className="h-5 md:h-6 w-12 md:w-16 rounded-full bg-muted animate-pulse" />
          <div className="h-5 md:h-6 w-16 md:w-20 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-14 rounded bg-muted animate-pulse" />
        </div>
        {/* Skills + action */}
        <div className="flex items-center justify-between gap-2 md:gap-3 mt-1 md:mt-0">
          <div className="flex gap-1.5 md:gap-2">
            <div className="h-4 w-12 rounded bg-muted animate-pulse" />
            <div className="h-4 w-16 rounded bg-muted animate-pulse" />
            <div className="h-4 w-10 rounded bg-muted animate-pulse" />
          </div>
          <div className="hidden md:block h-9 w-9 rounded-full bg-muted animate-pulse shrink-0" />
        </div>
      </div>
    </div>
  </article>
);
