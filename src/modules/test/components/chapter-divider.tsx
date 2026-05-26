export const ChapterDivider = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-zinc-200" />
      <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-wider text-zinc-400">
        Ou choisissez votre chapitre
      </span>
      <div className="h-px flex-1 bg-zinc-200" />
    </div>
  );
};
