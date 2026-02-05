interface MobileNavItemProps {
  link?: string;
  children: React.ReactNode;
  isDisabled: boolean;
  isSoon: boolean;
}

export const MobileNavItem = ({
  link,
  children,
  isDisabled = false,
  isSoon = false,
}: MobileNavItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled || isSoon) {
      e.preventDefault();
    }
  };

  return (
    <a
      href={isDisabled || isSoon ? undefined : link}
      onClick={handleClick}
      className={`
        flex items-center justify-between w-full py-3 transition-colors
        ${
          isDisabled || isSoon
            ? "text-zinc-400 cursor-not-allowed opacity-60"
            : "text-zinc-500 hover:text-blue-400"
        }
      `}
    >
      <span className="flex items-center gap-2">
        {children}

        {/* Badge "Bientôt" - toujours visible sur mobile */}
        {isSoon && !isDisabled && (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700 whitespace-nowrap">
            Bientôt
          </span>
        )}

        {/* Badge "Non disponible" - style tooltip pour disabled */}
        {isDisabled && !isSoon && (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-900 text-white whitespace-nowrap">
            Non disponible
          </span>
        )}
      </span>
    </a>
  );
};
